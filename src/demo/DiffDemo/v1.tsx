import React, {useState} from 'react';
import {bindHook, getLibraryMethod, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;


bindHook('placeChild', (type, fiber, lastPlacedIndex) => {
  log(RENDER_COLOR, `${type} lastPlacedIndex: ${lastPlacedIndex}`, fiber);
}) 

// 用于调试 Diff算法 的Demo
export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <div onClick={() => updateNum(1)}>
      {
        num === 0 ? <h1>before</h1> : <h2>after</h2>
      }
    </div>
  )
}