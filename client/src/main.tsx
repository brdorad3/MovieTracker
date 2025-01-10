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
import { ClerkProvider } from '@clerk/clerk-react'
import Login from './login.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


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
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">

   <RouterProvider router={router} />

   </ClerkProvider>
  </React.StrictMode>
  ,
)