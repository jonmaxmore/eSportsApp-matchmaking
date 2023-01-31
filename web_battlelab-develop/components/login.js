import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './button'
import BorderButton from './borderbutton'
import Checkbox from './checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthAPI from '../pages/api/AuthAPI'
import { Token } from '../Token'
import { useRouter } from 'next/router'

const Login = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [userNotExist, SetUserNotExist] = useState(false)
    const [userNotExistMessage, SetUserNotExistMessage] = useState('')
    const router = useRouter(); 

    const handleOnChange = (event) => {
        event.preventDefault()
        setIsChecked(!isChecked);
    };

    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
        email: "",
        password: "",
        user_device_id: ""
        },
        validationSchema: Yup.object({
        email: Yup.string()
            .email('Email not valid')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {

        var navigator_info = window.navigator
        var screen_info = window.screen
        var uid = navigator_info.mimeTypes.length
        uid += navigator_info.userAgent.replace(/\D+/g, '')
        uid += navigator_info.plugins.length
        uid += screen_info.height || ''
        uid += screen_info.width || ''
        uid += screen_info.pixelDepth || ''

        values.user_device_id = uid;

        AuthAPI.login(values)
            .then(async (res) => {
            if (res.data.success) {

                // console.log("res.data", res.data);
                // window.location.href = "/otppage";
                // Token.saveToken(res.data.user, res.data.token);
                
                if (res.data.redirect === 'otp') {
                const email = values.email
                const user_id = res.data.data.user_id
                // navigate('/verify-otp', { state: { user_id: user_id, email: email } })
                router.push( { pathname: "/otppage", query: { user_id: user_id, email: email } })

                } else if (res.data.redirect === 'home') {

                    window.location.href = "/";
                    Token.saveToken(res.data.user, res.data.token);

                // const payload = {
                //     token: {
                //     accessToken: res.data.token,
                //     },
                //     userInfo: res.data.user
                // }

                // context._signIn(payload);

                // navigate('/home');
            
                }

            } else {
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
    // Firebase connection with google
    const socialHandleG = async (e) => {
        const req = await AuthAPI.socialG();

        const firebaseUser = req.user;
        const newFirebaseUser = {
            email: firebaseUser.email,
            password: firebaseUser.providerId,
            confirm_password: firebaseUser.providerId,
            name: firebaseUser.displayName,
            mobile: firebaseUser.phoneNumber ? firebaseUser.phoneNumber 
                    : Math.floor(100000000 + Math.random() * 900000000),
            avatar_unique_name: firebaseUser.photoURL,
            is_18_year_old: true,
            is_agree_to_termsandconditions: true,
            is_not_robot: true
        }
        AuthAPI.signUp(newFirebaseUser).then(async (res) => {
            router.push( { pathname: "/otppage", query: { user_id: firebaseUser.uid, email: firebaseUser.email } })
            // Token.saveToken(res.data.user, res.data.token);
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // Firebase connection with facebook
    const socialHandleF = async () => {
        const req = await AuthAPI.socialF();

        const firebaseUser = req.user;
        const newFirebaseUser = {
            email: firebaseUser.email,
            password: firebaseUser.providerId,
            confirm_password: firebaseUser.providerId,
            name: firebaseUser.displayName,
            mobile: firebaseUser.phoneNumber ? firebaseUser.phoneNumber 
                    : Math.floor(100000000 + Math.random() * 900000000),
            avatar_unique_name: firebaseUser.photoURL,
            is_18_year_old: true,
            is_agree_to_termsandconditions: true,
            is_not_robot: true
        }
        AuthAPI.signUp(newFirebaseUser).then(async (res) => {
            router.push( { pathname: "/otppage", query: { user_id: firebaseUser.uid, email: firebaseUser.email } })
 
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='bg-black'>
            <div className="bg-[url('/images/login/img_login_bg.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl pt-14 md:pt-20 pb-14 md:pb-40">
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-20'>
                        <div className='space-y-4 px-8 md:px-20'>
                            <p className="text-2xl md:text-3xl text-white font-bold text-center pb-8">
                                LOGIN
                            </p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                                }} 
                                
                            >
                                <div className='flex flex-col space-y-4'>
                                <label htmlFor="email" className='text-white font-bold'>E-MAIL ADDRESS</label>
                                <input 
                                type="email" 
                                name="email" 
                                className='bg-neutral-800  text-white border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                placeholder="username@email.com"
                                onChange={validation.handleChange}
                                onBlur={validation.handleChange}
                                value={validation.values.email} 
                                />
                                {validation.touched.email && validation.errors.email && <div className="text-red-500">{validation.errors.email}</div>}
                                
                                <label htmlFor="password" className='text-white font-bold pt-3'>PASSWORD</label>
                                <input 
                                type="password" 
                                name="password" 
                                className='text-white bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                placeholder="••••••••"
                                onChange={validation.handleChange}
                                onBlur={validation.handleChange}
                                value={validation.values.password} 
                                />
                                {validation.touched.password && validation.errors.password && (
                                    <div className="text-red-500">{validation.errors.password}</div>
                                )}

                                <div className='flex justify-between pb-8'>
                                    <div className='flex items-center gap-4 relative'>
                                        <Checkbox handleOnChange={handleOnChange} isChecked={isChecked}/>
                                        <input type="checkbox" id="keeploggedin"  name="keeploggedin" className='opacity-0 absolute right-0' />
                                        <p className='text-white'>Keep me logged in</p>
                                    </div>
                                    <Link href="/forgetpassword">
                                        <a className='font-bold text-sm md:text-base text-bl-primary'>
                                            FORGET PASSWORD?
                                        </a>
                                    </Link>
                                </div>

                                </div>
                                {userNotExist === true && (
                                <h2 style={{ color: 'red', textAlign: "center", marginBottom: "20px" }}>{userNotExistMessage}</h2>
                                )}
                                <button type='submit' className='w-full bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark py-4 rounded-lg text-xl font-bold text-white transition duration-300'>
                                LOGIN
                                </button>
                            </form>
                            <br />
                            <h6 className='social-log'>
                                <span>Sign In With</span>
                            </h6> 
                            <div className='social-logins'>
                                <i onClick={socialHandleG} className="fa-brands fa-google"></i>
                                <i onClick={socialHandleF} className="fa-brands fa-facebook"></i>
                            </div>
                            
                            <p className='text-white text-center pt-4'>
                                No account yet? Register
                                <Link href="/signuppage">
                                    <a className='text-bl-primary'> here</a>
                                </Link>
                                .
                            </p>
                        </div>
                        <div className='hidden md:flex flex-col items-center space-y-20'>
                            <img src="/images/login/img_pc_login.svg" alt="" />
                            <img src="/images/login/img_play_coins.svg" alt="" className='absolute top-0 right-0' />
                            <p className='text-2xl text-white px-20 text-center'>
                                Download Battlelab client to play your favorite game and start earning from today
                            </p>
                            <div className='flex gap-8'>
                                <Button label={"INSTALL NOW"} />
                                <BorderButton label={"GET STARTED"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login