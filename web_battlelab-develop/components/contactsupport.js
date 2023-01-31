import { useContext, useState, useEffect, useReducer, useRef } from 'react'
import Link from 'next/link'
import BorderButton from './borderbutton'
import {
    FormFeedback,
} from "reactstrap";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthAPI from '../pages/api/AuthAPI'
import ContactSupportAPI from '../pages/api/ContactSupportAPI'
import ContactReasonAPI from '../pages/api/ContactReasonAPI'

const ContactSupport = (props) => {
    const [files, setFiles] = useState([]);
    const [success_message, setSuccessMessage] = useState("");
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            contactReason: []
        }
    );


    useEffect(() => {
        getContactReasons();
    }, [])

    const getContactReasons = () => {
        ContactReasonAPI.fetchContactReason()
            .then(res => {
                if (res.data.success) {
                    setState({
                        contactReason: res.data.contactReasons
                    })
                }

            }).catch(err => {
                console.log(err)
            })
    }
    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            contact_reason_id: "",
            description_en: "",
            img_url: ""
        },
        validationSchema: Yup.object({
            contact_reason_id: Yup.string().required('Please select contact reason'),
            description_en: Yup.string().required('Description is required'),
            img_url: Yup.mixed().required('Attachment file is required')
                .test('fileFormat', 'We accpet only images (.png, .jpeg, .gif) and videos (.mp4, .mov)', (value) => {
                    console.log(value); return value && ['image/jpeg','image/png','image/gif','video/mp4','video/quicktime'].includes(value.type);
                }),
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('contact_reason_id', values.contact_reason_id);
            data.append('description_en', values.description_en);
            data.append('img_url', files);
            ContactSupportAPI.createContactSupport(data)
                .then((res) => {
                    setSuccessMessage("Thank you for contacting  us, our support team will get back to you")
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);
                })
                .catch(function (error) {
                    // setLoader(false)
                    console.log("error ", error);
                });
        },
    });
    const inputFile = useRef(null) 

    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };


    return (
        <div className='bg-black'>
            <div className='mx-auto max-w-screen-2xl px-6 space-y-8 pb-20'>
                <h1 className="text-2xl md:text-5xl text-white font-bold">Contact our support team</h1>
                <div className='bg-bl-darker md:px-28'>
                    <div className='grid grid-cols-1 md:grid-cols-2 py-6 md:py-12'>
                        <p className='text-white md:w-2/3 leading-loose md:leading-normal'>
                            Your issues will be responsed as soon as possible within 1-3 working days. Please check your battlelab's inbox for the reply.
                        </p>
                        <div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}

                            >
                                <div className='flex flex-col space-y-4 mb-10'>
                                    <label htmlFor="issues" className='text-white font-bold'>WHAT IS THIS ABOUT</label>
                                    <select name="contact_reason_id" onChange={validation.handleChange} id="" className='form-select bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3 text-white'>
                                        <option selected value="">Please Select</option>
                                        {state.contactReason.map((item) => (
                                            <option key={item.id} value={item.id}>{item.reason_en}</option>
                                        ))}
                                    </select>
                                    {validation.touched.contact_reason_id &&
                                        validation.errors.contact_reason_id ? (
                                        <FormFeedback type="invalid" style={{ color: 'red' }}>
                                            {validation.errors.contact_reason_id}
                                        </FormFeedback>
                                    ) : null}
                                    {/* <input type="text" name="issues" className='bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' placeholder="Account Issues" /> */}
                                    <label htmlFor="password" className='text-white font-bold pt-3'>DETAILS ABOUT THE ISSUE</label>
                                    <input name="description_en"
                                        className='text-white bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3'
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleChange}
                                        value={validation.values.description_en}
                                        bordered={false}
                                        placeholder="Describe your situation in details..." />
                                    {validation.touched.description_en &&
                                        validation.errors.description_en ? (
                                        <FormFeedback type="invalid" style={{ color: 'red' }}>
                                            {validation.errors.description_en}
                                        </FormFeedback>
                                    ) : null}
                                    <p className='text-white text-right mt-2'>We accpet only images (.png, .jpeg, .gif) and videos (.mp4, .mov)</p>
                                    <div className='flex justify-end pt-2'>
                                        <input name="img_url"
                                            type="file"
                                            style={{display: "none"}}
                                            className="text-white border-2 border-bl-primary rounded-md w-full md:w-auto md:px-10 uppercase text-sm md:text-base py-2 md:py-0" bordered={false}
                                            onChange={(e) => {
                                                setFiles(e.target.files[0]);
                                                validation.setFieldValue('img_url', e.target.files[0]);

                                            }} 
                                            ref={inputFile} 
                                            />
                                        
                                       <div onClick={onButtonClick} className='text-white border-2 border-bl-primary rounded-md px-10 uppercase'>Attach a file…</div>

                                    </div>
                                    <div className='text-white text-right mt-2'>
                                    {validation.touched.img_url &&
                                            validation.errors.img_url ? (
                                            <FormFeedback type="invalid" style={{ color: 'red' }}>
                                                {validation.errors.img_url}
                                            </FormFeedback>
                                        ) : null}
                                    </div>
                                    <p className=' uppercase' style={{ color: 'green' }}>{success_message}</p>
                                </div>

                                <div className='flex gap-6 justify-end'>
                                    {!success_message && (
                                        <a>
                                            <BorderButton type="submit" label={"SUBMIT TICKET"} size={"small"} />
                                        </a>
                                    )}
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 pb-6 md:pb-32'>
                        <div className='space-y-4 grid col-span-2'>
                            <h1 className='text-white text-sm font-bold'>CUSTOMER SUPPORT</h1>
                            <p className='text-white text-xs'>We are available 24/7 to help you resolve your problem.</p>
                        </div>
                        <div className='space-y-4'>
                            <h1 className='text-white text-sm font-bold'>FOLLOW US ON</h1>
                            <div className='flex justify-start gap-2'>
                                {/* <Link href=''>
                            <img src="/images/home/ic_ig.svg" alt="" />
                            </Link> */}
                                <a href='https://twitter.com/Battlelabgg?s=20&t=SnXgZjIzs1WADhQEcbUpjA' target="_blank" rel="noreferrer">
                                    <img src="/images/home/ic_twitter_media.svg" alt="" className='w-10 pt-[3px]' />
                                </a>
                                {/* <Link href=''>
                                <img src="/images/home/ic_linkedin.svg" alt="" />
                                </Link> */}
                                <a href='https://www.facebook.com/Battlelab.gg' target="_blank" rel="noreferrer">
                                    <img src="/images/home/ic_fb.svg" alt="" />
                                </a>
                                <a href='https://youtube.com/channel/UCa9cTNMaXZSMBX2K3M58UiQ' target="_blank" rel="noreferrer">
                                    <img src="/images/home/ic_youtube.svg" alt="" />
                                </a>
                                <a href='https://discord.gg/DMPaa2HHKp' target="_blank" rel="noreferrer">
                                    <img src="/images/home/ic_discord.svg" alt="" / >
                                </a>
                                <a href='https://t.me/battlelabgg' target="_blank" rel="noreferrer">
                                    <img src="/images/home/ic_telegram.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ContactSupport