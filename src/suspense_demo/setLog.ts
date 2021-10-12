import {bindHook, utils} from 'log';

const {log, lanes2Str, lane2LaneName} = utils;

bindHook('ensureRootIsScheduled', (lanes, lane) => {
  log('#727205', `调度root，lanes：`, lanes2Str(lanes));
  log('#527205', '新更新，优先级：', lane2LaneName(lane));
})
// bindHook('performe work, next lanes', (lanes) => {
//   log('#727205', 'performe work, next lanes', lanes);
// })

bindHook('attachPingListener', (root, wakeable, lanes) => {
  log('#727205', '设置一个ping', wakeable);
  log('#527205', 'ping优先级为', lanes2Str(lanes));
})