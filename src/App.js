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
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
  </div>;
}

export default App;
