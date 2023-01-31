import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './button'
import BorderButton from './borderbutton'
import Checkbox from './checkbox'
import $ from 'jquery'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import AuthAPI from '../pages/api/AuthAPI'
import { Token } from '../Token'

const OTP = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const router = useRouter(); 
    const user_id = router.query.user_id;
    const email = router.query.email;

    const [status, setStatus] = useState(false)
    const [resendStatus, setResendStatus] = useState(false)
  
    const [invalidOTPMessage, setInvalidOTPMessage] = useState('')
    const [resendOTPMessage, setResendOTPMessage] = useState('')

    const handleOnChange = (event) => {
        event.preventDefault()
        setIsChecked(!isChecked);
    };

    const handleAutoChange = (event) => {
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

        const inputOTP = values.otp1 + values.otp2 + values.otp3 + values.otp4 + values.otp5 + values.otp6

        const inputData = {
            otp: inputOTP,
            user_id: user_id,
        }

        AuthAPI.verifyOtp(inputData)
            .then(async (res) => {
            if (res.data.success) {
                window.location.href = "/";
                Token.saveToken(res.data.user, res.data.token);
            } else {
                setStatus(true)
                setResendStatus(false)
                setInvalidOTPMessage(res.data.message)
            }
            })
            .catch(function (error) {
            // setLoader(false)
            console.log("error ", error);
            });
        },
    });

    const resendOTPHandler = async () => {
        const inputData = {
          user_id: user_id
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

    return (
        <div className="bg-[url('/images/login/BG-login.png')] bg-cover bg-black bg-top">
            <div className="mx-auto max-w-screen-2xl pt-20 pb-40">
                <div className='flex flex-col items-center'>
                    <img src="/images/home/battlelab_logo.svg" alt="BattleLab Logo" className='mb-24' />

                    <form onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                    }}>
                    <div className="bg-bl-dark flex flex-col items-center w-[620px] pt-10 pb-16 px-20 drop-shadow-lg space-y-8">
                        <h1 className='text-2xl text-white text-center font-bold'>ENTER OTP</h1>
                        <p className='text-white'>We have sent you access code to <a href={`mailto:${email}`} className='text-bl-primary'>{email}</a></p>

                            <div className='flex gap-4'>
                            <input 
                            type="text"
                            name='otp1'
                            id="first"
                            maxLength="1"
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={1}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp1} 
                            />
                            <input 
                            type="text"
                            name="otp2"
                            id="second" 
                            maxLength="1" 
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={2}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp2} />
                            <input 
                            type="text"
                            name="otp3" 
                            id="third" 
                            maxLength="1" 
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={3}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp3} />
                            <input 
                            type="text"
                            name="otp4" 
                            id="forth" 
                            maxLength="1" 
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={4}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp4} />
                            <input 
                            type="text"
                            name="otp5" 
                            id="fifth" 
                            maxLength="1" 
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={5}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp5} />
                            <input 
                            type="text"
                            name="otp6" 
                            id="sixth" 
                            maxLength="1" 
                            className='text-3xl text-white text-center bg-neutral-700 w-12 h-12'
                            tabIndex={6}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            onKeyUp={handleAutoChange}
                            value={validation.values.otp6} />
                            </div>

                            <p className='text-white'>Didn't receive an OTP? 
                            <a href="javascript:void(0)" className='text-bl-primary underline' onClick={resendOTPHandler}>Resend OTP</a>
                            </p>
                            <div className='flex flex-col space-y-6 w-full'>
                                {status === true && (
                                    <h2 style={{ color: 'red', textAlign: 'center' }}>{invalidOTPMessage}</h2>
                                )}
                                {resendStatus === true && (
                                    <h4 style={{ color: 'green', textAlign: 'center' }}>{resendOTPMessage}</h4>
                                )}
                                <button type='submit' className='w-full bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark px-10 py-3 rounded-lg text-lg font-bold text-white transition duration-300'>
                                    SUBMIT
                                </button>
                                <button className='w-full bg-bl-dark hover:bg-black border-2 border-bl-primary hover:border-bl-primary-dark px-10 py-3 rounded-lg text-lg font-bold text-white transition duration-300'>
                                    CANCEL
                                </button>
                            </div>
                    </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default OTP