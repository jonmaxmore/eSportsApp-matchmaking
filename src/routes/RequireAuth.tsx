import React from 'react';
import { useAuthContextState } from '@AuthContext/store';
import { useLocation, Navigate } from "react-router-dom";
import { _findObjectOfArrayByKeyName } from '@Utils/utils';
import { Permission, RouteCustom } from "@Routes/route.interface";

type Props = {
  children: JSX.Element;
  permissionAllow: Permission[];
  route: RouteCustom;

};
const RequireAuth = ({ children, route, permissionAllow }: Props) => {
  const keyName = route.keyName ? route.keyName : route.path ? route.path.split('/')[1] : ""
  let location = useLocation();
  let { auth } = useAuthContextState();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const permissionMenu = _findObjectOfArrayByKeyName(permissionAllow, keyName, 'keyName');
  return !!permissionMenu ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
