import React, {useState, useEffect} from 'react';
import {bindHook, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;


export default function App() {
  const [num, updateNum] = useState(0);
  console.log("App render", num);

  return (
    <div onClick={() => updateNum(1)}>
      <Child />
    </div>
  );
}

function Child() {
  console.log("child render");
  return <span>child</span>;
}
