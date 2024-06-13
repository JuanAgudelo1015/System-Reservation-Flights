import { navigateTo } from "../../../notes";

export function CreateFlight() {
    const $content = /*html*/`
    <h2>Create Flight</h2>
        <form id="form-flight">
            <select name="destination">
                <option value="" disabled selected> ---Destino---- </option>
                <option value="LAX">LAX</option>
                <option value="CDG">CDG</option>
                <option value="MIA">MIA</option>
            </select>
            <input type="datetime-local" placeholder="Hora de salida" id="departure"/>
            <input type="number" placeholder="Capacidad" id="capacity"/>
            <input type="date" id="date"/>
            <input type="submit"/>
            <div id="all-tasks"></div>
        </form>
    `

    const logic = () => {
        const $form = document.getElementById('form-flight')
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const $InputDestination = document.querySelector('[name="destination"]').value;
            const $InputDeparture = document.getElementById('departure').value;
            const $InputCapacity = document.getElementById('capacity').value;

            try {
                const addNewTravel = await fetch('http://localhost:3000/flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        destination: $InputDestination,
                        departure: $InputDeparture,
                        capacity: $InputCapacity,
                    }),
                });
                if (!addNewTravel.ok) {
                    throw new Error(`Hubo un error, STATUS:${addNewTravel.status}`)
                }
                alert("The Travel has been add with succes")
                navigateTo('/home-admin');
            } catch (error) {
                console.log(error)
            }
        });
    }
    return {
        $content,
        logic
    }
};
