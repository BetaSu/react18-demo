import React, {useState} from 'react';
import {bindHook, getLibraryMethod, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('placeChild', (type, fiber, lastPlacedIndex) => {
  log(RENDER_COLOR, `${type} lastPlacedIndex: ${lastPlacedIndex}`, fiber);
}) 

// 用于调试 Diff算法 的Demo
export default function App() {
  const [num, updateNum] = useState(0);

  if (num === 0) {
    return (
      <ul onClick={() => updateNum(1)}>
        <li key="a">a</li>
        <li key="b">b</li>
        <li key="c">c</li>
        <li key="d">d</li>
      </ul>
    )
  }

  return (
    <ul onClick={() => updateNum(1)}>
      <li key="a">a</li>
      <li key="c">c</li>
      <li key="d">d</li>
      <li key="b">b</li>
    </ul>
  )
}