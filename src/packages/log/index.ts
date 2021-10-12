import * as u from './utils';

u.log('#327205', '答疑、掌握更多React知识，欢迎关注公众号《魔术师卡颂》');

type TLogCB = (...args: any) => void;

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