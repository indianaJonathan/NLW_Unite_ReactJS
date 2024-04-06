import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";

import Attendees from "./pages/attendees";
import Events from "./pages/events";
import { App } from './app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/attendees",
        element: <Attendees />
      },
      {
        path: "/attendees/:eventId",
        element: <Attendees />
      },
      {
        path: "events",
        element: <Events />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
