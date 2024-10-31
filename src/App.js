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


function App() {
  const [token, setToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

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
          path: '/account',
          element: <AccountPage
            isRegistered={false}
            setIsRegistered={setIsRegistered}
            token={token}
            setToken={setToken}
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
