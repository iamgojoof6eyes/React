import { useState } from 'react'
import './App.css'
/*
onClick requires a callback function
*/
function App() {
  const [color, setColor] = useState("red")
  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <div className='fixed flex justify-center flex-wrap bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-2 shadow-lg bg-white px-2 py-3 rounded-xl'>
          <button className='text-white shadow-red-400 rounded-2xl px-2 py-2 border' style={{backgroundColor: "red"}}
          onClick={()=>setColor("red")}
          >
            Red
          </button>
          <button className='text-white shadow-red-400 rounded-2xl px-2 py-2 border' style={{backgroundColor: "green"}}
          onClick={()=>setColor("green")}
          >
            Green
          </button>
          <button className='text-white shadow-red-400 rounded-2xl px-2 py-2 border' style={{backgroundColor: "blue"}}
          onClick={()=>setColor("blue")}
          >
            Blue
          </button>
          <button className='text-white shadow-red-400 rounded-2xl px-2 py-2 border' style={{backgroundColor: "olive"}}
          onClick={()=>setColor("olive")}
          >
            Olive
          </button>
          <button className='text-black shadow-red-400 rounded-2xl px-2 py-2 border' style={{backgroundColor: "white"}}
          onClick={()=>setColor("white")}
          >
            White
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
