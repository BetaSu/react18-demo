import React, { Suspense, useState, useEffect, useTransition } from "react";
import {bindHook, getLibraryMethod, utils} from 'log';
import {sleep, wrapPromise} from './utils';

const {log, lanes2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

// bindHook('beginWork', (current, wip) => {
//   log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
// })

bindHook('markRootSuspended', (suspendedLanes, rootSuspendedLanes, rootPingedLanes) => {
  log(SCHEDULE_COLOR, 'mark Root Suspended', lanes2Str(suspendedLanes));
})
bindHook('markRootEntangled', (lanes) => {
  log(SCHEDULE_COLOR, 'mark Root Entangled', lanes2Str(lanes));
})

bindHook('attachWakeableListeners', (root, wakeable, lanes) => {
  log(RENDER_COLOR, `设置一个ping，优先级为${lanes2Str(lanes)}`, wakeable);
})
bindHook('markRootPinged', (rootPingedLanes) => {
  log(RENDER_COLOR, 'Root Pinged，lanes：', lanes2Str(rootPingedLanes));
})

bindHook('retryTimedOutBoundary', (retryLane) => {
  log(RENDER_COLOR, 'Root retry，lane：', lanes2Str(retryLane));
})

bindHook('pushRenderLanes', (fiber, lanes) => {
  log(RENDER_COLOR, 'OffscreenComponent push Render Lanes：', lanes2Str(lanes));
})

bindHook('getNextLanes_entangledLanes', (lanes) => {
  log(RENDER_COLOR, 'getNextLanes entangledLanes', lanes2Str(lanes));
})




const createResource = (durationMs: number) => {
  return wrapPromise(sleep(durationMs).then(() => "FETCHED RESULT " + Math.ceil(Math.random() * 1000)));
};


function Loading() {
  console.log("Loading");
  return <div>loading...</div>;
}

const Sub = ({ count }: {count: number}) => {
  const [resource, setResource] = useState<{read: any}>();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => {
            setResource(createResource(4000));  
          });
        }}
      >
        CLICK ME
      </button>
      <pre>{JSON.stringify({ count, isPending }, null, 2)}</pre>
      {resource === undefined ? "Initial state" : resource.read()}
    </div>
  );
};
export default () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount(x => x + 1);
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Sub count={count} />
    </Suspense>
  );
};







