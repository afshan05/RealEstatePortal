
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
}
