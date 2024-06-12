/**Valores ah modifar
 * - destination
 * - departure = salida
 * - capacity
*/
export function EditFlight() {
    const $content = /*html*/`
        <h1>Edit Flights</h1>
        <p>Enter the new values</p>
        <form>
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
        const searchParams = window.location.search;
        const newUrl = new URLSearchParams(searchParams);
        const editFlightId = newUrl.get('flightId');
        console.log(editFlightId)
    }

    return {
        $content, 
        logic
    }
}