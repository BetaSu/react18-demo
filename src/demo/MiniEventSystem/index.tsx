import React from "react";
import { addEvent } from "./eventSystem";

const jsx = (
  <section
    ONCLICK={(e) => {
      console.log("click section");
    }}
  >
    <h3>你好</h3>
    <button
      ONCLICK={(e) => {
        e.stopPropagation();
        console.log("click button", e);
      }}
    >
      点击
    </button>
  </section>
);

/**
 * eventSystem的迷你实现
 * 在main.tsx执行如下代码
 * addEvent(rootEle, "click");
 * ReactDOM.createRoot(rootEle).render(jsx);
 */
export default {
  jsx,
  addEvent
}