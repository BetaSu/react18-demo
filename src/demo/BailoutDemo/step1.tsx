import React, {useState, useEffect} from 'react';
import {bindHook, utils, getLibraryMethod} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
})  

function Input() {
  const [num, updateNum] = useState(0);

  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  )
}

export default function App() {
  
  return (
    <>
      <Input/>
      <ExpensiveCpn />
    </>
  );
}


function ExpensiveCpn() {
  console.log(3)
  let now = performance.now();
  while (performance.now() - now < 100) {}
  return <p>耗时的组件</p>;
}
