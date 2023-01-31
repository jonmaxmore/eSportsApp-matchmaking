import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import ICClanUpload from "@Image/Clan/ic-clan-upload.png";
import { PlusIcon } from "@heroicons/react/outline";
import ModalDeleteClan from "./ModalDeleteClan";

interface Props {
  ActivePop: (value: any) => void;
}
const ClanEdit = ({ ActivePop }: Props) => {
  const [isOpenDelete, setOpenDelete] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full h-full bg-transparent mx-6 ">
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
            backgroundColor: "transparent",
          }}
          className="relative"
        >
          <XIcon
            className="absolute top-3 w-9 h-9 right-3 cursor-pointer z-50"
            onClick={() => ActivePop("clan_member")}
          />

          <div className="ralative bg-primary-dark shadow shadow-black border border-black w-full h-full pt-8">
            {/* Back Button */}
            <div className="absolute top-0 left-0 mt-8 ml-10">
              <div
                className="px-12 h-14 border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer"
                onClick={() => ActivePop("clan_member")}
              >
                <ArrowLeftIcon className="w-6 h-6" />
                <p className="flex items-center text-center text-[#fff] text-lg font-extrabold ml-2">
                  BACK
                </p>
              </div>
            </div>
            <p className="mb-6 text-center text-[#fff] text-2xl font-extrabold">
              LaWBreakel2{" "}
              <span className="text-lg text-primary-green">(LWBR)</span>
            </p>
            <div className="flex justify-beetween ">
              <div className="mx-10 w-1/3">
                <div
                  className="h-full bg-[#111C20] shadow-2xl shadow-black overflow-y-auto"
                  style={{
                    height: "calc(100vh - 280px)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center py-6 px-9 gap-6">
                    <img
                      alt="clan"
                      src={ICClanUpload}
                      className="w-full h-auto rounded"
                    />
                    <div className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer">
                      <PlusIcon className="w-7 h-10 text-white" />
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold ml-4">
                        CHANGE LOGO
                      </p>
                    </div>

                    <div className="flex w-full justify-between">
                      <p className="font-bold">File format accepted:</p>
                      <p>.png, .jpg, .gif</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="font-bold">Maximum file size:</p>
                      <p>25 MB</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="font-bold">File resolution:</p>
                      <p>500x500 pixel</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mr-10 w-2/3">
                <div
                  className="bg-[#111C20] shadow-2xl shadow-black overflow-y-auto"
                  style={{
                    height: "calc(100vh - 280px)",
                  }}
                >
                  <p className="h-[65px] px-6 leading-[65px] w-full border-l-[5px] border-solid border-primary-green bg-gradient-to-r from-primary-light to-primary-dark font-bold">
                    EDIT CLAN
                  </p>
                  {/* Edit Clan */}
                  <div className="flex flex-col gap-6 p-8">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between">
                        <p className="font-bold">DESCRIPTION</p>
                        <p>0/300</p>
                      </div>
                      <textarea
                        className="h-[135px] w-full border-l-[5px] border-solid border-primary-green p-3 text-white bg-[#2E2E2E]"
                        placeholder="Something cool about your clan..."
                      />
                    </div>
                    <div className="flex flex-col gap-5 w-2/3">
                      <p className="font-bold">MINIMUM TROPHIES TO JOIN</p>
                      <input
                        type="text"
                        className="h-[45px] w-full border-l-[5px] border-solid border-primary-green pl-3 text-white bg-[#2E2E2E]"
                        placeholder="Number"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-end w-full py-6 px-9 gap-6">
                    {/* BUTTONS */}
                    <div className="w-1/2 h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer">
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        SAVE CHANGES
                      </p>
                    </div>
                    <div
                      className="w-1/2 h-14 border-2 border-[#6bb8e7] flex justify-center bg-transparent rounded-md cursor-pointer"
                      onClick={() => setOpenDelete(true)}
                    >
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        DELETE CLAN
                      </p>
                    </div>
                    <ModalDeleteClan
                      visible={isOpenDelete}
                      setVisible={setOpenDelete}
                    />
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
export default ClanEdit;
