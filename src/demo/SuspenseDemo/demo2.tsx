import React, { Suspense } from "react";
import {bindHook, getLibraryMethod, utils} from 'log';
import { wrapPromise } from "./utils"; 
const {log, lanes2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

bindHook('beginWork', (current, wip) => {
  log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
})

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

const cache = new Map();

function getPicNum(who: string) {
  switch (who) {
    case "kaSong":
      return 230;
    case "xiaoMing":
      return 122;
    default:
      return 0;
  }
}

function getTotalPicNum(u1: string, u2: string) {
  const cacheKey = `${u1} ${u2}`;
  const resourceCache = cache.get(cacheKey);

  if (resourceCache) {
    return resourceCache;
  }

  const picNumPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(getPicNum(u1) + getPicNum(u2));
    }, 4000);
  });
  const resource = wrapPromise(picNumPromise);
  cache.set(cacheKey, resource);
  return resource;
}

export default function App() {
  return (
    <Suspense fallback={<h1>加载中...</h1>}>
      <TotalPicNum u1="kaSong" u2="xiaoMing" />
    </Suspense>
  );
}

function TotalPicNum({ u1, u2 }: {u1: string; u2: string}) {
  const num = getTotalPicNum(u1, u2).read();
  return <div>总数量为{num}</div>;
}

