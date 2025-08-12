import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import PropertyDetails from "../../features/property/PropertyDetails";
import FavoritePage from "../../features/favorite/favoritePage";
import PropertyPage from "../../features/property/PropertyPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
             {element: <RequireAuth />, children: [
              
            ]},
            
            {path: '', element: <PropertyPage />},
          
              {path: '/property', element: <PropertyPage />},
            {path: '/property/:id', element: <PropertyDetails />},
            
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
            

            {path: '/favorites', element: <FavoritePage />},

           
            {path: '/server-error', element: <ServerError />},
               {path: '/login', element: <LoginForm />},
            {path: '/register', element: <RegisterForm />},

            {path: '/not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]
)