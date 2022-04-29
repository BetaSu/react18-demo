import React, {useState, useEffect} from 'react';
import {bindHook, utils, getLibraryMethod} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

// bindHook('beginWork', (current, wip) => {
//   log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
// })  

function InputWrapper({children}: {children: React.ReactNode}) {
  const [num, updateNum] = useState(0);

  return (
    <div title={num + ''}>
    <input value={num} onChange={(e) => updateNum(+e.target.value)} />
    <p>num is {num}</p>
    {children}
  </div>
  )
}

export default function App() {
  
  return (
    <InputWrapper>
      <ExpensiveCpn />
    </InputWrapper>
  );
}


function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}
