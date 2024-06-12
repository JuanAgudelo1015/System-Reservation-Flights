import { Home } from './pages/public/Home';
import { Register } from './pages/public/Register';
import { Login } from './pages/public/Login/login.page';
import { PrivateHome } from './pages/private/Home/private.home';
import { HomeAdmin } from './pages/private/Admin';
import { EditFlight } from './pages/private/Admin-Layout/edit.booking.page';
export const routes = {
    public: [
        { path: '/register', page: Register },
        { path: '/login', page: Login },
        { path: '/', page: Home },
    ],

    private: [
        { path: '/private-home', page: PrivateHome }
    ],

    admin: [
        { path: '/home-admin', page: HomeAdmin },
        { path: '/edit-flight', page: EditFlight },
    ],
};
