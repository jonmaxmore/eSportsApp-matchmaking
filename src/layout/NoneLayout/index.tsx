import React from 'react';
import { Outlet } from "react-router-dom";

type Props = {};

const NoLayout = (props: Props) => {
  return <div> NoLayout <Outlet /></div>;
};

export default NoLayout;
