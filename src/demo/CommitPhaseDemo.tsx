import React, {useState, Component, useLayoutEffect} from 'react';
import {bindHook, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('commitBeforeMutationEffectsOnFiber', (fiber) => {
  log(COMMIT_COLOR, `commit BeforeMutationEffects`, fiber);
})  

bindHook('commitMutationEffectsOnFiber', (fiber) => {
  log(COMMIT_COLOR, `commit MutationEffects`, fiber);
})  

bindHook('commitLayoutEffectOnFiber', (fiber) => {
  log(COMMIT_COLOR, `commit LayoutEffect`, fiber);
}) 

bindHook('commitUpdateQueue', (fiber, effects) => {
  log(COMMIT_COLOR, `commit UpdateQueue`, effects);
})  

bindHook('updateDOMProperties', (dom, type) => {
  log(COMMIT_COLOR, `更新DOM属性 ${type}`, dom);
})

bindHook('updateDOM', (fiber, type) => {
  log(COMMIT_COLOR, `更新DOM ${type}`, fiber);
})


// 用于调试 commit阶段 工作流程的Demo
export default () => {
  const [num, updateNum] = useState(0);

  // 用于查看 删除DOM Element 的处理
  if (num % 2 !== 0) {
    return <div>noop</div>;
  }

  return (
    <div onClick={() => updateNum(num + 1)} style={{color: `#${num}${num}${num}`}} title={num + ''}>
      <SomeClassComponent/>
      <div>
        <SomeFunctionComponent/>
      </div>
    </div>
  )
}

class SomeClassComponent extends Component {
  state = {
    num: 0
  }
  componentWillUnmount() {
    console.log('SomeClassComponent will unmount');
  }
  onClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    // 用于查看 updateQueue 的处理
    e.stopPropagation();
    this.setState({
      num: this.state.num + 1
    }, () => {
      console.log('class cpn callback!');
    })
  }
  render() {
    return <p onClick={this.onClick}>some class component {this.state.num}</p>;
  }
}

function SomeFunctionComponent() {
  useLayoutEffect(() => {
    return () => console.log('SomeFunctionComponent will unmount');
  }, [])
  return <p>some function component</p>;
}
