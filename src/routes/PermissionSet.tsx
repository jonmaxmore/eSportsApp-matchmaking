import React from 'react'
import { Permission } from "@Routes/route.interface";
import { _findObjectOfArrayByKeyName } from '@Utils/utils';

type Props = {
  value: { [key: string]: any }
  children?: JSX.Element;
  Component: React.FC;
  permissionAllow: Permission[]
}

const PermissionSet = ({ permissionAllow, Component, value }: Props) => {
  const keyName = value.keyName ? value.keyName : ""
  const permissionMenu = _findObjectOfArrayByKeyName(permissionAllow, keyName, 'keyName');
  console.group('===== PermissionSet =====')
  console.log("value", value);
  console.log("keyName", keyName);
  console.log("permissionMenu", permissionMenu);
  console.groupEnd()

  return (<Component />)
}

export default PermissionSet