import React, { useRef, useState, useTransition } from "react";
import ReactDOM from "react-dom";


export default () => {
  const [count, updateCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const domRef = useRef({});

  const onClick = () => {
    // startTransition(() => {
    //   updateCount(count => count + 1);
    //   updateCount(count => count + 1);
    //   updateCount(count => count + 1);

    //   console.log("同步的结果：", domRef.current.innerText);
    //   Promise.resolve().then(() => {
    //     console.log("微任务的结果：", domRef.current.innerText);
    //   });
    //   setTimeout(() => {
    //     console.log("宏任务的结果：", domRef.current.innerText);
    //   });
    // })
    updateCount(count => count + 1);
    updateCount(count => count + 1);
    updateCount(count => count + 1);

    console.log("同步的结果：", domRef.current.innerText);
    Promise.resolve().then(() => {
      console.log("微任务的结果：", domRef.current.innerText);
    });
    setTimeout(() => {
      console.log("宏任务的结果：", domRef.current.innerText);
    });
  };


  return (
    <h3 ref={domRef} onClick={onClick}>
      {count}
    </h3>
  )
}