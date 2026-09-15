import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
export default function Home(){const [posts,setPosts]=useState([]);useEffect(()=>{appwriteService.getAllDocument().then(r=>r&&setPosts(r.documents||[]));},[]);return <Container><section className="py-10"><h1 className="text-4xl font-bold text-white mb-8">Latest Posts</h1>{!posts.length?<div className="bg-white rounded-xl p-8 text-center text-xl">Login to read posts or create the first post.</div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{posts.map(post=><PostCard key={post.$id}{...post}/>)}</div>}</section></Container>}
