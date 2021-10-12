import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './suspense_demo'

const rootEle = document.getElementById('root');

rootEle && ReactDOM.createRoot(rootEle).render(
  <App />
);