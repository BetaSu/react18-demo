interface TWIP {
  type: any;
  tag: number;
  memoizedProps: any;
  pendingProps: any;
}

let logIndex = 0;

export const log = (color: string, label: string, message?: any) => {
	console.log(
    `${logIndex++} %c ${label} %c`,
    `background-color: ${color}; color: #FFFFFF`,
    `background-color: inherit; color: inherit`
  , exist(message) ? message : '');
}

export const exist = (data: any) => data !== undefined && data !== null;

export const getReadableAnswer = (count: number, answer: number) => {
  return `第${count + 1}题，答案：${answer}`;
}

export const createCounter = (initialCount = 0) => {
  let count = initialCount;
  return {
    add() {
      count++;
    },
    reset() {
      count = initialCount;
    },
    get() {
      return count;
    }
  }
}

// perform work 完成时的状态
export const exitStatus2Str = (exitStatus: number) => {
  return [
    'RootIncomplete',
    'RootFatalErrored',
    'RootErrored',
    'RootSuspended',
    'RootSuspendedWithDelay',
    'RootCompleted'
  ][exitStatus];
}

export const lanes2Str = (lanes: number) => {
  const str = lanes.toString(2);
  return str.split('').reverse().reduce((prev, cur, i) => {
    let icon = cur;
    if (i !== 0 && i % 4 === 0) {
      icon += ' ';
    }
    return icon + prev;
  }, '')
}

export const lane2LaneName = (lane: number) => {
  return {
    0b0000000000000000000000000000000: 'NoLane',
    0b0000000000000000000000000000001: 'SyncLane',
    0b0000000000000000000000000000010: 'InputContinuousHydrationLane',
    0b0000000000000000000000000000100: 'InputContinuousLane',
    0b0000000000000000000000000001000: 'DefaultHydrationLane',
    0b0000000000000000000000000010000: 'DefaultLane',
    0b0000000000000000000000000100000: 'TransitionHydrationLane',
    0b0000000000000000000000001000000: 'TransitionLane1',
    0b0000000000000000000000010000000: 'TransitionLane2',
    0b0000000000000000000000100000000: 'TransitionLane3',
    0b0000000000000000000001000000000: 'TransitionLane4',
    0b0000000000000000000010000000000: 'TransitionLane5',
    0b0000000000000000000100000000000: 'TransitionLane6',
    0b0000000000000000001000000000000: 'TransitionLane7',
    0b0000000000000000010000000000000: 'TransitionLane8',
    0b0000000000000000100000000000000: 'TransitionLane9',
    0b0000000000000001000000000000000: 'TransitionLane10',
    0b0000000000000010000000000000000: 'TransitionLane11',
    0b0000000000000100000000000000000: 'TransitionLane12',
    0b0000000000001000000000000000000: 'TransitionLane13',
    0b0000000000010000000000000000000: 'TransitionLane14',
    0b0000000000100000000000000000000: 'TransitionLane15',
    0b0000000001000000000000000000000: 'TransitionLane16',
    0b0000000010000000000000000000000: 'RetryLane1',
    0b0000000100000000000000000000000: 'RetryLane2',
    0b0000001000000000000000000000000: 'RetryLane3',
    0b0000010000000000000000000000000: 'RetryLane4',
    0b0000100000000000000000000000000: 'RetryLane5',
    0b0001000000000000000000000000000: 'SelectiveHydrationLane',
    0b0010000000000000000000000000000: 'IdleHydrationLane',
    0b0100000000000000000000000000000: 'IdleLane',
    0b1000000000000000000000000000000: 'OffscreenLane'
  }[lane];
}

export const getPhaseFromExecutionContext = (executionContext: number) => {
  if ((executionContext & 2) !== 0) {
    return 'render';
  }
  if ((executionContext & 4) !== 0) {
    return 'commit';
  }
  // 缺少schedule阶段的判断
  return 'noop';
}

export const COLOR = {
  // 处于调度阶段
  SCHEDULE_COLOR: '#727999',
  // 处于render阶段
  RENDER_COLOR: '#327205',
  // 处于commit阶段
  COMMIT_COLOR: '#997205',
  // 不处于React某个阶段，而是用户代码中
  USERSPACE_COLOR: '#197205'
}