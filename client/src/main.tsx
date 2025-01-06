import React from 'react'
import ReactDOM  from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import "./App.css"
import Details from './detailPage.tsx';
import Search from './search.tsx';
import PopMovies from './popmovies.tsx';
import PopTv from './poptv.tsx';
import TopMovies from './topmovies.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:detail",
    element: <Details />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/popmovies",
    element: <PopMovies />,
  },
  {
    path: "/poptv",
    element: <PopTv />,
  },
  {
    path: "/topmovies",
    element: <TopMovies />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
   <RouterProvider router={router} />
   
  </React.StrictMode>
  ,
)