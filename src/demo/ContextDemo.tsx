import React, {useState, useId, useContext, ReactNode} from 'react';
import {bindHook, utils} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;



const Ctx = React.createContext(0);

const NumProvider = ({children}: {children: ReactNode}) => {
  const [num, add] = useState(0);

  return (
    <Ctx.Provider value={num}>
      <button onClick={() => add(num + 1)}>add</button>
      {children}
    </Ctx.Provider>
  )
}

export default () => {
  return (
    <NumProvider>
      <Middle/>
    </NumProvider>
  )
}

class Middle extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <Child/>;
  }
}

function Child() {
  const num = useContext(Ctx);
  return <p>{num}</p>;
}