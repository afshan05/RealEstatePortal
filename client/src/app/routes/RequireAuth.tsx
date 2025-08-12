// RequireAuth.tsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store/store';
import { useUserInfoQuery } from '../../features/account/accountApi';


export default function RequireAuth() {
  const token = useAppSelector((s) => s.auth.token);
  const location = useLocation();

  // only request user-info if token exists
  const { data: user, isLoading, isFetching } = useUserInfoQuery(undefined, {
    skip: !token,
  });

  // while we don't even have a token -> redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if we have a token but user info is loading, show loader
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  // if token exists but server didn't return a user (invalid token)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
