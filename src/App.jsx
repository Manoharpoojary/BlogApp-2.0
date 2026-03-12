import { useDispatch } from "react-redux";
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// import { store } from "./store/store";
import { useEffect, useState } from "react";
import appwriteAuth from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Header,Footer } from "./components/index";
import { Outlet } from "react-router-dom";



function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    appwriteAuth.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[dispatch])

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col flex-wrap w-full gap-1.5 items-center p-5">
      <Header/>
      <h1>hello world</h1>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App