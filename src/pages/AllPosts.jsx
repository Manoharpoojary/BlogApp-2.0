import { useEffect,useState } from "react";
import appwriteService from "../appwrite/config";
import { Container,PostCard } from "../components";
export default function AllPosts(){const [posts,setPosts]=useState([]);useEffect(()=>{appwriteService.getAllDocument({status:"active"}).then(r=>r&&setPosts(r.documents||[]));},[]);return <Container><section className="py-10"><h1 className="text-4xl font-bold text-white mb-8">All Posts</h1><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{posts.map(p=><PostCard key={p.$id}{...p}/>)}</div></section></Container>}
