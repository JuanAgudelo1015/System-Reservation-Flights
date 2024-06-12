import style from './styles.css';
export function PublicLayout($content, logic) {
  const d = document.getElementById('root');

  async function showInformation() {
    try {
      const gettingFlight = await fetch('http://localhost:3000/flights');
      if (!gettingFlight.ok) {
        console.log(`Error: ${gettingFlight.status}`);
        return;
      }
      
      const flights = await gettingFlight.json();

      let cards = '';
      flights.forEach((flight) => {
        const departureDate = new Date(flight.departure).toLocaleString();
        cards += /*html*/ `
          <div class="${style.cards}">
            <div class="cards">
              <h1>Destination ${flight.destination}</h1>
              <h2>Departure ${flight.departure}</h2>
              <h3>Capacity: ${flight.capacity}</h3>
              <button class="booking-flight" data-booking="${flight.id}">Reservar Vuelo</button>
            </div>
          </div>
        `;
      });

      const cardsContainer = `<div class="${style.cardsContainer}">${cards}</div>`;
      let contentContainer = `<div>${$content}</div>`;

      const title = /*html*/ `
        <h1 class="${style.title}">Panamerican Agency</h1>
        <h2 class="${style.title}">All Flights</h2>      
      `;

      const $header = /*html*/ `
        <nav>
          <h3>Ir a</h3>
          <ul>
            <li><a href="/register">Registrar</a></li>
            <li><a href="/login">Iniciar Sesion</a></li>
            <li><a href="/login" id="booking">Reservar un Vuelo</a></li>
          </ul>
        </nav>
      `;

      const combinedHTML = /*html*/ `
        <div class="container">${title}${$header}${cardsContainer}${contentContainer}</div>
      `;

      d.innerHTML = combinedHTML;

      function message() {
        alert('Debes Iniciar Sesion Para Reservar un vuelo');
      }
      const messages = document.getElementById('booking');
      messages.addEventListener('click', message);

      // Selecciona todos los botones con la clase booking-flight
      const $bookingFlights = document.querySelectorAll('.booking-flight');
      $bookingFlights.forEach(($booking) => {
        $booking.addEventListener('click', () => {
          console.log(`${$booking.getAttribute('data-booking')}`);
        });
      });

      logic();
      return flights;
    } catch (error) {
      console.log(error);
    }
  }

  showInformation();
}
