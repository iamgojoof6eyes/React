import { useState } from 'react';
import './App.css';

function App() {
  // let counter = 10;
  const [counter, setCounter] = useState(10)
  const increaseCounter = () => {
    console.log("Button clicked", counter);
    // counter += 1;
    setCounter(counter + 1)
    console.log("Counter updated to", counter);
  }

  const decreaseCounter = () => {
    setCounter(counter - 1)
  }

  return (
    <>
      <h1>Counter Chai</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={increaseCounter}>Increase Value</button>
      <br />
      <button onClick={decreaseCounter}>Decrease value</button>
    </>
  )
}

export default App
