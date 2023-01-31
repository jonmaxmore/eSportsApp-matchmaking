import React from 'react';
import { Outlet } from "react-router-dom";

type Props = {};

const Setting = (props: Props) => {
  return <div>Setting <Outlet /></div>;
};

export default Setting;
