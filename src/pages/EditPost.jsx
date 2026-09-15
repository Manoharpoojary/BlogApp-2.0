import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostForm } from "../components";
export default function EditPost(){const {slug}=useParams();const [post,setPost]=useState(null);const navigate=useNavigate();useEffect(()=>{appwriteService.getDocument({slug}).then(r=>r?setPost(r):navigate("/all-posts"));},[slug,navigate]);return post?<PostForm post={post}/>:<div className="p-10 text-center">Loading...</div>}
