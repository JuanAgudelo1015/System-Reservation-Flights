import { Home } from './pages/public/Home';
import { Register } from './pages/public/Register';
import { Login } from './pages/public/Login/login.page';
import { PrivateHome } from './pages/private/Home/private.home';
import { HomeAdmin } from './pages/private/Admin/home.page';
import { EditFlight } from './pages/private/Admin/edit.booking.page';
import { CreateFlight } from './pages/private/Admin/create.flight';
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
        { path: '/create-flight', page: CreateFlight }
    ],
};
