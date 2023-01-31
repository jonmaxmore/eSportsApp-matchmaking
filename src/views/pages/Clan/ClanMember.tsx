import { useState } from "react";
import ICClan from "@Image/Clan/ic-clan.png";
import { XIcon } from "@heroicons/react/solid";
import { Menu, Pagination, Popover, List } from "antd";
import { ChevronDownIcon, PencilAltIcon } from "@heroicons/react/outline";
import ModalClanApplication from "./ModalClanApplication";
import ModalLeaveClan from "./ModalLeaveClan";
import ModalMemberInfo from "./ModalMemberInfo";
import ModalEditIntroduction from "./ModalEditIntroduction";

interface Props {
  ActivePop: (value: any) => void;
}
const ClanMember = ({ ActivePop }: Props) => {
  const [isOpenClanApplication, setOpenClanApplication] = useState(false);
  const [isOpenLeaveClan, setOpenLeaveClan] = useState(false);
  const [isOpenEditIntroduction, setOpenEditIntroduction] = useState(false);
  const [isOpenMemberInfo, setOpenMemberInfo] = useState(false);
  const [memberInfo, setMemberInfo] = useState<any>({});

  const members = [
    {
      name: "Kumachan",
      rank: "Leader",
      status: "Online",
      introduction: "",
      isMe: true,
    },
    {
      name: "II_Herold_II",
      rank: "Member",
      status: "League of legends",
      introduction: "Hi, I am Dominic, I love play game",
    },
    {
      name: "XUndertakerX",
      rank: "Member",
      status: "Online",
      introduction: "Hi, I am Dominic, I love play game",
    },
    {
      name: "LiquidXSnake",
      rank: "Member",
      status: "Offline",
      introduction: "Hi, I am Dominic, I love play game",
    },
    { name: "Kumachan", rank: "Leader", status: "Online", introduction: "" },
    {
      name: "II_Herold_II",
      rank: "Member",
      status: "League of legends",
      introduction: "Hi, I am Dominic, I love play game",
    },
    {
      name: "XUndertakerX",
      rank: "Member",
      status: "Online",
      introduction: "Hi, I am Dominic, I love play game",
    },
    {
      name: "LiquidXSnake",
      rank: "Member",
      status: "Offline",
      introduction: "Hi, I am Dominic, I love play game",
    },
  ];

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
            onClick={() => ActivePop("clan")}
          />

          <div className="bg-primary-dark shadow shadow-black border border-black w-full h-full pt-8">
            <p className="mb-6 text-center text-[#fff] text-2xl font-extrabold">
              LaWBreakel2
            </p>
            <div className="flex justify-beetween ">
              <div className="mx-10 w-2/3">
                <div
                  className="w-full overflow-y-auto  shadow-2xl shadow-black"
                  style={{
                    height: "calc(100vh - 350px)",
                  }}
                >
                  <table className="w-full">
                    <thead className="z-10 sticky top-0 h-14 bg-[#19323F]">
                      <tr>
                        <th className="px-2 text-left font-bold"></th>
                        <th className="px-2 text-left font-bold">Name</th>
                        <th className="px-2 text-left font-bold">Rank</th>
                        <th className="px-2 text-left font-bold">Status</th>
                        <th className="px-2 text-left font-bold">
                          Introduction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <Popover getPopupContainer={trigger => trigger}
                          content={
                            <div className="relative p-2 bg-[#10191D] text-white shadow-2xl shadow-black">
                              <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                Chat
                              </p>
                              <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                View profile
                              </p>
                              <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                Add as friend
                              </p>
                              <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                Follow
                              </p>
                              <p className="mx-2 py-2 cursor-pointer">
                                Remove from clan
                              </p>
                            </div>
                          }
                          trigger="hover"
                          placement="rightTop"
                        >
                          <tr className="relative shadow-lg h-[86px] cursor-pointer hover:bg-[#183442] hover:shadow-inner">
                            <td className="px-2 text-2xl font-bold text-center w-[80px]">
                              {index + 1}
                            </td>
                            <td>
                              <p className="font-bold text-pri">
                                {member.name}
                              </p>
                            </td>
                            <td className="px-2">
                              {member.rank === "Leader" ? (
                                <p className="font-bold p-2 px-4 rounded-full bg-[#0D1519]">
                                  {member.rank}
                                </p>
                              ) : (
                                <Popover getPopupContainer={trigger => trigger}
                                  content={
                                    <div className="relative p-2 bg-[#10191D] text-white shadow-2xl shadow-black">
                                      <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                        Promote to leader
                                      </p>
                                      <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                        Promote to Vice Leader
                                      </p>
                                      <p className="mx-2 py-2 border-b border-[#373E41] cursor-pointer">
                                        Promote to Elder
                                      </p>
                                      <p className="mx-2 py-2 cursor-pointer">
                                        Remain as Member
                                      </p>
                                    </div>
                                  }
                                  trigger="click"
                                  placement="bottom"
                                >
                                  <p className="flex items-center font-bold p-2 px-4 rounded-full bg-[#0D1519]">
                                    {member.rank}
                                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                                  </p>
                                </Popover>
                              )}
                            </td>
                            <td className="px-2">
                              <p
                                className={`${
                                  member.status === "Online"
                                    ? "text-primary-sky"
                                    : member.status === "Offline"
                                    ? "text-primary-gray"
                                    : "text-primary-green"
                                }`}
                              >
                                {member.status}
                              </p>
                            </td>
                            <td
                              className="px-2 relative"
                              onClick={() => {
                                setMemberInfo(member);
                                setOpenMemberInfo(true);
                              }}
                            >
                              {member.introduction ? (
                                <p className="">{member.introduction}</p>
                              ) : (
                                <p className="text-primary-gray">
                                  No introduction
                                </p>
                              )}
                            </td>
                            {member.isMe && (
                              <div
                                className="absolute right-0 top-0 mt-8 w-10 h-10 flex items-center justify-center rounded bg-gradient-to-br from-primary-sky to-primary-light shadow-2xl shadow-black"
                                onClick={() => setOpenEditIntroduction(true)}
                              >
                                <PencilAltIcon className="w-6 h-6" />
                              </div>
                            )}
                          </tr>
                        </Popover>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center w-full mt-10">
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </div>
              <ModalMemberInfo
                visible={isOpenMemberInfo}
                setVisible={setOpenMemberInfo}
                member={memberInfo}
              />
              <ModalEditIntroduction
                visible={isOpenEditIntroduction}
                setVisible={setOpenEditIntroduction}
              />

              <div className="mx-10 w-1/3">
                <div
                  className="bg-[#111C20]  shadow-2xl shadow-black overflow-y-auto"
                  style={{
                    height: "calc(100vh - 280px)",
                  }}
                >
                  {/* CLAN Detail */}
                  <div className="flex flex-col items-center justify-center py-6 px-9 gap-6">
                    <img
                      alt="clan"
                      src={ICClan}
                      className="w-[120px] h-[120px] rounded"
                    />
                    <p className="text-white text-lg font-bold">
                      Clan name
                      <span className="text-primary-green ml-3">(SCPN)</span>
                    </p>
                    <hr />
                    <div className="flex w-full justify-between">
                      <p>Clan leader</p>
                      <p className="font-bold">SirDominic</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p>Members</p>
                      <p className="font-bold text-primary-sky">30/30</p>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                      <p>Description</p>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam ut quam imperdiet, auctor dui vitae, accumsan
                        nulla. Vestibulum pharetra feugiat purus in bibendum.
                        Pellentesque ullamcorper, quam eu vestibulum malesuada,
                        ante lectus fermentum felis, vitae vulputate ante elit
                        ut magna.
                      </p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p>Clan type</p>
                      <p className="font-bold">For anyone</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p>Trophy</p>
                      <p className="font-bold">10 or more</p>
                    </div>

                    {/* BUTTONS */}
                    <div
                      className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
                      onClick={() => ActivePop("clan_edit")}
                    >
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        EDIT CLAN
                      </p>
                    </div>

                    <div
                      className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center bg-transparent rounded-md cursor-pointer"
                      onClick={() => setOpenClanApplication(true)}
                    >
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        CLAN APPLICATION
                        <span className="ml-5 text-base rounded-full w-[22px] h-[22px] text-center leading-[22px] bg-[#FF4B00]">
                          3
                        </span>
                      </p>
                    </div>
                    <ModalClanApplication
                      visible={isOpenClanApplication}
                      setVisible={setOpenClanApplication}
                    />

                    <div
                      className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
                      onClick={() => setOpenLeaveClan(true)}
                    >
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        LEAVE CLAN
                      </p>
                    </div>
                    <ModalLeaveClan
                      visible={isOpenLeaveClan}
                      setVisible={setOpenLeaveClan}
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
export default ClanMember;
