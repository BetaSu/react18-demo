import React, {useState, useEffect, useErrorBoundary, ReactNode, useLayoutEffect, useRef} from 'react';
import {bindHook, getLibraryMethod, utils} from 'log';
const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
}) 

bindHook('completeWork', (current, wip) => {
  log(RENDER_COLOR, `completeWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
}) 

bindHook('unwindWork', (wip, next) => {
  log(RENDER_COLOR, `unwindWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
}) 

function ErrorBoundary({children}: {children: ReactNode}) {
  const [errorMsg, updateError] = useState<Error | null>(null);
  const [count, updateCount] = useState<number>(0);

  useErrorBoundary((e: Error) => {
    console.warn('执行啦！！！', e);
    updateError(e);
  })

  return (
    <div onClick={() => updateCount(count => count + 1)}>
      {errorMsg ? '报错：' + errorMsg.toString() + count : children}
    </div>
  )
}

function Counter({num}: {num: number}) {

  // update时render阶段报错
  // if (num === 2) {
  //   throw new Error("render阶段报错");
  // }
  // mount时render阶段报错
  // throw new Error("render阶段报错");

  
  useLayoutEffect(() => {
    // update时commit阶段报错
    if (num === 2) {
      throw new Error("commit阶段报错");
    } 
    // mount时commit阶段报错
    throw new Error("commit阶段报错");
  }, [num])

  return <div>num is: {num}</div>;
}

// 用于调试 useErrorBoundary
export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <div onClick={() => updateNum(num + 1)}>
      <ErrorBoundary>
        <Counter num={num}/>
      </ErrorBoundary>
    </div>
  )
}