export function HomePage() {
    async function showInformation() {
        try {
            const gettingFlight = await fetch('http://localhost:3000/flights');
            if (!gettingFlight.ok) {
                console.log(`Error: ${gettingFlight.status}`);
                return;
            }
            const flights = await gettingFlight.json();

            let $content = '';
            flights.forEach((flight) => {
                const departureDate = new Date(flight.departure).toLocaleString();
                $content += /*html*/ `
        <div class="${style.cards}">
            <div class="cards">
            <h1>Destination ${flight.destination}</h1>
            <h2>Departure ${flight.departure}</h2>
            <h3>Capacity: ${flight.capacity}</h3>
            <button class="booking-edit" data-edit="${flight.id}">Edit flight</button>
            <button class="booking-update" data-update="${flight.id}">Update flight</button>
            <button class="booking-delete" data-delete="${flight.id}">Delete flight</button>
            </div>
        </div>
        `;
            });

            const cardsContainer = `<div class="${style.cardsContainer}">${$content}</div>`;

            const title = /*html*/ `
        <h1 class="${style.title}">Welcome back Juan</h1>      
    `;

            const combinedHTML = /*html*/ `
        <div class="container">${title}${$header}${cardsContainer}</div>
    `;

            d.innerHTML = combinedHTML;
            // Logic for edit a flight;
            const $editFlights = document.getElementsByClassName('booking-edit');
            for (let $editFlight of $editFlights) {
                $editFlight.addEventListener('click', () => {
                    const editFlightId = $editFlight.getAttribute('data-edit')
                    navigateTo(`/home-admin/edit-flight?flightId=${editFlightId}`)
                });
            }
            const logic = () => { }
            return {
                $content,
                logic
            }
        } catch (error) {
            console.log(error);
        }
    }

    showInformation();
}
