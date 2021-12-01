import React, {useState} from 'react';
import {bindHook, utils} from 'log';

const {log, getType2Use, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getType2Use(wip));
})  

bindHook('completeWork', (current, wip) => {
  log(RENDER_COLOR, `completeWork`, getType2Use(wip));
}) 

// 用于调试 Reconciler 工作流程的Demo
export default () => {
  const [num, updateNum] = useState(0);
  return (
    <div onClick={() => updateNum(num + 1)} style={{color: `#${num}${num}${num}`}} title={num + ''}>
      Hello
      <span>World {num}</span>
    </div>
  )
}