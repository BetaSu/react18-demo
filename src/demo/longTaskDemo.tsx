import React, {useEffect, useRef, useState, useTransition} from 'react';
import {flushSync} from 'react-dom';
import {bindHook, utils} from 'log';

const {log, lanes2Str, lane2LaneName, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('continuationCallback', (root) => {
  log(SCHEDULE_COLOR, `continuationCallback`);
}) 
bindHook('priorityNotChange', (priority) => {
  log(SCHEDULE_COLOR, 'priority没变化，继续原callback', priority);
})  

bindHook('ensureRootIsScheduled', (lanes, lane) => {
  log(SCHEDULE_COLOR, `调度root，lanes：${lanes2Str(lanes)}`, `优先级：${lane2LaneName(lane)}`);
})

bindHook('scheduleCallback', (type, cbName, lane) => {
  log(SCHEDULE_COLOR, `调度新callback，类型：${type}，回调：`, cbName);
})

export default function App() {
  const [count, updateCount] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const len = 40000;

  const onClick = () => {
    console.log('click!');
    updateCount(count => count + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      console.log('not click');
      updateCount(100);
    }, 1000);
    setTimeout(() => {
      btnRef.current?.click();
    }, 1010);
  }, [])

  return (
    <ul>
      count is: {count}
      <button ref={btnRef} onClick={onClick}>低优任务</button>
      {Array(len).fill(0).map((_, i) => <li key={i}>{i}</li>)}
    </ul>
  );
}
