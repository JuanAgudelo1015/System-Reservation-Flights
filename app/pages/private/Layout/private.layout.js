import { navigateTo } from '../../../Router';
import style from './styles.css';
export function PrivateLayout($content, logic) {
    const d = document.getElementById('root');

    async function showInformation() {
        try {
            const flights = await fetch('http://localhost:3000/flights');
            if (!flights.ok) {
                throw new Error(`Error: Status ${flights.status}`)
            }
            const flightJson = await flights.json();
            let cardsFlight = '';
            flightJson.forEach(flight => {
                const departure = new Date(flight.departure).toLocaleString();
                cardsFlight += /*html*/`
                    <div class="${style.cards}">
                        <div class="cards">
                            <h1>Destination ${flight.destination}</h1>
                            <h2>Departure: ${flight.departure}</h2>
                            <h2>Capacity: ${flight.capacity}</h2>
                            <button class="booking-flight" data-id="${flight.id}">Booking Flight</button>
                        </div>
                    </div>
                `

                const cardsContainer = /*html*/`
                    <div class="${style.cardsContainer}">${cardsFlight}</div>
                `;

                const contentContainer = /*html*/`
                    <div>${$content}</div>
                `;

                const $title = /*html*/`
                    <h1>Panamerican Agency</h1>
                    <h2 class="${style.title}">All Flights</h2>
                `;

                const $header = /*html*/`
                    <nav>
                        <ul>
                            <li><a  class="booking">Book a flight</a></li>
                            <li><a href="/login" class="log-out">Log Out</a></li>
                        </ul>
                    </nav>
                `;

                const combinedHTML = /*html*/`
                    <div class="container">
                        ${$title}${$header}${cardsContainer}${contentContainer}
                    </div>
                `
                d.innerHTML = combinedHTML;

                function message() {
                    alert("Please click in the bottom flights")
                }

                // Ejecutar una funcion cuando el usuario le de click en reservar vuelo 
                const booking = document.querySelectorAll('.booking');
                booking.forEach((e) => {
                    e.addEventListener('click', message)
                })

                // Eliminar los datos del usuario desde el localStorage cuando le de click en Log Out
                const logOut = document.querySelectorAll('.log-out');
                logOut.forEach((e) => {
                    e.addEventListener("click", (f) => {
                        const leavingPage = confirm("Are you sure leaving this page");
                        if (leavingPage) {
                            f.preventDefault();
                            localStorage.removeItem('token');
                            localStorage.removeItem('userRole');
                            localStorage.removeItem('id');
                            alert("Leaving...")
                            navigateTo('/login')
                        } else {
                            f.preventDefault();
                            navigateTo('/private-home');
                        }
                    })
                })

                // Se inicializar el contador en 0, para que se vaya sumando cada vez que un usuario añada una reserva
                let count = 0;

                // Cuando el usuario le de click en reservar 
                /**Pasos para hacer la reserva
                 * 1. crear una funcion asincroa dentro de otra funcion
                 * 2. obtener el data-id de la reserva en la que hicieron click,
                 *  - obtener atravez del metodo fecth el numero de vuelo
                 *  - obtener el userid,
                 *  - añadir un id
                 */
                let bookingFlight = document.querySelectorAll('.booking-flight');
                bookingFlight.forEach((e) => {
                    e.addEventListener('click', async (f) => {
                        const userConfirm = confirm("Are you sure the booking flight");
                        if (userConfirm) {
                            f.preventDefault();
                            // numero de la reserva
                            const getFlightId = e.getAttribute('data-id');

                            // numero del vuelo 
                            const flighNumber = await fetch(`http://localhost:3000/flights/${getFlightId}`)
                            if (!flighNumber){
                                throw new Error (`Error: Status: ${flighNumber}`)
                            }

                            const flighNumberJson = await flighNumber.json();
                            // Accediendo directamente al numero de vuelo, ya que estoy consultando es un objeto no un array
                            const $flightNumber = flighNumberJson.number
                            
                            // Id del usuario
                            const userId = localStorage.getItem('id');

                            // Fecha y hora en la que reservo
                            const currentDate = new Date();
                            const formattedDate = currentDate.toLocaleTimeString('es-Es', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                            const formattedTime = currentDate.toLocaleTimeString('es-Es', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });

                            const concatDateAndTime = /*html*/`
                                ${formattedDate}${formattedTime}
                            `

                            count += 1
                            const userFlightInformation = {
                                id: count,
                                flightId: $flightNumber,
                                userId: userId,
                                bookingDate: concatDateAndTime
                            }
                            
                            // Añadir la informacion a la base de datos
                            const addBookingInformation = await fetch("http://localhost:3000/bookings", {
                                method: 'POST',
                                headers: {
                                    "Content-Type" : "application/json"
                                },
                                body: JSON.stringify(userFlightInformation)
                            })
                            if (!addBookingInformation){
                                console.log("There has been an error in adding information");
                                return;
                            }
                            const addBookingInformationJson = await addBookingInformation.json();
                            alert("The flight has been add with success")
                            console.log(addBookingInformationJson)
                        }
                    })
                })

                logic()
                return cardsFlight;
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    showInformation()
}
