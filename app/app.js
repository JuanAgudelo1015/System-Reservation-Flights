import { Router } from './Router';

export function App() {
    const d = document.getElementById('root');
    console.log(d);
    if (!d) {
        console.log('Error al obtener el roor');
        return;
    }
    Router();
}
