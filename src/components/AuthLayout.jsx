import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) navigate("/login", { replace: true });
    else if (!authentication && authStatus) navigate("/", { replace: true });
    else setLoader(false);
  }, [authStatus, authentication, navigate]);

  if (loader) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="spinner" />
      </div>
    );
  }

  return <>{children}</>;
}
