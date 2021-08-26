import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const rootEle = document.getElementById('root');

rootEle && ReactDOM.createRoot(rootEle).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);