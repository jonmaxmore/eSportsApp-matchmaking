// import { Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik'
// import style from './style.module.css';
import { LoginStyle } from './style';
import Forgetpass from './forgetpass'
import logo from './01Page-Login/LG-battleLab.png'
import * as Yup from 'yup'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import AuthAPI from '../../../api/AuthAPI';
// import { signIn } from '../../../context/Auth/action';
// import Reducer from '../../../context/Auth/reducer';
// import { DispatchAuth } from "../../../context/Auth/interface/context";
// import { InitialState, Token as AuthToken, UserInfo } from "../../../context/Auth/interface/auth";
// import { Types } from "../../../context/Auth/type";
import { useAuthContextDispatch } from '@AuthContext/store';
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from '@Config/firebase.config';

import $ from 'jquery';
import Loader from '@Components/Loader/Loader';
import { socket } from '@Utils/socket';
import { getUser_info } from './authsave';
// import { getUser, authenticate, getTokenw } from '@Config/authsave';
import Showlive from '@Components/Modal/MatchInProgress/showlive';
// import install from './shawfuck'
//import console from 'console';
// const electron = window.require('electron');

// const { Title } = Typography;
type Props = {};


const LoginPage = (props: Props) => {

  const [Active, SetActive] = useState(false)
  const [userNotExist, SetUserNotExist] = useState(false)
  const [userNotExistMessage, SetUserNotExistMessage] = useState('')
  const [fcmToken, setFcmToken] = useState("");
  // const [savelogin, setSavelogin] = useState("");
  const [eyepassowrd, setEyePassword] = useState(false);
  const [sessionEmail, setSessionEmail] = useState('');
  const [shofuck, setShofuck] = useState(false);
  const [sessionPassword, setSessionPassword] = useState('');
  const navigate = useNavigate()
  const location = useLocation()
  const regSuccessMessageData: any = location.state
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const context = useAuthContextDispatch();

  // electron.ipcRenderer.on('settings:get', (e:any, data:any) => {
  //   if(data.email !== ''){
  //   setSessionEmail(Buffer.from(data.email, 'base64').toString('ascii'));
  //   }
  //   if(data.password){
  //   setSessionPassword(Buffer.from(data.password, 'base64').toString('ascii'));
  //   }
  // });
  //let test = UserInfo();



  useEffect(() => {

    const kEpp = getUser_info()


    chacklogin(kEpp)


  }, []);

  const chacklogin = (data: any) => {

    if (data.is_not_robot === true) {

      const datap = {
        email: data.email,
        password: data.password || "",
        user_device_id: "",
        fcm_token: "",
        rememberMe: true

      }

      AuthAPI.loginkeep(data)
        .then(async (res) => {
          if (res.data.success) {

            if (res.data.redirect === 'home') {

              const data = {
                onlineOfflineRoom: "onLineOfflineStatusRoom",
                onlineFriends: res.data.onlineFriends,
                for: 'online'
              };
              socket.emit("set_onlineOfflineUser_status", data);
              const payload = {
                token: {
                  accessToken: res.data.token,
                },
                userInfo: res.data.user
              }
              $('.appLoader').css('display', 'none');
              context._signIn(payload);
              //authenticate(payload)
              navigate('/home');
            }
          } else {
            $('.appLoader').css('display', 'none');
            SetUserNotExist(true);
            SetUserNotExistMessage(res.data.message);
          }
        })
        .catch(function (error) {
          // setLoader(false)
          console.log("error ", error);
        });


    } else {
      console.log("Keep")
    }
  }


  useEffect(() => {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging,
      { vapidKey: 'BPpgaCtjdE2y1zCYF9pdLdv7myWkjZ7TGBZO_xkNRlS-wjynZtha1XtuWMgakxBtG42VYBCR1XbJ8c94uTw1NEE' }
    ).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        setFcmToken(currentToken);

      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }, [window]);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.checked);
  };

 // console.log(checkedww)
  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: sessionEmail || "",
      password: sessionPassword || "",
      user_device_id: "",
      fcm_token: "",
      checked: checked
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      $('.appLoader').css('display', 'block');
     // setShofuck(true);
      var navigator_info = window.navigator
      var screen_info = window.screen
      var uid: any = navigator_info.mimeTypes.length
      uid += navigator_info.userAgent.replace(/\D+/g, '')
      uid += navigator_info.plugins.length
      uid += screen_info.height || ''
      uid += screen_info.width || ''
      uid += screen_info.pixelDepth || ''
      values.user_device_id = uid;
      values.fcm_token = fcmToken;
          if(values){
            values.checked = checked1;
          }
      AuthAPI.login(values)
        .then(async (res) => {
          if (res.data.success) {

            if (res.data.redirect === 'otp') {
              const email = values.email
              const user_id = res.data.data.user_id
              $('.appLoader').css('display', 'none');
              navigate('/verify-otp', { state: { user_id: user_id, email: email } })
            } else if (res.data.redirect === 'home') {

              const data = {
                onlineOfflineRoom: "onLineOfflineStatusRoom",
                onlineFriends: res.data.onlineFriends,
                for: 'online'
              };
              socket.emit("set_onlineOfflineUser_status", data);
              const payload = {
                token: {
                  accessToken: res.data.token,
                },
                userInfo: res.data.user
              }
              $('.appLoader').css('display', 'none');
              context._signIn(payload);
              //authenticate(payload)
              navigate('/home');
            }
          } else {
            $('.appLoader').css('display', 'none');
            SetUserNotExist(true);
            SetUserNotExistMessage(res.data.message);
          }
        })
        .catch(function (error) {
          // setLoader(false)
          console.log("error ", error);
        });
    },
  });

  const Popup = Active
    ? (LoginStyle.popup as React.CSSProperties)
    : (LoginStyle.depopup as React.CSSProperties)

  return (
    <div style={LoginStyle.app as React.CSSProperties}>
      <div style={Popup}>
        {' '}
        <Forgetpass Active={e => SetActive(e)} />{' '}
      </div>
      <div style={LoginStyle.logo as React.CSSProperties}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: '80%',
            height: '90%',
          }}
        />
      </div>
      <div style={LoginStyle.windows as React.CSSProperties}>
        <div style={LoginStyle.block as React.CSSProperties}>
          {location.state && (
            <p style={{ color: 'green' }}>{regSuccessMessageData.message}</p>

          )}
          <h1 style={LoginStyle.login as React.CSSProperties}>login</h1>
          <div style={LoginStyle.QRegister as React.CSSProperties}>
            <p className="text-white">No account yet ? Register </p>
            <Link style={{ color: '#23edfc' }} to="/register">
              here
            </Link>
          </div>
          <div>
            {userNotExist === true && (
              <h2 style={{ color: 'red' }}>{userNotExistMessage}</h2>
            )}
          </div>
          <div style={LoginStyle.container as React.CSSProperties} className="text-white">
            <form id="loginForm" onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}>
              <div>
                <div style={LoginStyle.input as React.CSSProperties}>
                  <h5 className="text-white">E-MAIL ADDRESS</h5>
                  <input
                    style={LoginStyle.form as React.CSSProperties}
                    name="email"
                    id="lemail"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleChange}
                    value={validation.values.email}
                  />
                  {validation.touched.email && validation.errors.email && <div style={{ marginLeft: '0%', color: 'red' }}>{validation.errors.email}</div>}
                </div>
                <div style={LoginStyle.input2 as React.CSSProperties}>
                  <h5 className="text-white">PASSWORD</h5>
                  <div className="flex">
                    <input
                      style={LoginStyle.form as React.CSSProperties}
                      name="password"
                      id="lpassword"
                      type={!eyepassowrd ? "Password" : "text"}
                      onChange={validation.handleChange}
                      onBlur={validation.handleChange}
                      value={validation.values.password}
                    />
                    {!eyepassowrd ? <span onClick={() => { setEyePassword(true) }}><EyeOutlined style={{
                      color: "white",
                      marginLeft: "-25px",
                      marginTop: "25px",
                      position: "relative",
                      zIndex: "2"
                    }} /></span> :
                      <span onClick={() => { setEyePassword(false) }}><EyeInvisibleOutlined style={{
                        color: "white",
                        marginLeft: "-25px",
                        marginTop: "25px",
                        position: "relative",
                        zIndex: "2"
                      }} /></span>}
                  </div>
                  {validation.touched.password && validation.errors.password && (
                    <div style={{ marginLeft: '0%', color: 'red' }}>{validation.errors.password}</div>
                  )}
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    margin: '20px 0px 20px 0px',
                  }}
                >
                  <div style={LoginStyle.checkbox as React.CSSProperties}>
                    <input
                    
                      type="checkbox"
                       //onChange={handleChange1}
                       onChange={handleChange}
                       //onBlur={validation.handleChange}
                      name="rememberMe"
                      id="rememberMe"
                      style={LoginStyle.remember as React.CSSProperties}
                    />
                    <label style={LoginStyle.remember2 as React.CSSProperties}>
                      Keep me Logged-in
                    </label>
                  </div>
                  <p
                    style={LoginStyle.forget}
                    onClick={() => {
                      SetActive(true)
                    }}
                  >
                    FORGOT PASSWORD?
                  </p>
                </div>
                {/* <Link to='/OTP' style={{color:"#fff",width: "100%"}}> */}
                <button
                  type='submit'
                  style={LoginStyle.button as React.CSSProperties}
                  className="text-white font-bold"
                >
                  LOGIN
                </button>
              </div>
            </form>
            
          </div>

          <Showlive
            item={null}
            visible={shofuck}
            setVisible={setShofuck}
            team={null}
            data={null}
          />
  
          <div></div>
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default LoginPage;
