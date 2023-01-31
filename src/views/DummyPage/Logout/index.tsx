import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import AuthAPI from '../../../api/AuthAPI';
import { Token } from '../../../Token';
import { socket } from "@Utils/socket";

type Props = {};

const Logout = (props: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    logoutUser()
  }, [])
  
  useEffect(() => {
    socket.on("get_online_offline_user_status", (data) => {
        // getMatchAndLobbyDetails(match_id)
        console.log('get_online_offline_user_status', data)
    });

}, [socket]);

  const logoutUser = async () => {
    await AuthAPI.logout()
      .then((res) => {
        const data = {
          onlineOfflineRoom: "onLineOfflineStatusRoom",
          onlineFriends: {},
        };
        socket.emit("set_onlineOfflineUser_status", data);
        Token.clearStorage();
        navigate('/login');
      })
      .catch(error => console.log(error))
  }

  return <></>
};

export default Logout;
