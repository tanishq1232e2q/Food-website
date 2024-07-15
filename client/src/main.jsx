import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AdminProvider} from "./context/admincontext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AdminProvider>
)
