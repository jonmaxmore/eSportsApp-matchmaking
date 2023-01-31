import React from "react";
import logo from "./LG-battleLab.png";
import { SingUPStyle } from "./style";

const Logo = () => {
  return (
    <React.Fragment>
      <div style={SingUPStyle.logo as React.CSSProperties}>
        <img
          src={logo}
          alt="battlelablogo"
          className="w-[330px] xl:w-[500px] "
        />
      </div>
    </React.Fragment>
  );
};

export default Logo;
