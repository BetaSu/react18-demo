import React, { useRef, useState, useTransition } from "react";

export default () => {
  const [count, updateCount] = useState(0);
  // const [isPending, startTransition] = useTransition();

  function onClick() {
    updateCount(count + 1);
  }

  return (
    <h3 onClick={onClick}>
      {count}
    </h3>
  )
}