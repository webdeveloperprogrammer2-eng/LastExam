import { Navigate } from "react-router";
import { getToken } from "./lib/token";

export function GuestRoute({ children }) {
  const token = getToken();

  return token ? <Navigate to="/" replace /> : children;
}