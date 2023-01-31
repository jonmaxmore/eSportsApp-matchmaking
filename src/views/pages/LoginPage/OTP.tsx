import React, { useEffect, useState } from 'react'
import { LoginStyle } from './style'
// import Style from './style.module.css'
import logo from './01Page-Login/LG-battleLab.png'
import { Button } from 'antd'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import $ from 'jquery'
import AuthAPI from '../../../api/AuthAPI';
import { useAuthContextDispatch } from '@AuthContext/store'
import Loader from '@Components/Loader/Loader'
import { socket } from '@Utils/socket'

const OTP = () => {
  const location = useLocation()
  const userData: any = location.state

  const [status, setStatus] = useState(false)
  const [resendStatus, setResendStatus] = useState(false)

  const [invalidOTPMessage, setInvalidOTPMessage] = useState('')
  const [resendOTPMessage, setResendOTPMessage] = useState('')

  const context = useAuthContextDispatch();

  const navigate = useNavigate()
  const handleAutoChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const BACKSPACE_KEY = 8
    const DELETE_KEY = 46
    let tabindex = $(event.target).attr('tabindex') || 0
    tabindex = Number(tabindex)
    if (event.keyCode === BACKSPACE_KEY) {
      tabindex -= 1
    } else if (event.keyCode !== DELETE_KEY) {
      tabindex += 1
    }
    const elem = $('[tabindex=' + tabindex + ']')
    if (elem[0]) {
      elem.focus()
    }
  }

  const resendOTPHandler = async () => {
    const inputData = {
      user_id: userData.user_id
    }

    AuthAPI.resendOtp(inputData)
      .then(async (res) => {
        if (res.data.success) {
          setStatus(false)
          setResendStatus(true)
          setResendOTPMessage(res.data.message)
        } else {
          console.log(res.data.message);
        }
      })
      .catch(function (error) {
        // setLoader(false)
        console.log("error ", error);
      });
  }

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
    // validationSchema: Yup.object({
    //     email: Yup.string()
    //     .email('Email not valid')
    //     .required('Email is required'),
    //     password: Yup.string().required('Password is required'), 
    // }),
    onSubmit: (values) => {
      $('.appLoader').css('display', 'block');
      const inputOTP = values.otp1 + values.otp2 + values.otp3 + values.otp4 + values.otp5 + values.otp6
      const user_id = userData.user_id;

      const inputData = {
        otp: inputOTP,
        user_id: user_id,
      }

      AuthAPI.verifyOtp(inputData)
        .then(async (res) => {
          if (res.data.success) {
            const data = {
              onlineOfflineRoom: "onLineOfflineStatusRoom",
              onlineFriends: res.data.onlineFriends,
            };
            socket.emit("set_onlineOfflineUser_status", data);
            const payload = {
              token: {
                accessToken: res.data.token,
              },
              userInfo: res.data.user
            }
            context._signIn(payload);
            // Token.saveToken(res.data.user, res.data.token);
            // window.location.href = "/home";
            $('.appLoader').css('display', 'none');
            navigate('/home', { state: { data: res.data } });
          } else {
            $('.appLoader').css('display', 'none');
            setStatus(true)
            setResendStatus(false)
            setInvalidOTPMessage(res.data.message)
          }
        })
        .catch(function (error) {
          console.log("error ", error);
        });
    },
  });

  return (
    <div style={LoginStyle.app as React.CSSProperties}>
      <div style={LoginStyle.logo as React.CSSProperties}>
        <img src={logo}  />
      </div>
      <div style={LoginStyle.windows as React.CSSProperties}>
        <div style={LoginStyle.block as React.CSSProperties}>
          <h1 style={LoginStyle.login as React.CSSProperties}>ENTER OTP</h1>
          <div style={LoginStyle.QRegister as React.CSSProperties}>
            <p style={{ color: 'white' }}>We have sent your access code to </p>
            <a style={{ color: '#23edfc' }} href="javascript:void(0)">
              {userData.email}
            </a>
          </div>
          <div style={LoginStyle.container as React.CSSProperties}>
            <form onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}>
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridGap: '30px',
                  }}
                >
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp1"
                    tabIndex={1}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp1}
                    placeholder=""
                  />
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp2"
                    tabIndex={2}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp2}
                    placeholder=""
                  />
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp3"
                    tabIndex={3}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp3}
                    placeholder=""
                  />
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp4"
                    tabIndex={4}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp4}
                    placeholder=""
                  />
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp5"
                    tabIndex={5}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp5}
                    placeholder=""
                  />
                  <input
                    style={LoginStyle.NumOTP as React.CSSProperties}
                    type="text"
                    name="otp6"
                    tabIndex={6}
                    maxLength={1}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    onKeyUp={handleAutoChange}
                    value={validation.values.otp6}
                    placeholder=""
                  />
                </div>
                <div style={LoginStyle.QRegister2 as React.CSSProperties}>
                  <p style={{ color: 'white' }}>Didn't receive an OTP? </p>
                  <a
                    style={{ color: '#23edfc' }}
                    onClick={resendOTPHandler}
                    href="javascript:void(0)"
                  >
                    Resend OTP
                  </a>
                </div>
                <div>
                  {status === true && (
                    <h2 style={{ color: 'red' }}>{invalidOTPMessage}</h2>
                  )}
                  {resendStatus === true && (
                    <h4 style={{ color: 'green' }}>{resendOTPMessage}</h4>
                  )}
                </div>
                <button
                  style={LoginStyle.button as React.CSSProperties}
                >
                  SUBMIT
                </button>
                <Link to="/login" style={{ color: '#fff', width: '100%' }}>
                  <Button
                    style={LoginStyle.buttonCancel as React.CSSProperties}
                    onClick={() => {
                      navigate('/login')
                    }}
                  >
                    CANCEL
                  </Button>
                </Link>
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
      <Loader/>
    </div>
  )
}

export default OTP
