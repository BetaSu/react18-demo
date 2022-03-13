import React from 'react';
import ReactDOM from 'react-dom';
import './globalLog';
// import App from './demo/SuspenseDemo'
// import './demo/SchedulerDemo';
// import App from './demo/BaseScheduleDemo';
// import App from './demo/LongTaskDemo';
// import App from './demo/BaseScheduleDemo';
// import App from './demo/RenderPhaseDemo';
import App from './demo/testDemo1';

const rootEle = document.getElementById('root');

// import './demo/MiniUpdate2State';

rootEle && ReactDOM.createRoot(rootEle).render(<App/>);
