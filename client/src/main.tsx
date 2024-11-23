import React from 'react'
import ReactDOM  from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import "./App.css"
import Details from './detailPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:detail",
    element: <Details />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
   <RouterProvider router={router} />
   
  </React.StrictMode>
  ,
)