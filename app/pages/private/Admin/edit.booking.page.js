/**Valores ah modifar
 * - destination
 * - departure = salida
 * - capacity
*/
export function EditFlight() {
    const $content = /*html*/`
        <h1>Edit Flights</h1>
        <p>Enter the new values</p>
        <form id="form-flight">
            <select name="destination">
                <option value="LAX">LAX</option>
                <option value="MIA">MIA</option>
                <option value="CDG">CDG</option>
                <option value="JFK">JFK</option>
            </select>
            <input type="text"  id="departure" placeholder="Enter the new value the departure" required>
            <input type="text"  id="capacity" placeholder="Enter the new value the capacity" required>
            <input type="submit" value="Send the new values">
        </form>
    `;

    const logic = async () => {
        try {
            const searchParams = window.location.search;
            const newUrl = new URLSearchParams(searchParams);
            const editFlightId = newUrl.get('flightId');

            const getBookingInformation = await fetch(`http://localhost:3000/flights/${editFlightId}`);
            if (!getBookingInformation.ok) {
                throw new Error(`Hubo un error, Status: ${getBookingInformation.status}`);
            }
            const responseJson = await getBookingInformation.json();

            const $destination = document.querySelector('[name="destination"]');
            const $departure = document.getElementById('departure');
            const $capacity = document.getElementById('capacity');

            $destination.value = responseJson.destination
            $departure.value = responseJson.departure
            $capacity.value = responseJson.capacity

            const form = document.getElementById('form-flight');
            form.addEventListener('click', async (e) => {
                e.preventDefault();
                const addNewInformation = await fetch(`http://localhost:3000/flights/${editFlightId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        destination: $destination.value,
                        departure: $departure.value,
                        capacity: $capacity.value
                    })
                })

                if (addNewInformation.ok) {
                    console.log("The information has been update with succes")
                } else {
                    ("There were some errors")
                }
            })
        } catch (error) {
            console.log(error)
        }
    };
    return {
        $content,
        logic
    }
}