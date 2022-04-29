import React, {useState, useEffect} from 'react';
import {bindHook, utils, getLibraryMethod} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
})  

bindHook('completeWork', (current, wip) => {
  log(RENDER_COLOR, `completeWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
})  

export default function App() {
  
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}

function Input() {
  const [num, updateNum] = useState(0);

  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  )
}


function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <ExpensiveChild/>;
}

function ExpensiveChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的子组件 render');
  return <ExpensiveGrandChild />;
}

function ExpensiveGrandChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的孙组件 render');
  return <p>耗时的组件</p>;
}