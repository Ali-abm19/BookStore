import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";

import "./App.css";
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import NotFoundPage from './pages/NotFound'
import Layout from "./components/Layout/Layout";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./components/User/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [cartBooks, setCartBooks] = useState([]);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout
        user={user}
        setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/home',
          element: <HomePage />
        },
        {
          path: '/books',
          element: <ProductsPage
            setCartBooks={setCartBooks}
            cartBooks={cartBooks}
          />
        },
        {
          path: '/books/:id',
          element: <SingleProductPage
            setCartBooks={setCartBooks}
            cartBooks={cartBooks}
          />
        },
        {
          path: '/signIn',
          element: <AccountPage
            isRegistered={true}
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
          />
        },
        {
          path: '/signUp',
          element: <AccountPage
            isRegistered={false}
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
          />
        },
        {
          path: '/profile',
          element: <ProtectedRoute
            token={token}
            user={user}
            setUser={setUser}
            checkAdmin={false}
            element={<ProfilePage user={user}
              setUser={setUser} />}
          />
        },
        {
          path: '/dashboard', element: <ProtectedRoute checkAdmin={true} user={user}
            element={<DashboardPage user={user} />}
          />,
        },
        {
          path: '/cart',
          element: <CartPage
            user={user}
            cartBooks={cartBooks}
            setCartBooks={setCartBooks}
          />
        },
        {
          path: 'cart/checkout',
          element: <CheckoutPage
            user={user}
            cartBooks={cartBooks}
            setCartBooks={setCartBooks}
          />
        },
        {
          path: '/myOrders',
          element: <OrdersPage
          />
        },
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ]);

  return <div className="App">
    <RouterProvider router={router} />
  </div>;
}

export default App;
