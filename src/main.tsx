import React from 'react';
import ReactDOM from 'react-dom';
import './globalLog';

import App from './ErrorBoundary';
// import App from './demo/ErrorCatchDemo';

const rootEle = document.getElementById('root');

rootEle && ReactDOM.createRoot(rootEle).render(<App/>);

  