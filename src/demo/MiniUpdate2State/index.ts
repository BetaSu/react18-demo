interface Hook {
  memoizedState: null,
  queue: {
    pending: null
  },
  baseState: null,
  baseQueue: null
}
type TAction = (...args: any) => any;
interface Update {
  lane: number;
  action: TAction;
  next?: Update
}

/**
 * update转换为state的迷你实现
 */

const hook: Hook = {
  memoizedState: null,
  queue: {
    pending: null
  },
  baseState: null,
  baseQueue: null
};

function createUpdate(lane: number, action: TAction): Update {
  const update = {
    lane,
    action,
    next: undefined
  };
  return update;
}

function processUpdateQueue() {
  let queue = hook.queue;

  let baseQueue = hook.baseQueue; 

  let pendingQueue = queue.pending;

  if (pendingQueue !== null) {
    // We have new updates that haven't been processed yet.
    // We'll add them to the base queue.
    if (baseQueue !== null) {
      // Merge the pending queue and the base queue.
      let baseFirst = baseQueue.next;
      let pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }

    hook.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }

  if (baseQueue !== null) {
    // We have a queue to process.
    let first = baseQueue.next;
    let newState = hook.baseState;
    let newBaseState = null;
    let newBaseQueueFirst = null;
    let newBaseQueueLast = null;
    let update = first;

    do {
      let updateLane = update.lane;

      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        let clone = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null,
        };

        if (newBaseQueueLast === null) {
          newBaseQueueFirst = newBaseQueueLast = clone;
          newBaseState = newState;
        } else {
          newBaseQueueLast = newBaseQueueLast.next = clone;
        } // Update the remaining priority in the queue.
        // TODO: Don't need to accumulate this. Instead, we can remove
        // renderLanes from the original lanes.

        currentlyRenderingFiber$1.lanes = mergeLanes(
          currentlyRenderingFiber$1.lanes,
          updateLane
        );
        markSkippedUpdateLanes(updateLane);
      } else {
        // This update does have sufficient priority.
        if (newBaseQueueLast !== null) {
          let _clone = {
            // This update is going to be committed so we never want uncommit
            // it. Using NoLane works because 0 is a subset of all bitmasks, so
            // this will never be skipped by the check above.
            lane: NoLane,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null,
          };
          newBaseQueueLast = newBaseQueueLast.next = _clone;
        } // Process this update.

        let action = update.action;
        newState = action(newState);
      }

      update = update.next;
    } while (update !== null && update !== first);

    if (newBaseQueueLast === null) {
      newBaseState = newState;
    } else {
      newBaseQueueLast.next = newBaseQueueFirst;
    }

    hook.memoizedState = newState;
    hook.baseState = newBaseState;
    hook.baseQueue = newBaseQueueLast;
  }

  return hook.memoizedState;
}
