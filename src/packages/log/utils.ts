interface TWIP {
  type: any;
  tag: number;
  memoizedProps: any;
}

export const getType2Use = (wip: TWIP): string => {
  const {type, tag, memoizedProps} = wip;
  switch (tag) {
    case 3:
      return '根组件';
    case 2:
      return `${type.name}（函数组件或类组件）`;
    case 1:
      return `${type.name}（类组件）`;
    case 0:
      return `${type.name}（函数组件）`;
    case 6:
      return `${memoizedProps}（文本组件）`
    default:
      return type;
  }
}

export const log = (color: string, label: string, message?: any) => {
	console.log(
    `%c ${label} %c`,
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
