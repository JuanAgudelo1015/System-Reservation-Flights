import { encryptData } from '../../../helpers';
import { navigateTo } from '../../../Router';
export function Register() {
    const d = document.getElementById('root');
    const form = /*html*/ `
    <h1>Panamerican Agency</h1>
    <h2>Register</h2>
        <form>
            <input type="text" placeholder = "Enter your name" id="name" required>
            <input type="email" placeholder = "Enter your email" id="email" required>
            <input type="password" placeholder = "Enter your password" id="password" required>
            <button value="register">Register</button>
            <a href="/login">Navige To Login</a>
        </form>
    `;
    d.innerHTML = form;
    const obtaininigDataForm = document.getElementsByTagName('form')[0];
    // Recorrer el formulario cuando le den enviar los datos
    obtaininigDataForm.addEventListener('submit', async (e) => {
        // Prevenir la accion por defecto del formulario que es enviar y recargar, para luego validar los datos
        e.preventDefault();
        const $name = document.getElementById('name');
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        const addUser = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userRole: "2",
                name: $name.value,
                email: $email.value,
                password: encryptData($password.value)
            }),
        });
        if (!addUser.ok) {
            console.log(`Hubo un error: Status: ${addUser.status}`)
            return;
        }
        alert(`User name with ${$name.value} successfully added`);
        navigateTo('/login')
    });
}
