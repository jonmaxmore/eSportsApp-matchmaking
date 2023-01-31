import React, { useEffect, useState } from "react";
import "./styles.css";
import "antd/dist/antd.css";
import Emtpy from "./Unblock/Emtpy";
import UserAPI from "@api/UserAPI";
import Block from "./Unblock/Block";

interface Props {
  ActivePop: (value: any) => void;
}

const Setting = ({ ActivePop }: Props) => {
  const [activeData, setActiveData] = useState({ search: "" });
  const [blockedUsers, setBlockedUsers] = useState([] as any);

  useEffect(() => {
    getBlockedUsers(activeData);
  }, [activeData]);

  const getBlockedUsers = (data: any) => {
    UserAPI.getBlockedUserAPI(data)
      .then((res) => {
        if (res.data.success) {
          // const blockedUsers:any = res.data.friends;
          // blockedUsers.map((user:any) => {
          //     user.requestTo ? user.user = user.requestTo : user.user = user.requestFrom
          // })
          setBlockedUsers(res.data.blockedUsers);
        } else {
          setBlockedUsers([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full">
      <div
        style={{
          height: "calc(100vh - 250px)",
        }}
        className=" w-full  shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black overflow-y-auto "
      >
        {blockedUsers?.length > 0 ? (
          <Block
            blockedUsers={blockedUsers}
            setBlockedUsers={setBlockedUsers}
            ActivePop={(value) => []}
          />
        ) : (
          <Emtpy ActivePop={(value) => []} />
        )}
      </div>
    </div>
  );
};
export default Setting;
