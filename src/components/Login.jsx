import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
export default function Login(){const {register,handleSubmit}=useForm();const [error,setError]=useState("");const dispatch=useDispatch();const navigate=useNavigate();const submit=async data=>{setError("");const session=await authService.loginUser(data);if(session){const user=await authService.getCurrentUser();if(user){dispatch(login({userData:user}));navigate("/");}}else setError("Unable to sign in. Check your email and password.");};return <div className="flex justify-center p-8"><div className="w-full max-w-lg bg-white rounded-xl p-10 shadow"><div className="flex justify-center mb-4"><Logo/></div><h1 className="text-2xl font-bold text-center">Sign in to your account</h1><p className="text-center mt-2">Don't have an account? <Link className="text-blue-600" to="/signup">Sign Up</Link></p>{error&&<p className="text-red-600 text-center mt-4">{error}</p>}<form onSubmit={handleSubmit(submit)} className="mt-8 space-y-5"><Input label="Email" type="email" {...register("email",{required:true})}/><Input label="Password" type="password" {...register("password",{required:true})}/><Button type="submit" className="w-full">Sign in</Button></form></div></div>;}
