import React, { useEffect, useReducer, useState } from 'react';

import { XIcon } from '@heroicons/react/solid';
import { Collapse, Select, Upload } from 'antd';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { CaretDownOutlined } from '@ant-design/icons';
import ContactReasonAPI from "../../../api/ContactReasonAPI";
import ContactSupportAPI from "../../../api/ContactSupportAPI";
import { useFormik } from "formik";
import * as Yup from 'yup'
import "./style.css"
import Bgabout from '@Image/About/about_background.png'
import { FormFeedback } from "reactstrap";

interface Props {
    ActivePop: (value: any) => void
}

const Contact = ({ ActivePop }: Props) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [contactReason, setContactReason] = useState("");
    const [fileName, setFileName] = useState("");

    const [files, setFiles] = useState([] as any);
    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }), {
            contactReason: [],
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
                    contactReason: res.data.contactReasons,
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const preview = (file: any) => {
        setFiles(file);
        setFileName(file.name);
    }

    // Form validation
    const validationContactForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            contact_reason_id: "",
            description_en: "",
            img_url: []
        },
        validationSchema: Yup.object({
            // contact_reason_id: Yup.string().required('Please select contact reason'),
            // description_en: Yup.string().required('Description is required'),
            // file: Yup.mixed().required('Attachment file is required')
            //     .test('fileFormat', 'We accpet only images (.png, .jpeg, .gif) and videos (.mp4, .mov)', (value) => {
            //         return value && ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'].includes(value.type);
            //     }),
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('contact_reason_id', contactReason);
            data.append('description_en', values.description_en);
            data.append('img_url', files);
            ContactSupportAPI.createContactSupport(data)
            .then((res) => {
                if(res.data.success){
                    setSuccessMessage(res.data.message);
                }else{
                    setSuccessMessage("");
                }
            })
            .catch(function (error) {
                console.log("error ", error);
            });
        },
    });

    const ArrowDown = () => {
        return (
            <CaretDownOutlined className=" text-white text-lg" />
        )
    }
    const { TextArea } = Input;

    return (
        <div className="flex justify-center animated bounceInLeftfaq">
            <div className="w-full h-full bg-transparent "  >
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                    backgroundColor: 'transparent',
                }} className="relative overflow-y-auto drop-shadow-[0px_0px_15px_rgba(0,0,0,0.7)] overflow-x-clip">
                    <XIcon className='absolute top-3 w-9 h-9 right-3 cursor-pointer z-50' onClick={() => ActivePop('')} />

                    <div className="w-full h-full relative animated2 bounceInLeftfaq">
                        <img src={Bgabout} alt="" className="w-full h-[329px] object-cover object-right " />
                        <div className=" w-full h-fit absolute flex justify-center items-center flex-col top-4 ">
                            <p className="mt-10 mb-6 text-center text-[#fff] text-2xl font-bold tracking-wider">BATTLELAB SUPPORT</p>
                            <p className="mx-24 text-center text-[#fff] text-base font-light tracking-wider">Make sure to check the FAQs for a quick solution for your issue because many common problems can akready be resolved on your own. If you still have problems with your issue and couldn't find your solutions in the FAQ, please contact Battlelab support so we can help you fix your issues.</p>
                            <div className="flex justify-center my-10">
                                <div className="w-64 h-14 border-2 border-[#6bb8e7] flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer" onClick={() => ActivePop('faq')}>
                                    <p className="text-center text-[#fff] text-xl font-semibold ">CHECK FAQS</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[270px] w-full animated3 bounceInLeftfaq">
                            <div className="bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.5)] border border-black h-['calc(100vh - 100px)'] wide:h-['calc(100vh - 300px)']">
                                <div className="flex justify-center">
                                    <div style={{
                                        width: '100%',
                                    }} className="mx-12 my-8 h-['calc(100vh - 150px)'] wide:h-['calc(100vh - 350px)'] bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black">

                                        <div className="px-6 w-full h-16 border-l-4 border-[#94bd4b] flex space-x-4 items-center justify-items-center text-center
                                bg-gradient-to-r from-[#142835] to-[#0b151e]">
                                            <p className="text-[#fff] text-base font-semibold">CONTACT BATTLELAB SUPPORT</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="pt-8 w-1/2  flex justify-center bg-primary-dark">
                                                <p className="text-[#fff] text-left text-base font-light bg-primary-dark mx-6">Your issues will be responsed as soon as possible with in 1-3 working days. Please check your battlelab's inbox for the reply. </p>
                                                <div className="h-full  border-r border-[#525c5e]"></div>
                                            </div>
                                            <div className="w-full h-full bg-primary-dark px-12">
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validationContactForm.handleSubmit();
                                                    return false;
                                                }}>
                                                    <div className="flex justify-left ">
                                                        <p className="text-[#fff] text-base font-semibold mt-8 mb-3">WHAT IS THAI ABOUT?</p>
                                                    </div>
                                                    <div className="flex justify-left ">
                                                        <div className=" w-full h-14 border-l-4 border-[#94bd4b] flex Selecter items-center bg-[#2e2e2e]">
                                                            <Select style={{ width: "100%", color: "#fff", borderRadius: "0px", height: "40px", border:"none !important" }}
                                                                className="Selecter selectContact  border-0  "
                                                                suffixIcon={<ArrowDown />}
                                                                placeholder="Select reason"
                                                                dropdownClassName="rounded-none bg-[#2e2e2e] text-white"
                                                                // onClick={value => selectContactReason(value)}
                                                                // value={contactReason}
                                                            >
                                                                {state.contactReason.map((item: any) => (
                                                                    <><Select.Option value={item.id}  className="text-white hover:text-black">
                                                                        <p onClick={() => setContactReason(item.id)}>{item.reason_en}</p>
                                                                    </Select.Option></>
                                                                ))}                                                       
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    {validationContactForm.touched.contact_reason_id && validationContactForm.errors.contact_reason_id ? (
                                                        <FormFeedback type="invalid" style={{ marginLeft: '4%', color: 'white' }}>
                                                            { validationContactForm.errors.contact_reason_id }
                                                        </FormFeedback>
                                                        ) : null
                                                    }

                                                    <div className="flex justify-left ">
                                                        <p className="text-[#fff] text-base font-semibold  mt-6 mb-3">DETAILS ABOUT THE ISSUE</p>
                                                    </div>
                                                    <TextArea
                                                        name='description_en'
                                                        placeholder="Describe your situation in details"
                                                        autoSize={{ minRows: 4, maxRows: 4 }}
                                                        bordered={false}
                                                        className="text-white w-full rounded-none p-6 text-base font-semibold bg-[#2e2e2e] hover:bg-[#2e2e2e] focus:bg-[#2e2e2e] my-3"
                                                        onChange={validationContactForm.handleChange}
                                                        onBlur={validationContactForm.handleChange}
                                                        value={validationContactForm.values.description_en}
                                                    />
                                                    {validationContactForm.touched.description_en && validationContactForm.errors.description_en ? (
                                                        <FormFeedback type="invalid" style={{ marginLeft: '4%', color: 'white' }}>
                                                            { validationContactForm.errors.description_en }
                                                        </FormFeedback>
                                                        ) : null
                                                    }

                                                    <div className="w-full flex justify-end ">
                                                        <div className="my-6 w-72 h-12 border-2 border-[#6bb8e7] flex items-center justify-center bg-[#000] rounded-md cursor-pointer">
                                                            <Upload name="img_url" accept={"image/*"} showUploadList={false}
                                                                onChange={(e) => {
                                                                    preview(e.file.originFileObj);
                                                                }}
                                                                maxCount={1}
                                                            >
                                                                <p className="text-center text-[#fff] text-xl font-semibold ">ATTACH A FILE...</p>
                                                            </Upload>
                                                        </div>
                                                    </div>
                                                    {fileName !== "" && <p className='w-full flex justify-end text-white'>{fileName}</p>}

                                                    {validationContactForm.touched.img_url && validationContactForm.errors.img_url ? (
                                                        <FormFeedback type="invalid" style={{ marginLeft: '4%', color: 'white' }}>
                                                            { validationContactForm.errors.img_url }
                                                        </FormFeedback>
                                                        ) : null
                                                    }

                                                    {/* <FormFeedback type="valid"  style={{ marginLeft: '4%', color: 'white' }}>
                                                        { successMessage }
                                                    </FormFeedback> */}

                                                    {successMessage === "" ? <div className="w-full flex justify-end ">
                                                        <div className="my-6 w-72 h-16 border-2 border-[#6bb8e7] flex items-center justify-center bg-[#253d4c] rounded-md cursor-pointer">
                                                            <button type='submit' className="text-center text-[#fff] text-xl font-semibold ">SUBMIT TICKET</button>
                                                        </div>
                                                    </div> :  <p className='text-center text-xl' style={{ color: 'green' }}>{successMessage}</p>}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
};
export default Contact;
