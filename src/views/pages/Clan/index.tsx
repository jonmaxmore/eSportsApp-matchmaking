import { useState } from "react";
import ICClan from "@Image/Clan/ic-clan.png";
import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { Input, Pagination } from "antd";
import clsx from "clsx";
import ModalJoinClan from "./ModalJoinClan";
import "./style.css";

interface Props {
  ActivePop: (value: any) => void;
}
const Clan = ({ ActivePop }: Props) => {
  const [isOpenJoinClan, setOpenJoinClan] = useState(false);

  const clans = [
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 30,
    },
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 15,
    },
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 30,
    },
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 30,
    },
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 30,
    },
    {
      name: "Scol2pION",
      shortName: "SCPN",
      img: ICClan,
      leader: "SirDominic",
      member: 30,
    },
  ];

  return (
    <div className="flex justify-center bounceInLeft2 animated">
      <div className="w-full h-full bg-transparent mx-6 shadow-2xl shadow-black">
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
            backgroundColor: "transparent",
          }}
          className="relative "
        >
          <XIcon
            className="absolute top-3 w-9 h-9 right-3 cursor-pointer z-50"
            onClick={() => ActivePop("")}
          />

          <div className="bg-primary-dark w-full h-full pt-8">
            <p className="mb-6 text-center text-[#fff] text-2xl font-extrabold">
              CLAN
            </p>
            <div className="flex justify-beetween ">
              <div className="ml-10 w-2/3">
                <div
                  className="w-full overflow-y-auto overflow-x-clip shadow-2xl shadow-black"
                  style={{
                    height: "calc(100vh - 400px)",
                  }}
                >
                  <table className="w-full bounceInLeft2 animated2">
                    <thead className="sticky top-0 h-14 bg-[#19323F]">
                      <tr>
                        <th className="text-left font-bold"></th>
                        <th className="text-left font-bold">Name</th>
                        <th className="text-left font-bold">Leader</th>
                        <th className="font-bold">Member</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {clans.map((clan, index) => (
                        <tr
                          className="shadow-lg hover:bg-[#183442] hover:shadow-inner cursor-pointer"
                          onClick={() => ActivePop("clan_member")}
                        >
                          <td className="text-2xl font-bold text-center w-[80px]">
                            {index + 1}
                          </td>
                          <td>
                            <div className="flex items-center py-3">
                              <img
                                src={clan.img}
                                alt="clan"
                                className="w-[60px] h-[60px] rounded"
                              />
                              <span className="font-bold ml-6">
                                {clan.name}
                              </span>
                              <span className="font-bold ml-2 text-primary-green">
                                ({clan.shortName})
                              </span>
                            </div>
                          </td>
                          <td>
                            <p className="font-bold">{clan.leader}</p>
                          </td>
                          <td>
                            <p
                              className={`text-center font-bold text-primary-sky`}
                            >
                              <span
                                className={`${
                                  clan.member === 30
                                    ? "text-primary-sky"
                                    : "text-white"
                                }`}
                              >
                                {clan.member}
                              </span>
                              /30
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
                  </table>
                  <div className="text-center">
                    <p>No Data found</p>
                  </div>
                </div>
                {/* <div className="flex justify-center w-full mt-10 bounceInLeft2 animated2">
                  <Pagination defaultCurrent={1} total={50} />
                </div> */}
                <div
                  className="w-[360px] mt-10 h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer bounceInLeft2 animated2"
                  onClick={() => ActivePop("clan_create")}
                >
                  <p className="flex items-center text-center text-[#fff] text-lg font-extrabold ">
                    CREATE CLAN
                  </p>
                </div>
              </div>

              <div className="mx-10 w-1/3">
                <div className="h-16 flex justify-center items-center">
                  <Input
                    bordered={false}
                    prefix={<SearchIcon className="w-7 h-7" />}
                    placeholder="Search clan..."
                    className={clsx(
                      " text-white searchroom w-full h-full px-4  rounded-xl border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26] bounceInLeft2 animated3"
                    )}
                  />
                </div>

                <div
                  className="mt-10 bg-[#111C20] shadow-2xl shadow-black overflow-y-auto overflow-x-clip"
                  style={{
                    height: "calc(100vh - 330px)",
                  }}
                >
                  {/* CLAN Detail */}
                  {/* <div className="flex flex-col items-center justify-center py-6 px-9 gap-6 bounceInLeft2 animated3">
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

                    <div
                      className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
                      onClick={() => setOpenJoinClan(true)}
                    >
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                        JOIN CLAN
                      </p>
                    </div>
                    <ModalJoinClan
                      visible={isOpenJoinClan}
                      setVisible={setOpenJoinClan}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Clan;
