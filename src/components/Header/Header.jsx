import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const items = authStatus ? [["Home","/"],["All Posts","/all-posts"],["Add Post","/add-post"]] : [["Home","/"],["Login","/login"],["Signup","/signup"]];
  return <header className="bg-gray-700 text-white shadow"><Container><nav className="flex items-center gap-4 py-4"><Link to="/"><Logo width="90px"/></Link><ul className="flex ml-auto gap-2">{items.map(([name,path]) => <li key={path}><button onClick={() => navigate(path)} className="px-4 py-2 rounded-lg hover:bg-white/10">{name}</button></li>)}{authStatus && <li><LogoutBtn/></li>}</ul></nav></Container></header>;
}
