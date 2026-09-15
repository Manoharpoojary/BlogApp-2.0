import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteAuth from "../../appwrite/auth";
import { logout } from "../../features/authSlice";
export default function LogoutBtn() { const dispatch=useDispatch(); const navigate=useNavigate(); const handle=async()=>{await appwriteAuth.logoutUser(); dispatch(logout()); navigate("/login",{replace:true});}; return <button onClick={handle} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">Logout</button>; }
