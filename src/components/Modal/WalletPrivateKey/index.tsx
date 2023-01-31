

import React, { useRef, useState } from "react";
import { XIcon, MinusIcon } from "@heroicons/react/outline";
import "./style.css"
import { Input } from "antd";
import { FormFeedback } from "reactstrap";
import UserAPI from '../../../api/UserAPI';
import $ from 'jquery';

interface Props {
    setOpenWalletPrivateKey: (show: boolean) => void;
}

const Block = ({ setOpenWalletPrivateKey }: Props) => {

    const inputOTPRef : any = useRef();

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [copytoClipboardButtonDisabled, setcopytoClipboardButtonDisabled] = useState(true);
    const [textareaBlur, settextareaBlur] = useState("blur(8px)");
    const [success_copy_message, setSuccessCopyMessage] = useState("");

    const onGenerateOTPHandler = () => {
        UserAPI.generateOTPAPI()
        .then((res) => {
            if(res.data.success){
                setSuccessMessage(res.data.message);
            } else {
                setErrorMsg(res.data.message);
            }
        })
        .catch(function (error) {
            setErrorMsg(error);
        });
    }

    const onValidateOTPHandler = () => {
        if(inputOTPRef.current.input.value != ''){
            const payload = {
                otp: inputOTPRef.current.input.value
            }
            UserAPI.validateOTPAPI(payload)
            .then((res) => {
                if(res.data.success){
                    setPrivateKey(res.data.privateKey);
                    settextareaBlur("blur(0px)");
                    setcopytoClipboardButtonDisabled(false);
                    setErrorMsg('');
                    setSuccessMessage(res.data.message);
                    
                } else {
                    setErrorMsg(res.data.message);
                }
            })
            .catch(function (error) {
                setErrorMsg(error);
            });
        }else{
            setSuccessMessage('');
            setErrorMsg('Please enter OTP.');
            return true;
        }
    }
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(privateKey);
        if(privateKey != '') {
        setSuccessMessage('');
        setSuccessCopyMessage('Copied!');
        }
     };

     const closeModalhandler = () => {
        inputOTPRef.current.input.value = '';
        // setPrivateKey('');
        // settextareaBlur("blur(8px)");
        // setcopytoClipboardButtonDisabled(true);
        setSuccessMessage('');
        setErrorMsg('');
        setOpenWalletPrivateKey(false);
     }
    

    const { TextArea } = Input;
    return (
        <div className="w-[850px] bg-primary-dark text-black relative">

            <button onClick={() => { closeModalhandler() }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-6">
                <XIcon className="text-white w-9" />
            </button>
            {/* <button onClick={() => { setOpenWalletPrivateKey(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-20">
                <MinusIcon className="text-white w-9" />
            </button> */}
            <div className="w-full flex justify-center items-center">
                <div className="mt-10">
                    <span className="battlelab-title">Battlelab's  </span>
                    <span className="battlelab-inner-title">  Wallet Private Key</span>
                </div>
            </div>
            <div className="flex flex-col items-center pb-12 gap-2 mt-3">
                <div className="flex flex-col items-center text-white">
                    <p className="text-[#bdc0c1] font-normal inner-font-text">
                        Type your Battlelab password to get your wallet private key
                    </p>
                </div>
                <form>
                <div className="flex flex-col items-center text-white mt-5">
                    <div>
                    <Input name="otp" type="text" 
                        className="w-[150px] h-10 bettlelab-password-input border-0 mr-3 bg-gradient-to-r from-[#FFF] to-[#FFF]"
                        ref = { ref => {
                            inputOTPRef.current = ref as Input;
                        }}
                        id="otp"
                        placeholder="Enter OTP"
                    />
                    <button
                        className="bg-primary-sky/30 mt-3 w-[150px] h-10 text-white font-bold rounded-sm border-2 border-primary-sky text-lg"
                        type='button'
                        onClick={ () => { onGenerateOTPHandler()}}
                   >
                        Generate OTP
                    </button>
                    </div>
                    <FormFeedback type="valid" style={{ color: 'green' }}>
                    { successMessage }
                    </FormFeedback>
                    <FormFeedback type="valid" style={{ color: 'red' }}>
                    { errorMsg }
                    </FormFeedback>
                    <button
                        className="bg-primary-sky/30 mt-3 w-[150px] h-10 text-white font-bold rounded-sm border-2 border-primary-sky text-lg"
                        type='button'
                        onClick={ () => { onValidateOTPHandler()}}
                   >
                        Validate OTP
                    </button>
                </div>
                </form>


                <div className="flex flex-col items-center text-white mt-4">
                    <TextArea
                        readOnly
                        name='copytoclipboard'
                        style={{
                            filter: textareaBlur
                        }}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        bordered={false}
                        value={privateKey}
                        className="w-100 textarea-blur rounded-none p-6  border-0 bg-gradient-to-r from-[#FFF] to-[#FFF] my-3"
                    />

                    <FormFeedback type="valid" style={{ color: 'white' }}>
                        { success_copy_message }
                        </FormFeedback>
                    <button  disabled={copytoClipboardButtonDisabled}
                        className="bg-primary-sky/30 mt-3 w-[300px] h-10 text-white font-bold rounded-sm border-2 border-primary-sky text-lg"
                        onClick={copyToClipboard}
                   >
                        Copy To Clipboard
                    </button>
                </div>

                <div className="flex flex-col items-center text-yellow  mt-5">
                    <p>Warning: Never disclose this key.</p>
                    <p>Anyone with your private keys can steal any assets held in your account.</p>
                </div>
            </div>
        </div>
    )
}

export default Block;