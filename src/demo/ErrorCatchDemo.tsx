import React, {useState, Component, useLayoutEffect} from 'react';
import {bindHook, utils, Phase} from 'log';

const {log, getPhaseFromExecutionContext, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR, USERSPACE_COLOR}} = utils;

const phaseName2Color = {
  commit: COMMIT_COLOR,
  schedule: SCHEDULE_COLOR,
  render: RENDER_COLOR,
  noop: USERSPACE_COLOR
}

bindHook('createClassErrorUpdate', (fnName, executionContext, fiber, update) => {
  log(phaseName2Color[getPhaseFromExecutionContext(executionContext)], `由于${fnName}，在ClassComponent创建ErrorUpdate`, fiber);
}) 

bindHook('createRootErrorUpdate', (executionContext, fiber, update) => {
  log(phaseName2Color[getPhaseFromExecutionContext(executionContext)], `render阶段在Root捕获错误`, fiber);
}) 

bindHook('captureCommitPhaseErrorOnRoot', (errorInfo, update, root) => {
  log(COMMIT_COLOR, `commit阶段在Root捕获错误`, errorInfo);
})  

bindHook('ErrorUpdate on ClassComponent', (phase: Phase, update, fiber) => {
  log(phaseName2Color[phase], `${phase}阶段在ClassComponent调度ErrorUpdate`, fiber);
}) 

bindHook('ErrorUpdate on Root', (phase: Phase, update, fiber) => {
  log(phaseName2Color[phase], `${phase}阶段在Root调度ErrorUpdate`, fiber);
})  





// 用于调试 commit阶段 工作流程的Demo
export default () => {
  const [num, updateNum] = useState(0);

  return (
    <div onClick={() => updateNum(num + 1)} style={{color: `#${num}${num}${num}`}} title={num + ''}>
      <ErrorBoundary>
        <div>
          <SomeFunctionComponent/>
        </div>
      </ErrorBoundary>
    </div>
  )
}

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  // 试试注释componentDidCatch，观察错误冒泡到Root处理的情况
  componentDidCatch() {
    console.warn('catch error in componentDidCatch');
  }
  render() {

    if (this.state.hasError) {
      return <div>Error !</div>;
    }

    return <div>{this.props.children}</div>;
  }
}

function SomeFunctionComponent() {
  useLayoutEffect(() => {
    // commit阶段抛出错误
    // throw new Error("Error!");
  }, [])

  // render阶段抛出错误
  throw new Error("Error!");
  return <p>some function component</p>;
}