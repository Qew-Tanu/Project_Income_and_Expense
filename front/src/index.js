import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './Pages/Homepage';
import Loginpage from './Pages/Loginpage';
import Signuppage from './Pages/Signuppage';
import Recording from './Pages/Recording';
import Createincome from './Pages/Createincome';
import Createexpense from './Pages/Createexpense';
import ErrorPage from './Pages/Error-page';
import Nopage from './Pages/Nopage';
import Dashboard from './Pages/Dashboard';
import Editpage from './Pages/Editpage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signuppage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Recording />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "addincome",
        element: <Createincome />,
      },
      {
        path: "edit/:id",
        element: <Editpage />,
      },
      {
        path: "addexpense",
        element: <Createexpense />,
      },

      {
        path: "*",
        element: <Nopage />,
      },
    ],
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
