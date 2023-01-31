

import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import "./style.css"

interface Props {
    setOpenImage: (show: boolean) => void;
    postFileURL:any;
    fileType:any
}

const ViewImage = ({ setOpenImage,postFileURL,fileType }: Props) => {
    return (
        <div className="w-[850px] bg-primary-dark text-black">
            <div>
                <button onClick={() => { setOpenImage(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 cursor-pointer absolute top-3 right-6">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div>
            {fileType === 'mp4' ? <video
              id="videoPreviw"
              src={postFileURL}
              autoPlay
              playsInline
              loop
              controls
              controlsList="nodownload"
              style={{marginTop: '60px'}}
              ></video> : <img src={postFileURL} alt="viewImage" className="m-[10px] h-100 w-100" />}
            </div>
        </div>
    )
}

export default ViewImage;