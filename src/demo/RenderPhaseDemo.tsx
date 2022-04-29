import React, {useState} from 'react';
import {bindHook, getLibraryMethod, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
})  

bindHook('changeLanes', (where, before, after) => {
  log(RENDER_COLOR, `change lanes：${where}`, `之前:${before} after:${after}`);
})  

bindHook('completeWork', (current, wip) => {
  log(RENDER_COLOR, `completeWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
}) 

// 用于调试 Reconciler 工作流程的Demo
const Cpn = () => {
  const [num, updateNum] = useState(0);

  return (
    <div onClick={() => {
      updateNum(num + 1)
      setTimeout(() => updateNum(num + 1));
      updateNum(num + 1)
      updateNum(num + 1)
    }} style={{color: `#${num}${num}${num}`}} title={num + ''}>
      Hello World {num}
    </div>
  )
}

export default () => {
  return <Cpn/>;
}