import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import appwriteAuth from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteAuth.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <div className="min-h-screen grid place-items-center bg-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <Header />
      <main className="flex-1 w-full"><Outlet /></main>
      <Footer />
    </div>
  );
}

export default App;
