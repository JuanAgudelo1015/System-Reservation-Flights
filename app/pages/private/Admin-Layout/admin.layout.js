import { navigateTo } from "../../../notes";

export function LayoutAdmin($content, logic) {
    const d = document.getElementById('root');
    const $header = /*html*/ `
        <nav>
            <h3>Navigate To</h3>
            <ul>
                <button id="home-admin">Home Admin</button>
                <button id="edit-flight">Edit flight</button>
                <button id="update-flight">Update flight</button>
                <button id="delete-flight">Delete flight</button>
                <button id="log-out">Log Out</button>
            </ul>
        </nav>
        <div>${$content}</div>
    `;

    d.innerHTML = $header;
    logic();

    const homeAdmin = document.getElementById("home-admin");
    console.log(`este es el `, homeAdmin)
    const editFlight = document.getElementById("edit-flight");
    const updateFlight = document.getElementById("update-flight");
    const deleteFlight = document.getElementById("delete-flight");
    const logOut = document.getElementById("log-out");


    if (homeAdmin) {
        homeAdmin.addEventListener('click', () => {
            navigateTo('/edit-flight');
        });
    }

    if (editFlight) {
        editFlight.addEventListener('click', () => {
            navigateTo('/edit-flight');
        });
    }

    if (updateFlight) {
        updateFlight.addEventListener('click', () => {
            navigateTo('/update-flight');
        });
    }

    if (deleteFlight) {
        deleteFlight.addEventListener('click', () => {
            navigateTo('/delete-flight');
        });
    }

    if (logOut) {
        logOut.addEventListener('click', (e) => {
            const leavingPage = confirm("Are you sure leaving this page");
            if (leavingPage) {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                localStorage.removeItem('id');
                alert("Leaving...");
                navigateTo('/login');
            } else {
                e.preventDefault();
                navigateTo('/private-home');
            }
        });
    }
}
