import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout  from './components/layouts/Layout';
import Dashboard from './components/pages/Dashboard';
import Link from './components/pages/Link';
import Redirect from './components/pages/Redirect';
import LandingPage from './components/pages/LandingPage';
import Auth from './components/pages/Auth';


const router =  createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/link/:id',
        element:<Link/>
      },
      {
        path:'/:id',
        element:<Redirect/>
      }
    ]
  }
]);

function App() {

  

  return <RouterProvider router={router}/>
}

export default App
