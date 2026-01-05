import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import './App.css';
import authService from './appwrite/auth';
import { Footer, Header, Loader, OverLay } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(
    () => {
      authService.getCurrentUser()
      .then(
        (userData) => {
          dispatch(login({userData}))
        }
      )
      .catch(
        (err) => {
          dispatch(logout())
          console.error("App.jsx :: Got an error while using authService.getCurrentUser logged out the user", err)
        }
      )
      .finally(
        () => setLoading(false)
      )
    },
    []
  )

  return loading ? (
    <OverLay message="Loading posts" textColor='text-blue-700'>
      <Loader label='' size='10'/>
    </OverLay>
  ) : (
    <div className='min-h-screen min-w-scree flex flex-wrap content-between bg-gray-800 text-white'>
      <div className='w-full block'>
        <Header />
        <main className='h-dvh min-h-dvh'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
