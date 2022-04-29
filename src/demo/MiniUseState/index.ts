declare global {
  interface Window { app: any; }
}

let callbackNode: number | undefined = undefined;

let workInProgressHook: Hook | undefined;
let isMount = true;

type Action = (key: any) => void;

interface Fiber {
  memoizedState?: Hook;
  stateNode: () => {click: () => void}
}

interface Hook {
  queue: Queue;
  memoizedState: any;
  next?: Hook;
}

interface Update {
  action: Action;
  next?: Update
}

interface Queue {
  pending?: Update
}

const fiber: Fiber = {
  memoizedState: undefined,
  stateNode: App
};

function schedule() {
  if (callbackNode) {
    clearTimeout(callbackNode);
  }
  callbackNode = setTimeout(() => {
    workInProgressHook = fiber.memoizedState;
    window.app = fiber.stateNode();
    isMount = false;
  });
}

function dispatchSetState(queue: Queue, action: Action) {
  const update: Update = {
    action,
    next: undefined
  }
  if (!queue.pending) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule();
}

function useState(initialState: any) {
  let hook;

  if (isMount) {
    hook = {
      queue: {
        pending: undefined
      },
      memoizedState: initialState,
      next: undefined
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      (workInProgressHook as Hook).next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = (workInProgressHook as Hook).next;
  }

  if (!hook) {
    throw new Error("目标Hook不存在");
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next as Update;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next as Update;
    } while (firstUpdate !== hook.queue.pending.next)

    hook.queue.pending = undefined;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchSetState.bind(null, hook.queue)];
}

function App() {
  const [num1, updateNum1] = useState(0);
  const [num2, updateNum2] = useState(100);

  console.log(`${isMount ? 'mount' : 'update'} `, num1, num2);

  return {
    click() {
      updateNum1((num: number) => num + 1);
      updateNum1((num: number) => num + 1);
      updateNum2((num: number) => num + 100);
      updateNum2((num: number) => num + 100);
    }
  }
}

schedule();

export {};