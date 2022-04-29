type NodeList = Node[];
type Flag = 'Placement' | 'Deletion';

interface Node {
  key: string;
  flag?: Flag;
  index?: number;
}

// 用于调试 Diff算法 的Demo
export default function diff(before: NodeList, after: NodeList): NodeList {
  let lastPlacedIndex = 0;  
  const result: NodeList = [];

  const beforeMap = new Map<string, Node>();
  before.forEach((node, i) => {
    node.index = i;
    beforeMap.set(node.key, node);
  })

  for (let i = 0; i < after.length; i++) {
    const afterNode = after[i];
    afterNode.index = i;
    const beforeNode = beforeMap.get(afterNode.key);

    if (beforeNode) {
      // 复用老节点
      beforeMap.delete(beforeNode.key);

      const oldIndex = beforeNode.index as number;
      if (oldIndex < lastPlacedIndex) {
        afterNode.flag = 'Placement';
        result.push(afterNode);
        continue;
      } else {
        lastPlacedIndex = oldIndex;
      }
    } else {
      // 创建新节点
      afterNode.flag = 'Placement';
      result.push(afterNode);
    }
  }

  beforeMap.forEach(node => {
    node.flag = 'Deletion';
    result.push(node);
  });

  return result;
}