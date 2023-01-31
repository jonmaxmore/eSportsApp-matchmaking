import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// import { Button } from 'antd'
import * as Yup from 'yup'
import AuthAPI from '../../../api/AuthAPI';

interface Props {
  Active: (e: any) => void
}

const Forgetpass = ({ Active }: Props) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
        
        AuthAPI.forgotPassword(values)
            .then((res) => {
            if(res.data.success){
              setStatus(res.data.success)
              setMessage(res.data.message)
            }else{
              setStatus(res.data.success)
              setMessage(res.data.message)
            }
            })
            .catch(function (error) {
                console.log("error ", error);
            });
    },
  });

  return (
    <div>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{ width: '50%', backgroundColor: '#0A1719', height: '50%' }}
        >
          <div
            style={{
              width: '100%',
              height: '20%',
              display: 'flex',
              backgroundColor: '#0f2f3a',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#fff',
              }}
            >
              FORGET PASSWORD
            </p>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                width: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '6px',
                backgroundColor: '#0e2633',
                height: '40px',
                cursor: 'pointer',
              }}
              onClick={() => {
                Active(false)
              }}
            >
              <XIcon
                style={{
                  width: '20px',
                  height: '20px',
                  fontWeight: 'bold',
                  position: 'absolute',
                  color: '#fff',
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '80%',
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {status ? (
              <p style={{ color: 'green' }}>{message}</p>
            ) : (
              <p style={{ color: 'red' }}>{message}</p>
            )}
            <div
              style={{
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Please enter the email address you provided during your
              registration.
              <br />
              We will send you a link to reset your password
            </div>
            <form
              style={{
                width: '50%',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}

              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
                }}
            >
              <input
                type="text"
                placeholder="username@email.com"
                style={{
                  width: '80%',
                  height: '40px',
                  padding: '10px',
                  color: '#fff',
                  backgroundColor: '#2e2e2e',
                  borderLeft: '4px solid #8abf33',
                  marginTop: '30px',
                  marginBottom: '10px',
                }}
                name="email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email}
              />
              {validation.touched.email && validation.errors.email && (
                <div className = "text-red-500">{validation.errors.email}</div>
              )}              
              <button
                style={{
                  width: '80%',
                  height: '60px',
                  backgroundColor: '#1d3e4e',
                  color: '#fff',
                  border: '4px solid #49b4e3',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                SEND LINK
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgetpass
