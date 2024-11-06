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
import AdminProducts from "./components/Dashboard/AdminProducts";
import CartPage from "./pages/CartPage";



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
          element: <SingleProductPage />
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
        // {
        //   path: '/dashboard',
        //   element: <DashboardPage />,
        //   children: [{ path: '/dashboard/books', element: <AdminProducts user={user} /> },]
        // },
        {
          path: '/dashboard', element: <ProtectedRoute checkAdmin={true} user={user}
            element={<DashboardPage user={user} />}
          />,
          // children: [{ path: '/dashboard/books', element: <AdminProducts user={user} /> },]
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
