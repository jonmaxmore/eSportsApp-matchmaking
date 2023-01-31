import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Input } from "antd";

const DeleteAccount = ({
  setDeleteAccountPopup,
  onDeleteAcount,
  deleteValidationMsg,
}: any) => {
  const [avatareName, setAvatareName] = useState("");

  return (
    <div className="w-[650px] bg-primary-dark text-black">
      <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
        <p className="text-white text-center uppercase font-bold text-base">
          Delete Account?
        </p>
        <button
          onClick={() => {
            setDeleteAccountPopup(false);
          }}
          className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4"
        >
          <XIcon className="text-white w-9" />
        </button>
      </div>
      <div className="flex flex-col items-center py-12 gap-2">
        <div className="flex flex-col items-center text-center">
          <div>
            <span className="text-[#bdc0c1] font-normal ">
              Are you sure you want to delete the account of ‘avatar name’ from
              Battlelab system?
            </span>
          </div>
          <div>
            <span className="text-[#bdc0c1] font-normal ">
              If you wish to proceed please type in your avatar name and click
              confirm to delete your account.
            </span>
          </div>
          <div>
            <Input
              name="avatarName"
              type="text"
              className="w-[250px] h-10 bettlelab-password-input mt-5"
              id="avatarName"
              placeholder="Avatar Name"
              onChange={(e: any) => setAvatareName(e.target.value)}
            />
            {deleteValidationMsg !== "" && (
              <div style={{ marginLeft: "0%", color: "red" }}>
                {deleteValidationMsg}
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
          onClick={() => {
            onDeleteAcount(avatareName);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
