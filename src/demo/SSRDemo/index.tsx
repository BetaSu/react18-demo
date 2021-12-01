import React, {useState, useId, useRef} from 'react';


function App() {
  const idRef = useRef('id_' + (Math.random() * 1000).toFixed(0));
  const [num, updateNum] = useState(0);
  const id = useId();
  console.log('app id', id);

  return (
    <div className="App" id={id} onClick={() => updateNum(num + 1)}>
      <header className="App-header">
        <p>
          Edit <code>{num}</code>
          {Array(33).fill(3).map((_, i) => <Child key={i}>number {i}</Child>)}
        </p>
      </header>
    </div>
  );
}

function Child({children}) {
  const id = useId();
  console.log('child id', id);
  return <div> i am child {children}</div>
}

export default App;
