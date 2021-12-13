import React, {useState, useId} from 'react';
import {bindHook, utils} from 'log';

const {log, getType2Use, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;


// 用于调试 Reconciler 工作流程的Demo
export default () => {
  const [num, updateNum] = useState(0);
  const id = useId();
  console.log('id', id);

  return (
    <div onClick={() => updateNum(num + 1)} style={{color: `#${num}${num}${num}`}} title={num + ''}>
      Hello
      <span>World {num}</span>
    </div>
  )
}


