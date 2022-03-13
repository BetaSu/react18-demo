class SyntheticEvent {
  nativeEvent: Event;
  _stopPropagation: boolean;
  constructor(e: Event) {
    this.nativeEvent = e;
    this._stopPropagation = false;
  }
  stopPropagation() {
    this._stopPropagation = true;
    if (this.nativeEvent.stopPropagation) {
      this.nativeEvent.stopPropagation();
    }
  }
}

const triggerEventFlow = (paths: any, type: string, se: SyntheticEvent) => {
  for (let i = paths.length; i--; ) {
    const pathNode = paths[i];
    const callback = pathNode[type];
    if (callback) {
      callback.call(null, se);
    }
    if (se._stopPropagation) {
      break;
    }
  }
};

const dispatchEvent = (e: Event, type: string) => {
  const se = new SyntheticEvent(e);
  const ele = e.target;
  let fiber;
  if (!ele) {
    return;
  }
  for (let prop in ele) {
    if (prop.toLowerCase().includes("fiber")) {
      fiber = (ele as any)[prop];
    }
  }
  const paths = collectPaths(type, fiber);
  triggerEventFlow(paths, type + "CAPTURE", se);
  if (!se._stopPropagation) {
    triggerEventFlow(paths.reverse(), type, se);
  }
};

const collectPaths = (type: string, begin: any): any[] => {
  const paths = [];
  while (begin.tag !== 3) {
    const { memoizedProps, tag } = begin;
    if (tag === 5) {
      const eventName = ("on" + type).toUpperCase();
      if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
        const pathNode: any = {};
        pathNode[type.toUpperCase()] = memoizedProps[eventName];
        paths.push(pathNode);
      }
    }
    begin = begin.return;
  }
  return paths;
};

export const addEvent = (container: HTMLElement, type: string) => {
  container.addEventListener(type, (e) => {
    dispatchEvent(e, type.toUpperCase());
  });
};
