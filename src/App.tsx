import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Stuff } from './stuff'
import { Footer } from './footer';
import QueueElement from './components/queue/queue';
import HashTable from './components/hash-table/hash-table';
import BinaryTree from './components/binary-tree/binary-tree';
import LongestSubstring from './components/longest-substring/longest-substring';
import PriorityQueue from './components/priority-queue/priority-queue';
import Bfs from './components/bfs/bfs';

// const decrement = (fn: Function) => (x: number) => fn(x);
function decrement(fn: Function) {
  return function something(x: number) {
    return fn(--x);
  }
}
const square = (a: number) => a * a;
const decrementSquare = decrement(square);


function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('');
  const elapsedTime = useRef(0);
  const render = useRef(0);

  const newNumber = new Date().valueOf();
  const otherNumber = new Date().valueOf();
  const difference = newNumber - otherNumber;

  const number = {
    number: 'number'
  }
  const number2 = 'number';

  useEffect(() => {
    console.log('blah!!!');
  }, [number])

  useEffect(() => {
    render.current++;
  });

  function hamming(n: number) {
    const start = performance.now();
    let hamArr = [1];
    let i2 = 0;
    let i3 = 0;
    let i5 = 0;
    while (hamArr.length < n) {
      let newHam = Math.min(hamArr[i2] * 2, hamArr[i3] * 3, hamArr[i5] * 5);
      hamArr.push(newHam);
      (newHam == hamArr[i2] * 2) && i2++;
      (newHam == hamArr[i3] * 3) && i3++;
      (newHam == hamArr[i5] * 5) && i5++;
    }
    const end = performance.now();
    const time = Math.trunc(end - start);
    elapsedTime.current += time;
    return hamArr[hamArr.length - 1];
  }
  
  return (
    <div className="App">
      <Stuff text='Blah Blah!' />
      <div>
        <Bfs />
      </div>
      <div style={{display: "flex"}}>
        <div>
          <h2>Vite + React</h2>
          <p>{render.current}</p>
          <p>{hamming(count)}</p>
          <p>一共{elapsedTime.current}</p>
          <textarea value={text} onChange={(evt) => setText(evt.target.value)} />
          <p>Count: {count}</p>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is not {decrementSquare(count)}
            </button>
            <button onClick={() => setCount((count) => count + 300000)}>
              increase count by 300000
            </button>
            <button onClick={() => setCount(5000000)}>
              set count to high
            </button>
          </div>
        </div>
        <div>
          <LongestSubstring />
        </div>
        <PriorityQueue />
      </div>
        <QueueElement />
        <HashTable />
        <BinaryTree />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer word='something something' />
    </div>
  )
}

export default App
