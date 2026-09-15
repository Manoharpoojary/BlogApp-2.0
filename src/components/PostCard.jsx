import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
export default function PostCard({ $id, title, featuredImage }) {
  return <Link to={`/post/${$id}`} className="block"><article className="bg-white rounded-xl p-4 shadow hover:-translate-y-1 transition"><div className="aspect-video overflow-hidden rounded-lg mb-4 bg-gray-200">{featuredImage ? <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="w-full h-full object-cover"/> : null}</div><h2 className="text-xl font-bold text-gray-900">{title}</h2></article></Link>;
}
