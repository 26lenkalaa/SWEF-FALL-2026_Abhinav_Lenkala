import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchMe } from "../api.js";

// Asks the backend whether the token is valid before rendering child routes.
export default function RequireAuth() {
  const [status, setStatus] = useState("loading"); // loading | ok | denied

  useEffect(() => {
    let cancelled = false;
    fetchMe()
      .then((me) => !cancelled && setStatus(me ? "ok" : "denied"))
      .catch(() => !cancelled && setStatus("denied"));
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p className="mx-auto mt-20 max-w-3xl px-6 text-muted">Checking login…</p>;
  }
  if (status === "denied") return <Navigate to="/login" replace />;
  return <Outlet />;
}
