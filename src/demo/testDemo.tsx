import React, {useState, useId} from 'react';
import {bindHook, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;


// 用于调试 Reconciler 工作流程的Demo
export default function App() {
  const Child = () => <div>I am child.</div>;

  return <Child/>;
}