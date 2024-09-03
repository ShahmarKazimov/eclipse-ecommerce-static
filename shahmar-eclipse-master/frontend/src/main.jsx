import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/home/homepage.jsx';
import Rolex from './pages/rolex/rolex.jsx';
import Hamilton from './pages/hamilton/hamilton.jsx';
import Hublot from './pages/hublot/hublot.jsx';
import Cartier from './pages/cartier/cartier.jsx';
import Ulysse from './pages/ulysseNardin/ulysse.jsx';
import Magazine from './pages/magazine/magazine.jsx';
import Security from './pages/security/security.jsx';
import Faq from './pages/faq/faq.jsx';
import Watches from './pages/watches/watches.jsx';
import Checkout from './components/checkout/checkout.jsx';
import Wishlist from './components/wishlist/wishlist.jsx';
import Register from './components/register/register.jsx';
import Profile from './components/profile/profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/rolex',
        element: <Rolex />
      },
      {
        path: '/cartier',
        element: <Cartier />
      },
      {
        path: '/hublot',
        element: <Hublot />
      },
      {
        path: '/hamilton',
        element: <Hamilton />
      },
      {
        path: '/ulysseNardin',
        element: <Ulysse />
      },
      {
        path: '/magazine',
        element: <Magazine />
      },
      {
        path: '/security',
        element: <Security />
      },
      {
        path: '/watches',
        element: <Watches />
      },
      {
        path: '/faq',
        element: <Faq />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile',
        element: <Profile />
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
