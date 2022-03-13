import React, {useState, useEffect} from 'react';
import {bindHook, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;


// 用于调试 Reconciler 工作流程的Demo
export default () => {
  const [num, updateNum] = useState(0);
  console.log('App render', num);

  return (
    <div onClick={() => updateNum(num + 1)}>
      <Child/>
    </div>
  )
}


function Child() {
  console.log('child render');
  return <span>child</span>;
}