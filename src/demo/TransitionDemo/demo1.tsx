import React, {useState, useEffect, useTransition} from 'react';
import {bindHook, utils} from 'log';

const {log, lanes2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('getNextLanes_entangledLanes', (lanes) => {
  log(SCHEDULE_COLOR, `纠缠的lane：`, lanes2Str(lanes));
}) 

// 快速点击后可以看到快速闪过的 999999999
export default function App() {
  const [num, updateNum] = useState(0);
  const [isPending, startTransition] = useTransition();

  return (
    <div 
      style={{color: isPending ? 'red' : 'black'}}
      onClick={() => {
        updateNum(222222);
        startTransition(() => updateNum(4444));
      }}>{num}</div>
  );
}