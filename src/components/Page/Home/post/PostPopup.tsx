import React, { useEffect, useReducer, useState } from "react";
import Feel from "@Image/Home/ic-feel_event.png"
import Pic from "@Image/Home/ic-pic_video.png"
import { XIcon } from "@heroicons/react/solid";
import style from "./style.module.css";
import clsx from "clsx";
import UserAPI from "../../../../api/UserAPI";
import SocialAPI from "@api/SocialAPI";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { Upload, Modal, Input } from "antd";
import { ReactComponent as Tagfriend } from "@Image/Home/ic_tag_friend.svg"
import PopupTagfriend from "./PopupTagfriend";

interface Props {
    ActivePop: (value: any) => void,
}


const Popup = ({ addElementToPost,  ActivePop }: any) => {

    const { TextArea } = Input;
    const [Image, setImage] = useState('');
    const [files, setFiles] = useState([] as any);
    const [PopTagfriend, setPopTagfriend] = useState(false);
    const [Tag, setTag] = useState([] as any);
    const [ postAttachmentType, setPostAttachmentType ] = useState('');

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            name: "",
            avtarName: "",
            img_url: "",
            level: 0
        }
    );

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {

        UserAPI.getUserDetail()
            .then(res => {
                if (res.data.success) {
                    setState({
                        name: res.data.user.name,
                        avtarName: res.data.user.avatar_unique_name,
                        img_url: res.data.user.avatar_image,
                        level: res.data.user.level
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const preview = (file: any) => {
        setFiles(file);
        setPostAttachmentType(file.type.split('/').pop());
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result as string);
        }
    }

    const DeleteImg = () => {
        if (Image !== '') {
            return <XIcon className="absolute top-0 right-0 w-6 h-6 bg-black rounded-md text-white text-center" onClick={() => setImage('')} />
        } else {
            return null
        }
    }

    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            message: "",
            file: [],
            tags: [],
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Type Something...'),
        }),
        onSubmit: (values) => {
            // values.file = files;
            const data = new FormData();
            data.append('file', files);
            data.append('message', values.message);
            data.append('tags', Tag);
            // for (let i = 0; i < files.length; i++) {
            //     data.append('file', files[i]);
            // }  
            SocialAPI.postFeed(data)
                .then(async (res) => {
                    if (res.data.success) {
                        addElementToPost(res.data.postData);
                        ActivePop(false);
                        validation.values.message = "" ;
                        validation.values.file = [] ;
                        setImage('');
                        setFiles([]);
                        setTag([]);
                    } else {

                    }
                })
                .catch(function (error) {
                    console.log("error ", error);
                });
        },
    });

    const OnTag = () => {
        if (Tag.length > 0) {
            return Tag.map((item: string, index: number) => {
                return <div key={index} className={clsx(style.tag, "flex items-center px-4 py-2 rounded-md border-2 border-primary-sky")}>
                    <Tagfriend className={clsx(style.tagIcon, "w-6 h-6")} />
                    <span className={clsx(style.tagText, "ml-2")}>{item}</span>
                </div>
            })
        } else {
            return <div className={clsx(style.tag, "flex items-center px-4 py-2 rounded-md border-2 border-primary-sky")}>
                <Tagfriend className={clsx(style.tagIcon, "w-6 h-6")} />
                <span className={clsx(style.tagText, "ml-2")}>Tag Friend</span>
            </div>
        }
    }

    return (

        <div className="w-[500px] h-auto bg-black">
            <div className="w-full h-[40px] bg-[#111921] border-l-[3px] border-l-[#a2ce51] p-[10px_15px_10px_15px] flex justify-between items-center">
                <p className="text-[10px] text-white font-bold">CREATE POST</p>
                <div className="w-[25px] h-[25px] bg-[#17222e] flex justify-center items-center" onClick={() => ActivePop(false)}>
                    <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" /></div>
            </div>
            <div className="w-full h-[40px] p-[10px_15px_10px_15px] flex justify-start items-center gap-1 text-white" >
                <div className="w-[15px] h-[15px] bg-[#41474e] rounded-[3px] text-[11px]  text-center font-semibold">{state.level}</div>
                <p className="text-[10px] text-white font-extrabold">{state.avtarName}</p>

            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}>
                {validation.touched.message && validation.errors.message && <div style={{ color: "white", marginLeft: "20px" }}>{validation.errors.message}</div>}
                <div className="w-fill h-auto min-h-[100px] bg-[#2d2e2d] relative">
                        <TextArea 
                        placeholder="What's on your mind?" 
                        className="focus:outline-0 w-full h-auto text-white bg-transparent border-0 p-6" 
                        name="message"
                        onChange={validation.handleChange}
                        onBlur={validation.handleChange}
                        value={validation.values.message}
                        autoSize bordered={false} />
                    <span className = "px-6 w-full">
                    <span className={clsx("text-white text-sm", Tag[0] === undefined ? "hidden" : "")}>- with</span>
                    {Tag.map((item: string, index: number) => {
                        if(index === Tag.length-2){
                            return <span className = "">
                                <span className={ "ml-1 text-primary-sky text-sm"}>{item}</span>
                                <span className={ "ml-1 text-white text-sm"}>and </span>
                            </span>
                            
                        }else if(index === Tag.length-1){
                            return <span className={ "ml-1 text-primary-sky text-sm"}> {item}</span>
                        }else{
                            return(<span className = "">
                                <span className={ "ml-1 text-primary-sky text-sm"}>{item}</span>
                                <span className={ "text-white text-sm"}> , </span>
                            </span>)
                        }
                    })
                    }
                    </span>

                </div>
                <div className="w-fill h-auto min-h-[20px] bg-[#2d2e2d] p-[10px_15px_10px_15px] relative">
                    {postAttachmentType === 'mp4' ? <video
                            id="videoPreviw"
                            src={Image}
                            className="w-full h-auto"
                            autoPlay
                            playsInline
                            loop
                            muted
                          ></video>  : <img src={Image} className="w-full h-auto" />}
                    <DeleteImg />
                </div>
                <div className="mt-[20px] flex justify-between items-center gap-[15px] text-[12px] text-white">
                    <Upload name="attachments" accept={"image/*,video/*"} showUploadList={false} className="w-full flex items-center justify-start "
                        onChange={(files) => {
                            preview(files.file.originFileObj);
                        }}
                        maxCount={1}
                    >
                        <a className="flex text-[12px] items-center w-full h-[40px] border-[2px] border-[#6bb8e7] p-[5px] font-medium cursor-pointer justify-center text-white">
                            <img src={Pic} alt="feel" className="h-[18px] w-auto object-contain m-[0px_10px_0px_65px]" />
                            <p style={{
                                marginRight: "65px",
                            }}>
                                PUCTURE/VIDEO
                            </p>
                        </a>
                    </Upload>

                    <div className="flex items-center w-full h-[40px] border-[2px] border-[#6bb8e7] uppercase p-[5px] font-medium cursor-pointer justify-center "
                    onClick={() => setPopTagfriend(true)}
                    >
                        <Tagfriend className="h-[15px] w-auto mr-[10px]" />
                        tag friend

                    </div>
                </div>
                <button type="submit" className="w-full h-[40px] bg-[#263c4c] border-[3px] border-[#5da1c9] p-[10px_15px_10px_15px] flex justify-center items-center mt-[5px] ">
                    <p style={{
                        fontSize: "13px",
                        color: "#fff",
                        fontWeight: 700,
                    }}>POST</p>
                </button>
                <Modal visible={PopTagfriend} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <PopupTagfriend setPopTagfriend={setPopTagfriend} setTag={setTag} />
                </Modal>
            </form>
        </div>
    )
}


export default Popup;