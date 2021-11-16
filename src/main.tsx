import React from 'react';
import ReactDOM from 'react-dom';
import './setLog';

// import App from './suspense_demo'
import App from './longTaskDemo';

const rootEle = document.getElementById('root');

// ReactDOM.render(<App/>, rootEle)

rootEle && ReactDOM.createRoot(rootEle).render(
  <App />
);