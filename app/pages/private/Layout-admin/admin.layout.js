import { navigateTo } from "../../../notes";

export function LayoutAdmin($content, logic) {
    const d = document.getElementById('root');
    const $header = /*html*/ `
        <nav>
            <h3>Navigate To</h3>
            <ul>
                <button id="home-admin">Home Admin</button>
                <button id="create-flight">Create flight</button>
                <button id="edit-flight">Edit flight</button>
                <button id="log-out">Log Out</button>
            </ul>
        </nav>
        <div>${$content}</div>
    `;

    d.innerHTML = $header;
    logic();
    
    const createFlight = document.getElementById("create-flight");
    const homeAdmin = document.getElementById("home-admin");
    const editFlight = document.getElementById("edit-flight");
    const deleteFlight = document.getElementById("delete-flight");
    const logOut = document.getElementById("log-out");


    createFlight.addEventListener('click', () => {
        navigateTo('/create-flight');
        return;
    })

    homeAdmin.addEventListener('click', () => {
        navigateTo('/home-admin');
        return;
    })

    editFlight.addEventListener('click', () => {
        navigateTo('/edit-flight');
        return;
    })

    editFlight.addEventListener('click', () => {
        navigateTo('/');
        return;
    })

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
