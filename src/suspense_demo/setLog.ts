import {bindHook, utils} from 'log';

const {log, lanes2Str, lane2LaneName, exitStatus2Str} = utils;

bindHook('ensureRootIsScheduled', (lanes, lane) => {
  log('#727205', `调度root，lanes：`, lanes2Str(lanes));
  log('#727205', '调度的优先级：', lane2LaneName(lane));
})
// bindHook('performe work, next lanes', (lanes) => {
//   log('#727205', 'performe work, next lanes', lanes);
// })

bindHook('attachPingListener', (root, wakeable, lanes) => {
  log('#327205', '设置一个ping', wakeable);
  log('#327205', 'ping优先级为', lanes2Str(lanes));
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

bindHook('performConcurrentWorkOnRoot-exitStatus', (exitStatus: number) => {
  log('#ffd300', 'perform Concurrent work 完成状态', exitStatus2Str(exitStatus));
})

bindHook('performSyncWorkOnRoot-exitStatus', (exitStatus: number) => {
  log('#ffd322', 'perform Sync work 完成状态', exitStatus2Str(exitStatus));
})