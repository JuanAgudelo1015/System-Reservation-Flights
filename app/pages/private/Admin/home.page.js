import { navigateTo } from '../../../notes';
import style from './styles.css';

export async function HomeAdmin() {
    try {
        const gettingFlight = await fetch('http://localhost:3000/flights');
        if (!gettingFlight.ok) {
            console.log(`Error: ${gettingFlight.status}`);
            return { $content: '', logic: () => { } };
        }
        const flights = await gettingFlight.json();

        let $content = '';
        flights.forEach((flight) => {
            const departureDate = new Date(flight.departure).toLocaleString();
            $content += /*html*/ `
                <div class="${style.cards}">
                    <div class="cards">
                        <h1>Destino: ${flight.destination}</h1>
                        <h2>Salida: ${departureDate}</h2>
                        <h3>Capacidad: ${flight.capacity}</h3>
                        <button class="booking-edit" data-edit="${flight.id}">Editar vuelo</button>
                        <button class="booking-delete" data-delete="${flight.id}">Eliminar vuelo</button>
                    </div>
                </div>
            `;
        });

        const cardsContainer = `<div class="${style.cardsContainer}">${$content}</div>`;

        const title = /*html*/ `
            <h1 class="${style.title}">Bienvenido de nuevo, Juan</h1>
        `;

        const combinedHTML = /*html*/ `
            <div class="container">${title}${cardsContainer}</div>
        `;

        // Editar un viaje
        const addEventListeners = () => {
            const $editFlights = document.getElementsByClassName('booking-edit');
            for (let $editFlight of $editFlights) {
                $editFlight.addEventListener('click', () => {
                    navigateTo(`/edit-flight?flightId=${$editFlight.getAttribute('data-edit')}`);
                });
            }
        };

        // Eliminar un vuelo
        const addEventListenerss = () => {
            const $editFlights = document.getElementsByClassName('booking-delete');
            for (let $editFlight of $editFlights) {
                $editFlight.addEventListener('click', async (e) => {
                    e.preventDefault()
                    const userConfirm = confirm('Are you sure the delete this Travel');
                    if (userConfirm) {
                        try {
                            const dataDelete = $editFlight.getAttribute('data-delete');
                            const deleteFlight = await fetch(`http://localhost:3000/flights/${dataDelete}`, {
                                method: 'DELETE',
                                headers: {
                                    "Content-type" : "application/json"
                                }
                            });
                            if (deleteFlight){
                                alert("Viaje eliminado exitosamente")
                            }else {
                                alert("Hubo un error al intentar eliminar el viaje")
                            }
                        }catch(error){
                            console.log(error)
                        }
                        
                    }

                });
            }
        };

        return {
            $content: combinedHTML,
            logic: addEventListeners,
            logic: addEventListenerss
        };
    } catch (error) {
        console.log(error);
        return { $content: '', logic: () => { } };
    }
}
