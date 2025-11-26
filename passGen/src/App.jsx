import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(10);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  let passRef = useRef(null);

  const generatePassword = useCallback(
    () => {
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      if (includeNumbers) str += "0123456789";
      if (includeSymbols) str += "@_!.,?/=+-#$%^&*()~`:;[]{}|";

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length)
        pass += str.charAt(char)
      }
      setPassword(pass)
      
    },
    [length, includeNumbers, includeSymbols, setPassword]
  )

  useEffect(
    () => {
      generatePassword()
    },
    [length, includeNumbers, includeSymbols, generatePassword]
  )

  const copyToClipboard = useCallback(
    () => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },
    [password]
  )

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-600 text-xl bg-gray-500 text-center shadow-md'>
        <h1 className='text-white'>Password Generator</h1>
        <div className='flex overflow-hidden rounded-lg mb-4'>
          <input 
          type="text" 
          value={password}
          placeholder='Password'
          readOnly
          className='outline-none py-1 px-3 w-full bg-white rounded-s-2xl'
          ref={passRef}
          />
          <button className='outline-none bg-blue-600 rounded-e-2xl py-2 px-2 text-white shrink-0 text-center hover:bg-blue-400 duration-75' onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='px-2'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            id="numberInput"
            defaultValue={includeNumbers}
            onChange={() => {setIncludeNumbers(prev => !prev)}}
            />
            <label className='px-2'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            id="symbolInput"
            defaultValue={includeSymbols}
            onChange={() => {setIncludeSymbols(prev => !prev)}}
            />
            <label className='px-2'>Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
