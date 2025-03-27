import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import App from './App.jsx'
import React from 'react'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Posts from './components/Posts.jsx'


const router = createBrowserRouter([
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/posts",
        element: <Posts/> 
      }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
