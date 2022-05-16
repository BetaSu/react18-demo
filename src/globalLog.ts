import {bindHook, utils} from 'log';

const {log, lanes2Str, lane2LaneName, exitStatus2Str, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

/**
 * 所有Demo中会打印的log
 */

bindHook('shouldTimeSlice', (shouldTimeSlice) => {
  log(SCHEDULE_COLOR, `${shouldTimeSlice ? '启用' : '关闭'}时间切片`);
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

bindHook('commitBegin', (reason, lanes) => {
  log(COMMIT_COLOR, `commit阶段开始，由于：${reason}， lanes：${lanes2Str(lanes)}`);
})



// bindHook('bubbleProperties', (didBailout, wip) => {
//   log(RENDER_COLOR, `bubbleProperties`, getType2Use(wip));
// })  