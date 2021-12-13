import {
  unstable_IdlePriority as IdlePriority,
  unstable_ImmediatePriority as ImmediatePriority,
  unstable_LowPriority as LowPriority,
  unstable_NormalPriority as NormalPriority,
  unstable_UserBlockingPriority as UserBlockingPriority,
  unstable_getFirstCallbackNode as getFirstCallbackNode,
  unstable_scheduleCallback as scheduleCallback,
  unstable_shouldYield as shouldYield,
  unstable_cancelCallback as cancelCallback,
  unstable_runWithPriority as runWithPriority,
  unstable_getCurrentPriorityLevel as getCurrentPriorityLevel,
} from "scheduler";

type Priority = typeof IdlePriority | typeof ImmediatePriority | typeof LowPriority | typeof NormalPriority | typeof UserBlockingPriority;

const priorityList: Priority[] = [
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
  IdlePriority,
]

const priority2Name = [
  'noop',
  'ImmediatePriority',
  'UserBlockingPriority',
  'NormalPriority',
  'LowPriority',
  'IdlePriority',
]

const root = document.querySelector('#root') as Element;

console.log('in');

let curIndex = 0;
const taskList: Priority[] = [];
let prevPriority: Priority = IdlePriority;

// 初始化优先级对应按钮
priorityList.forEach(priority => {
  const btn = document.createElement('button');
  root.appendChild(btn);
  btn.innerText = priority2Name[priority];

  btn.onclick = () => {
    // 插入3个任务
    taskList.push(priority);
    taskList.push(priority);
    taskList.push(priority);
    debugger
    schedule();
  };
})

/**
 * 需要考虑4种情况
 * 1. 正常执行任务
 * 2. 老任务执行时，新任务是低优先级，继续执行老任务
 * 3. 老任务执行时，新任务是同优先级，继续执行老任务
 * 4. 老任务执行时，新任务是高优先级，优先执行新任务
 */
function schedule() {
  console.log('schedule');
  const cb = getFirstCallbackNode();
  const curPriority = taskList[taskList.length - 1];
  console.log(1);
  if (curPriority && curPriority < prevPriority && cb) {
    // 情况4 打断老任务，重新调度新任务
    cancelCallback(cb);
  }
  console.log(2);
  if (curPriority && curPriority >= prevPriority) {
    // 情况2、3 继续老任务，不调度新任务
    return;
  }
  console.log(3);
  if (!curPriority) {
    // 没有task需要执行
    return cb && cancelCallback(cb);
  }
  console.log(4);
  // 情况1
  scheduleCallback(curPriority, perform);
}

function perform() {
  insertItem();
  schedule();
  return perform;
}

const createElement = (type: string, content: string) => {
  const ele = document.createElement(type);
  ele.innerText = content;
  return ele;
};



const insertItem = () => {
  const task = taskList.pop();
  prevPriority = task || IdlePriority;

  const y = shouldYield();
  console.log(y, task);
  while (task && !y) {
    const curPriority = getCurrentPriorityLevel();
    const li = createElement("li", `${curIndex++} ${priority2Name[curPriority]}`);
    doSomeBuzyWork(1000);
    root.appendChild(li);
  }
};

const doSomeBuzyWork = (len: number) => {
  let result = 0;
  while(len--) {
    result +=len;
  }
}