import * as u from './utils';

u.log('#127299', '卡颂：欢迎使用《React技术揭秘》配套调试项目，玩得开心');

type TLogCB = (...args: any) => void;

export type Phase = 'commit' | 'render' | 'schedule';

export const utils = u;

export function bindHook(bindWhere: string, callback: TLogCB) {
  where2LogList[bindWhere] = where2LogList[bindWhere] || [];
  where2LogList[bindWhere].push(callback);
}

const where2LogList: {[where: string]: TLogCB[]} = {};

export function logHook(where: string, ...args: any) {
  const logList = where2LogList[where];
  Array.isArray(logList) && logList.forEach(cb => cb(...args));
}