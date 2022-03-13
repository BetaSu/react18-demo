import * as u from './utils';

u.log('#127299', '卡颂：欢迎使用《React技术揭秘》配套调试项目，玩得开心');

type TLogCB = (...args: any) => void;

type TLibrayMethod = (...args: any) => any;

export type Phase = 'commit' | 'render' | 'schedule';

export const utils = u;

type LibraryMethodName = 'getComponentNameFromFiber';
const librayMethodMap: {
  [name in LibraryMethodName]?: TLibrayMethod
} = {};

export function bindHook(bindWhere: string, callback: TLogCB) {
  where2LogList[bindWhere] = where2LogList[bindWhere] || [];
  where2LogList[bindWhere].push(callback);
}

const where2LogList: {[where: string]: TLogCB[]} = {};

export function logHook(where: string, ...args: any) {
  const logList = where2LogList[where];
  Array.isArray(logList) && logList.forEach(cb => cb(...args));
}

// 从库里加载方法
export function logLibraryMethod(libraryMethod: TLibrayMethod){
  librayMethodMap[libraryMethod.name as LibraryMethodName] = libraryMethod;
  return librayMethodMap;
}

// 使用库里的方法
export function getLibraryMethod(name: LibraryMethodName) {
  return librayMethodMap[name];
}