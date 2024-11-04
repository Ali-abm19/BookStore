import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import NotFoundPage from './pages/NotFound'
import Layout from "./components/Layout/Layout";
import AccountPage from "./pages/AccountPage";
import { useState } from "react";
import ProtectedRoute from "./components/User/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
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
          element: <ProductsPage />
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
            element={<ProfilePage user={user}
              setUser={setUser} />}
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
