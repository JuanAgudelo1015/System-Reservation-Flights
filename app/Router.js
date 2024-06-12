import { routes } from './routes';
import { PrivateLayout } from './pages/private/Layout';
import { LayoutAdmin } from './pages/private/Admin-Layout/admin.layout';
import { PublicLayout } from './pages/public/Layout';

let currentPath = null;

export function navigateTo(path) {
    if (currentPath === path) {
        return;
    }
    currentPath = path

    window.history.pushState({}, '', path);
    const navigationEvent = new CustomEvent('navigation');
    window.dispatchEvent(navigationEvent);
}

export function Router() {
    currentPath = window.location.pathname;

    const publicRoute = routes.public.find((route) => route.path === currentPath);
    const privateRoute = routes.private.find((route) => route.path === currentPath);
    const adminRoute = routes.admin.find((route) => route.path === currentPath);

    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('userRole');

    // Si la ruta es publica, retornar la ruta publica
    if (publicRoute){
        const { $content, logic } = publicRoute.page();
        PublicLayout($content, logic);
        return;
    }

    // Si la ruta es privada y el usuario no esta autenticado, retornar al login, de lo contrario retornar la ruta privada
    if (privateRoute){
        if (!isAuthenticated){
            navigateTo('/login');
            return;
        }
        const { $content, logic } = privateRoute.page();
        PrivateLayout($content, logic);
        return;
    }

    // Si el usuario esta intentando acceder a login, oh register y el usuario ya esta autenticado, retornar ah private-home
    if (currentPath === '/register' || currentPath === '/login'){
        if (isAuthenticated){
            navigateTo('/private-home');
            return;
        }
        publicRoute.page();
        return;
    }

    // Si es adminRoute, y esta autenticado, pero el user rol es distinto de uno, retonar ah private-home, de lo contrario
    // retornar ah home-admin
    if (adminRoute && isAuthenticated){
        if (userRole !== "1"){
            console.log("No puedes acceder ah esta vista, no sos administrador")
            navigateTo('/private-home')
            return;
        }
        const { $content, logic } = adminRoute.page();
        LayoutAdmin($content, logic);
        return;
    }
    // Si no se encuentra la ruta, not found
    navigateTo('/not-found');
}
