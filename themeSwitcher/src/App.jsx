import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import ThemeBtn from './components/ThemeBtn';
import { ThemeProvider } from './contexts/theme';

function App() {
  const [theme, setTheme] = useState("light");
  const darkMode = () => setTheme("dark");
  const lightMode = () => setTheme("light");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme])

  return (
    <ThemeProvider value={{theme, darkMode, lightMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
              <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
