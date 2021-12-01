import {bindHook, utils} from 'log';

const {log, lanes2Str, getType2Use, lane2LaneName, exitStatus2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;



bindHook('ensureRootIsScheduled', (lanes, lane) => {
  log(SCHEDULE_COLOR, `调度root，lanes：`, lanes2Str(lanes));
  log(SCHEDULE_COLOR, '调度的优先级：', lane2LaneName(lane));
})
// bindHook('performe work, next lanes', (lanes) => {
//   log('#727205', 'performe work, next lanes', lanes);
// })

bindHook('attachWakeableListeners', (root, wakeable, lanes) => {
  log(RENDER_COLOR, '设置一个ping', wakeable);
  log(RENDER_COLOR, 'ping优先级为', lanes2Str(lanes));
})

bindHook('markRootSuspended', (suspendedLanes, rootSuspendedLanes, rootPingedLanes) => {
  log('#f00', 'markRoot Suspended', lanes2Str(suspendedLanes));
})

bindHook('markRootPinged', (rootPingedLanes) => {
  log('#f00', 'Root Pinged，lanes：', lanes2Str(rootPingedLanes));
})

bindHook('retryTimedOutBoundary', (retryLane) => {
  log('#f00', 'Root retry，lane：', lanes2Str(retryLane));
})

bindHook('renderRootConcurrent', (root) => {
  log(RENDER_COLOR, 'render阶段开始，类型：Concurrent');
})

bindHook('renderRootSync', (root) => {
  log(RENDER_COLOR, 'render阶段开始，类型：Sync');
})

bindHook('performConcurrentWorkOnRoot-exitStatus', (exitStatus: number) => {
  log(RENDER_COLOR, 'perform Concurrent work 完成状态', exitStatus2Str(exitStatus));
})

bindHook('performSyncWorkOnRoot-exitStatus', (exitStatus: number) => {
  log(RENDER_COLOR, 'perform Sync work 完成状态', exitStatus2Str(exitStatus));
})

bindHook('schedule callback', (type, cbName, lane) => {
  log(SCHEDULE_COLOR, `调度root，类型：${type}，回调：`, cbName);
})

bindHook('commitBegin', (reason) => {
  log(COMMIT_COLOR, `commit阶段开始，由于：${reason}`);
})

bindHook('updateDOMProperties', (dom, type) => {
  log(COMMIT_COLOR, `更新DOM属性 ${type}`, dom);
})

bindHook('shouldTimeSlice', (shouldTimeSlice) => {
  log(RENDER_COLOR, `${shouldTimeSlice ? '启用' : '关闭'}时间切片`);
})


bindHook('updateDOM', (fiber, type) => {
  log(COMMIT_COLOR, `更新DOM ${type}`, fiber);
})

// bindHook('bubbleProperties', (didBailout, wip) => {
//   log(RENDER_COLOR, `bubbleProperties`, getType2Use(wip));
// })  