import React, { useCallback, useState, useMemo,useRef, useEffect } from "react";

function Effect() {
  const [state,setState] = useState(0);
  useEffect(() => {
    console.log(11111)
    return () => {
      // 清除订阅
      console.log(22222)
    };
  });
  return (<div onClick={()=>setState(state+1)}><Effect2 /><Effect3 /></div>)
}
function Effect2(){
  const [state,setState] = useState(0);
  useEffect(() => {
    console.log(33333)
    return () => {
      // 清除订阅
      console.log(44444)
    };
  });
  return (<div onClick={()=>setState(state+1)}>click</div>)
}

function Effect3(){
  const [state,setState] = useState(0);
  useEffect(() => {
    console.log(55555)
    return () => {
      // 清除订阅
      console.log(66666)
    };
  });
  return (<div onClick={()=>setState(state+1)}>click</div>)
}


export default Effect;