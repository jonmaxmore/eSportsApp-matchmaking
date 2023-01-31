import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Button from './button'
import BorderButton from './borderbutton'
import Checkbox from './checkbox'
import AuthAPI from '../pages/api/AuthAPI'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReCAPTCHA from "react-google-recaptcha";
import { Token } from '../Token'
import { useRouter } from 'next/router'

const Signup = (props) => {
    const [agreed, setAgreed] = useState(false)
    const [iam18, setIAm18] = useState(false)
    const [notRobot, setNotRobot] = useState(false)
    const [userExist, SetUserExist] = useState(false)
    const [userExistMessage, SetUserExistMessage] = useState('')
    const [ reCaptcha, setReCaptcha ] = useState(false);
    const router = useRouter(); 

    const handleOnChangeAgreed = (event) => {
        event.preventDefault()
        setAgreed(!agreed);
    };
    const handleOnChangeIAm18 = (event) => {
        event.preventDefault()
        setIAm18(!iam18);
    };
    const handleOnChangeNotRobot = (event) => {
        event.preventDefault()
        setNotRobot(!notRobot);
    };

    const handleReactCaptcha = (value) => {
        // console.log("Captcha value:", value);
        setReCaptcha(true)
      }


    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
        email: "",
        password: "",
        confirm_password: "",
        name: "",
        mobile: "",
        avatar_unique_name: "",
        is_18_year_old: "",
        is_agree_to_termsandconditions: "",
        is_not_robot: ""
        },
        validationSchema: Yup.object({
        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirm_password: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name: Yup.string()
            .required('Name is required')
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
        mobile: Yup.string()
            .required('Telephone Number is Required')
            .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Phone number is not valid'
            ),
        avatar_unique_name: Yup.string().required('Avatar Name is required'),    }),
        onSubmit: (values) => {
            values.is_agree_to_termsandconditions = agreed,
            values.is_18_year_old = iam18;
            values.is_not_robot = notRobot;

            AuthAPI.signUp(values)
                .then((res) => {
                console.log("res", res);
                if (res.data.success) {
                    window.location.href = "/loginpage";
                    SetUserExist(false)
                } else {
                    SetUserExist(true)
                    SetUserExistMessage(res.data.message)
                    console.log(res.data.message)
                }
                })
                .catch(function (error) {
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
            console.log(res.data.message)
            SetUserExist(true)
        }).catch(err => {
            SetUserExist(false)
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
            SetUserExist(true)
        }).catch(err => {
            SetUserExist(false);
            console.log(err)
        })
    }

    return (
        <div className='bg-black'>
            <div className="bg-[url('/images/login/img_signup_bg.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl pt-14 md:pt-20 pb-40">
                    <div className='grid md:grid-cols-4'>
                        <div className='col-span-3 space-y-6'>
                            <p className="text-2xl md:text-3xl text-white font-bold text-center pb-8">
                                SIGN UP
                            </p>
                           
                            <form  onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                            }}>
                                
                                <div className='grid grid-cols-2 gap-20'>
                                <div className='flex flex-col space-y-4 px-10'>
                                    <label htmlFor="email" className='text-white font-bold'>E-MAIL ADDRESS</label>
                                    <input 
                                    type="email" 
                                    name="email" 
                                    className='bg-neutral-800 text-white border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="username@email.com"
                                    id="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email} 
                                    />
                                    {validation.touched.email && validation.errors.email && <div className="text-red-500">{validation.errors.email}</div>}

                                    <label htmlFor="password" className='text-white font-bold pt-3'>PASSWORD</label>
                                    <input 
                                    type="password" 
                                    name="password" 
                                    className='text-white bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="••••••••"
                                    id="password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password} 
                                    />
                                    {validation.touched.password && validation.errors.password && (<div className = "text-red-500">{validation.errors.password}</div>)}
                                    
                                    <label htmlFor="password2" className='text-white font-bold pt-3'>REPEAT PASSWORD</label>
                                    <input 
                                    type="password" 
                                    name="confirm_password" 
                                    id="confirm_password"
                                    className='text-white bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="••••••••" 
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.confirm_password}
                                    />
                                    {validation.touched.confirm_password && validation.errors.confirm_password && (
                                    <div className = "text-red-500">{validation.errors.confirm_password}</div>
                                    )}
                                    
                                    <div className='space-y-4'>
                                        <div className="flex items-center gap-6">
                                            <div className='flex items-center gap-4 relative'>
                                                <Checkbox handleOnChange={handleOnChangeAgreed} isChecked={agreed} />
                                                <input 
                                                type="checkbox" 
                                                id="is_agree_to_termsandconditions" 
                                                // checked={validation.values.is_agree_to_termsandconditions} 
                                                name="is_agree_to_termsandconditions" 
                                                className='opacity-0 absolute right-0'
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.is_agree_to_termsandconditions} 
                                                />
                                                <p className='text-white'>
                                                    I agree to <Link href="#"><a className='underline'>Terms & Condition</a></Link> and <Link href="#"><a className='underline'>Privacy Policy</a></Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className='flex items-center gap-4 relative'>
                                                <Checkbox handleOnChange={handleOnChangeIAm18} isChecked={iam18} />
                                                <input 
                                                type="checkbox" 
                                                id="is_18_year_old" 
                                                // checked={validation.values.is_18_year_old} 
                                                name="is_18_year_old" 
                                                className='opacity-0 absolute right-0' 
                                                />
                                                <p className='text-white'>I am 18 years old or above</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-4 px-10'>
                                    <label htmlFor="fullname" className='text-white font-bold'>FULL NAME</label>
                                    <input 
                                    type="text" 
                                    name="name"
                                    id="name"                                    
                                    className='bg-neutral-800 text-white border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="John Doe"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name} 
                                    />
                                    {validation.touched.name && validation.errors.name && <div className = "text-red-500">{validation.errors.name}</div>}

                                    <label htmlFor="phonenumber" className='text-white font-bold'>TELEPHONE NUMBER</label>
                                    <input 
                                    type="text" 
                                    name="mobile"
                                    id="mobile"                                    
                                    className='bg-neutral-800 text-white border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="xxx-xxx-xxxx" 
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.mobile}
                                    />
                                    {validation.touched.mobile && validation.errors.mobile && <div className = "text-red-500">{validation.errors.mobile}</div>}

                                    
                                    <label htmlFor="avatarname" className='flex justify-between items-center'>
                                        <p className=" text-white font-bold">AVATAR NAME</p>
                                        <p className='text-white text-sm'>(This will appear on your profile)</p>
                                    </label>
                                    <input 
                                    type="text" 
                                    name="avatar_unique_name"
                                    id="avatar_unique_name" 
                                    className='bg-neutral-800 text-white border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' 
                                    placeholder="JohnDoe02"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.avatar_unique_name} 
                                    />
                                    {validation.touched.avatar_unique_name && validation.errors.avatar_unique_name && (
                                    <div className = "text-red-500">{validation.errors.avatar_unique_name}</div>
                                    )}
                                    <div className="flex items-center gap-6 bg-stone-900 p-5 w-80">
                                        <div className="flex items-center gap-6">
                                            {/* <div className='flex items-center gap-4 relative'>
                                                <Checkbox handleOnChange={handleOnChangeNotRobot} isChecked={notRobot} />
                                                <input 
                                                type="checkbox" 
                                                id="is_not_robot" 
                                                checked={validation.values.is_not_robot} 
                                                name="is_not_robot" 
                                                className='opacity-0 absolute right-0'
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.is_not_robot} 
                                                />
                                                <p className='text-white'>I am not a robot</p>
                                            </div> */}
                                            <ReCAPTCHA
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            theme='dark'
                                            size="normal"
                                            onChange={handleReactCaptcha}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                </div>
                                <div className='text-center'>
                                {userExist && (
                                <h1 style={{ color: 'red'}} className='mt-6'>{userExistMessage}</h1>
                                )}
                                <button type="submit" className='w-96 mt-6 bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark py-4 rounded-lg text-xl font-bold text-white transition duration-300'>
                                    SIGN UP
                                </button>
                                </div>
                            </form>

                            <br />
                            <h6 className='social-reg'>
                                <span>Sign Up With</span>
                            </h6> 
                            <div className='social-logins'>
                                <i onClick={socialHandleG} className="fa-brands fa-google"></i>
                                <i onClick={socialHandleF} className="fa-brands fa-facebook"></i>
                            </div>
                            <p className='text-white text-center pt-4'>
                                Already have an account? Login
                                <Link href="/loginpage">
                                    <a className='text-bl-primary'> here</a>
                                </Link>
                              
                            </p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup