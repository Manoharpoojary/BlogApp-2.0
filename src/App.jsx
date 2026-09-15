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

  if (loading)
    return (
      <div className="bg-mesh flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="spinner" />
        <p className="text-sm text-[var(--text-muted)] tracking-wide animate-fade-in">Loading BlogVerse…</p>
      </div>
    );

  return (
    <div className="bg-mesh flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
