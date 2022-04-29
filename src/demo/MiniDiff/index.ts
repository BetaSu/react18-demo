import diff from './diff';

const before = [
  {key: 'a'},
  {key: 'b'},
  {key: 'c'},
  {key: 'd'},
]

const after = [
  // {key: 'c'},
  // {key: 'b'},
  // {key: 'a'}
  {key: 'a'},
  {key: 'c'},
  {key: 'b'},
  {key: 'd'}
]

console.log(diff(before, after));