import React, {useState, useEffect, useDeferredValue} from 'react';
import {bindHook, utils} from 'log';

const {log, lanes2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('getNextLanes_entangledLanes', (lanes) => {
  log(SCHEDULE_COLOR, `纠缠的lane：`, lanes2Str(lanes));
})  

bindHook('expiredLanes', (lane) => {
  log(SCHEDULE_COLOR, `过期的lane：`, lanes2Str(lane));
})  

export default function App() {
  const [ctn, updateCtn] = useState('');
  const [num, updateNum] = useState(0);
  const deferredNum = useDeferredValue(num);

  return (
    <div >
      <input value={ctn} onChange={({target: {value}}) => {
        updateCtn(value);
        updateNum(num + 1);
      }}/>
        <BusyChild num={deferredNum}/>
    </div>
  );
}

const BusyChild = React.memo(({num}: {num: number}) => {
  const cur = performance.now();
  while (performance.now() - cur < 300) {}

  return <div>{num}</div>;
})