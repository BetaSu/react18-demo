import React, { useCallback, useState, useMemo,useRef, useEffect, useLayoutEffect, useInsertionEffect } from "react";

function Effect1() {
  const [state,setState] = useState(0);
  
  useEffect(function create1 () {
    console.log('effect1 mount')
    return () => {
      // 清除订阅
      console.log('effect1 unmount')
    };
  });
  return (<div onClick={()=>setState(state+1)}><Effect2 /><Effect3 /></div>)
}
function Effect2(){
  const [state,setState] = useState(0);
  useEffect(function create21 () {
    console.log('effect21 mount')
    return () => {
      // 清除订阅
      console.log('effect21 unmount')
    };
  });  

  useLayoutEffect(function create22 () {
    console.log('effect22 layout mount')
    // throw 1;
    return () => {
      // 清除订阅
      console.log('effect22 layout unmount')
    };
  });

  useInsertionEffect(function create23 () {
    console.log('effect23 insertion mount')
    return () => {
      // 清除订阅
      console.log('effect23 insertion unmount')
    };
  });


  return (<div onClick={()=>setState(state+1)}>click</div>)
}

function Effect3(){
  const [state,setState] = useState(0);
  useEffect(function create3 () {
    console.log('effect3 mount')
    return () => {
      // 清除订阅
      console.log('effect3 unmount')
    };
  });
  return (<div onClick={()=>setState(state+1)}>click</div>)
}


export default Effect1;