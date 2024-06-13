import { decryptData } from "../../../helpers";
import { navigateTo } from "../../../Router";
export function Login() {
    const d = document.getElementById("root");
    const loginForm = /*html*/ `
    <h1>Panamerican Agency</h1>
        <form id="loginForm">
            <input type="email" id="email" placeholder="Enter your Email" required>
            <input type="password" id="password" placeholder="Enter your password" required>
            <button type="submit" id="submit">Log in</button>
            </form>
        <button id="register">Register</button>
    `;

    d.innerHTML = loginForm;

    const $obtaininigDataLogin = document.getElementById('loginForm');
    $obtaininigDataLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const register = document.getElementById('register');
        register.addEventListener('click', () => {
            navigateTo('/register')
        })

        try {
            const $email = document.getElementById("email").value;
            const $password = document.getElementById("password").value;
            const obtaininigDataUser = await fetch('http://localhost:3000/users');

            if (!obtaininigDataUser.ok) {
                throw new Error(`Hubo un error: Error ${obtaininigDataUser.status}`);
            }

            const response = await obtaininigDataUser.json();
            const validateUser = response.find(user => user.email === $email);

            if (!validateUser) {
                alert("Enter a valid email address");
                return;
            }

            if (decryptData(validateUser.password) !== $password) {
                alert("Enter a valid password");
                return;
            }

            alert("Logging in...");
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem('id', validateUser.id)
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', validateUser.userRole); // Guardar el rol del usuario

            navigateTo(validateUser.userRole === "1" ? '/home-admin' : '/private-home');
            return;
        } catch (error) {
            console.error(error);
        }
    });
}
