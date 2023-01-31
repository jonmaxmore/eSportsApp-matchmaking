import React, { useEffect, useState } from 'react';
import Style from './style.module.css'
import avatar from './img/avatar.png'
import shield1st from "./img/ic-ranking_Gold.png"
import shield2nd from "./img/ic-ranking_Silver.png"
import shield3rd from "./img/ic-ranking_Copper.png"
import BgCrad from "./img/bg-card.png"
import { XIcon } from '@heroicons/react/solid'
import { Carousel } from 'antd'
import clsx from 'clsx'
import NewAndEventsAPI from '@api/NewAndEventsAPI';
import RankingAPI from '@api/RankingAPI';
import moment from 'moment';
import ModalBuyBLC from './BuyBLC/ModalBuyBLC'
import "./style.css"
import { Modal, Badge, Drawer } from "antd";
import NewsReadMore from "@Components/Modal/NewsReadMore";


interface Props {
    ActivePop: (value: any) => void
}

interface PropsNews {
    img?: any;
    type: string;
    title: string;
    date: string;
}

const News = ({ ActivePop }: Props) => {

    const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: 4 });
    const [activeLeaderBoardData, setActiveLeaderBoardData] = useState({ type: "All" });
    const [newsEvents, setNewsEvents] = useState([]);
    const [newsEventBanners, setNewsEventBanners] = useState([]);
    const [leaderBoardRanks, setLeaderBoardRanks] = useState([]);
    const [isOpenBuyBLC, setOpenBuyBLC] = useState(false);
    const [FilterSelect, setFilterSelect] = useState('All');

    const [isOpenNewsReadMore, setOpenNewsReadMore] = useState(false);

    const [bannerData, setBannerData] = useState({});

    useEffect(() => { 
        getNewsAndEventsData(activeData);
        getNewsAndEventsBannerData();
        getLeaderBoardEarnings(activeLeaderBoardData);
      }, []) 

    const getNewsAndEventsData = (data: any) => {
        NewAndEventsAPI.getNewsAndEvents(data)
        .then(res => {
            if(res.data.success){
                setActiveData({ 
                    activePage: activeData.activePage, 
                    totalPage: res.data.totalCounts, 
                    limit: activeData.limit 
                });
                setNewsEvents(res.data.newsevents)
            } else {
                setNewsEvents([])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const getNewsAndEventsBannerData = () => {
        NewAndEventsAPI.getNewsAndEventBanners()
        .then(res => {
            if(res.data.success) {
                setNewsEventBanners(res.data.banners)
            } else {
                setNewsEventBanners([])
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    const getLeaderBoardEarnings = (data: any) => {
        RankingAPI.getLeaderBoardEarning(data)
        .then(res => {
            if(res.data.success){
                setLeaderBoardRanks(res.data.leaderboardrank)
            } else {
                setLeaderBoardRanks([])
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // const filterHandler = () => {
    //     setActiveLeaderBoardData({ type : "All"});
    //     const data = {
    //         type : activeLeaderBoardData.type
    //     }
    //     getLeaderBoardEarnings(data);
    //     setFilterSelect("All");
    // }
    // const filterMontlyHandler = () => {
    //     setActiveLeaderBoardData({ type : "Montly"});
    //     const data = {
    //         type : activeLeaderBoardData.type
    //     }
    //     getLeaderBoardEarnings(data);
    //     setFilterSelect("Montly");
    // }
    // const filterWeeklyHandler = () => {
    //     setActiveLeaderBoardData({ type : "Weekly"});
    //     const data = {
    //         type : activeLeaderBoardData.type
    //     }
    //     getLeaderBoardEarnings(data);
    //     setFilterSelect("Weekly");
    // }
    // const filterDailyHandler = () => {
    //     setActiveLeaderBoardData({ type : "Daily"});
    //     const data = {
    //         type : activeLeaderBoardData.type
    //     }
    //     getLeaderBoardEarnings(data);
    //     setFilterSelect("Daily");
    // }

    const onFilter = (type : string) => {
        setFilterSelect(type);
        setActiveLeaderBoardData({ type : type});
        const data = {
            type : type
        }
        getLeaderBoardEarnings(data);
    }

    const DummyNews: PropsNews[] = [
        {
            type: "news",
            title: "Overwatch 2: comming soon?",
            date: "04/01/2022"
        },
        {
            type: "event",
            title: "E-sport is now in bangkok",
            date: "04/01/2022"
        },
        {
            type: "news",
            title: "Overwatch 2: comming soon?",
            date: "04/01/2022"
        },
        {
            type: "news",
            title: "Overwatch 2: comming soon?",
            date: "04/01/2022"
        },
    ]

    const ActiveButton = (value: string) => {
        if (value === FilterSelect) {
            return "bg-primary-green text-black"
        } else {
            return "bg-black text-white"
        }
    }

    const CardNew = (data: any) => {
        return (
            <div className={clsx(Style.cardNews, "cursor-pointer")} onClick={ () => { 
                setBannerData(data)
                setOpenNewsReadMore(true)}}>
                <img src={BgCrad} className={clsx(" brightness-[0.6] object-fill object-center")} />
                <div className={clsx(Style.cardDetail, "bg-gradient-to-t from-black/80")}>
                    <span className={clsx(Style.cardtype, "uppercase text-[14px] font-[400]")}>{data.type.toUpperCase()}</span>
                    <div className={clsx(Style.cardNewsTitle, "leading-8 w-72 uppercase")}>
                        <span>{data.title_en}</span>
                    </div>
                    <span className={clsx(Style.cardDate, "mt-2")}>{moment(data.date).format('MM/DD/YYYY')}</span>
                </div>
            </div>
        )
    }

    const CardTop3 = ({ data, index }: any) => {
        const Shield = () => {
            if (index === 0) {
                return <img src={shield1st} className={clsx("object-contain")} />
            } else if (index === 1) {
                return <img src={shield2nd} className={clsx("object-contain")} />
            } else {
                return <img src={shield3rd} className={clsx("object-contain")} />
            }
        }
        const Color = () => {
            if (index === 0) {
                return "border-[#febc17]"
            } else if (index === 1) {
                return "border-[#9d9d9d]"
            } else {
                return "border-[#793f02]"
            }
        }

        return (
            <div className={clsx("w-full h-[100px] flex justify-between items-center p-[10px_20px] border-2", Color())}>
                <div className={"flex items-center gap-[10px]"}>
                    <div className={"relative"}>
                        <Shield />
                        <span className="a absolute top-0 left-[12px] text-white text-[30px] font-extrabold shadow-lg">{index + 1}</span>
                    </div>
                    <div className="relative">
                        <img src={data.UserDetail.avatar_image} className={"w-[40px] object-contain"} />
                        <div className="a absolute bottom-0 left-0 text-xs font-bold bg-primary-dark p-[2px] rounded-md">
                            {data.UserDetail.level}
                        </div>
                    </div>
                    <p className={"m-[auto_10px] text-[14px] font-bold text-center text-white"}>{data.UserDetail.avatar_unique_name}</p>
                </div>
                <div className={"flex flex-col items-end justify-center gap-[3px]"}>
                    <span className={"text-[20px] font-extrabold text-center text-white"}>{data.total_earning} $</span>
                    <span className={"text-[10px] font-extrabold text-center text-primary-green"}>= {data.total_earning } BLC</span>
                </div>
            </div>
        )
    }

    const CardRank = ({ data, index }: any) => {
        return (
            <div className={clsx("w-full h-[90px] flex justify-between items-center p-[10px_20px] ")}>
                <div className={"flex items-center gap-[10px]"}>
                    <span className=" text-white text-[30px] mx-4 font-extrabold shadow-lg">{index + 1}</span>
                    <div className="relative">
                        <img src={avatar} className={"w-[40px] object-contain"} />
                        <div className="a absolute bottom-0 left-0 text-xs font-bold bg-primary-dark p-[2px] rounded-md">
                            {data.UserDetail.level}
                        </div>
                    </div>
                    <p className={"m-[auto_10px] text-[14px] font-bold text-center text-white"}>{data.GameDetail.name_en}</p>
                </div>
                <div className={"flex flex-col items-end justify-center gap-[3px]"}>
                    <span className={"text-[20px] font-extrabold text-center text-white"}>{data.total_earning} $</span>
                    <span className={"text-[10px] font-extrabold text-center text-primary-green"}>= {data.total_earning } BLC</span>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full animated bounceInLeft "  >
            {/* animated jello */}
            {/* Carousel */}
            <div style={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'transparent',
            }} className={Style.bord}>
                <XIcon className='absolute top-[5%] w-9 h-9 right-[1.5%] cursor-pointer z-50' onClick={() => ActivePop('')} />
                <div className=' w-full h-[360px] overflow-y-visible relative mt-8 animated  bounceInLeft'>
                    <Carousel className={clsx(Style.Carousel, "h-[330px] ")} dots={{ className: Style.dots }} >
                        {newsEventBanners.map( (banner : any) => ( 
                            <div className={clsx(' w-full h-[330px] relative ')}>
                                <img src={banner.banner_cover_img} alt="" className="w-full h-full object-cover object-right" />
                                <div className="absolute top-0 w-full h-full   pl-[10px] pb-[40px] flex items-end">
                                    <div className="bg-gradient-to-t from-black/60 to-black/10 pb-5 pt-12 px-10">
                                        <p className="uppercase font-bold text-3xl text-white tracking-wide">
                                            {banner.title_en}
                                        </p>
                                        <p className="text-white mt-1 tracking-widest text-lg">
                                            {banner.description_en}
                                        </p>
                                        <div className=" w-56 h-14 mt-8 flex items-center uppercase justify-center text-lg tracking-wide font-bold text-white bg-[#203e4d] cursor-pointer border-4 rounded-md border-primary-sky"
                                              onClick={() =>{ 
                                                    setBannerData(banner)
                                                    setOpenNewsReadMore(true)
                                                    }}
                                              >
                                            read more 
                                        </div>
                                    </div>
                                </div>

                                <Modal
                                    visible={isOpenNewsReadMore}
                                    footer={null}
                                    title={null}
                                    closable={false}
                                    bodyStyle={{ padding: "0px" }}
                                    className="p-0 w-full h-auto flex items-center justify-center"
                                    >
                                    <NewsReadMore
                                        setOpenNewsReadMore={setOpenNewsReadMore}
                                        bannerData={bannerData}
                                    />
                                    </Modal>

                                <img src={banner.hero_img} alt="Character1" className="absolute -top-20 right-8 z-[999] overflow-visible h-[470px] object-contain  " />
                                {/* <img src={banner.hero_img} alt="Character1" className="absolute -top-20 right-8 z-[999] overflow-visible h-[470px] object-contain absuloteimg " /> */}
                                <div className="absolute bottom-[5px] z-[999] left-[420px] text-white flex">
                                    <p className="text-lg uppercase text-primary-sky">{banner.type}</p>
                                    <p className="ml-6 text-lg uppercase text-[#797978]">{moment(new Date(banner.date)).fromNow()}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <ModalBuyBLC visible={isOpenBuyBLC} setVisible={setOpenBuyBLC} />
            
            <div style={{
                height: 'full',
            }} className="flex justify-center overflow-hidden items-start w-full gap-[10px] ">
                <div className={clsx(Style.Rankbord, "animated2  bounceInLeft")}>
                    <div className={clsx(Style.tab)}>
                        <p className={Style.titel}>LEADERBOARD EARNING</p>
                        <div className={Style.Unit}>
                            <p>$ / </p>
                            <p className={Style.tabWord}> BLC</p>
                        </div>
                    </div>

                    {/* filter Option */}
                    <div className={clsx(Style.filter, "px-0 xl:px-10")}>
                        <p className={clsx("flex justify-between items-center font-bold p-[2px_30px] rounded-[20px] cursor-pointer duration-500", ActiveButton("All"))}
                            onClick={() => onFilter("All")}
                        >All time</p>
                        <p className={clsx("flex justify-between items-center font-bold p-[2px_30px] rounded-[20px] cursor-pointer duration-500", ActiveButton("Montly"))}
                            onClick={() => onFilter("Montly")}
                        >Montly</p>
                        <p className={clsx("flex justify-between items-center font-bold p-[2px_30px] rounded-[20px] cursor-pointer duration-500", ActiveButton("Weekly"))}
                            onClick={() => onFilter("Weekly")}
                        >Weekly</p>
                        <p className={clsx("flex justify-between items-center font-bold p-[2px_30px] rounded-[20px] cursor-pointer duration-500", ActiveButton("Daily"))}
                            onClick={() => onFilter("Daily")}
                        >Daily</p>
                    </div>

                    {/* Leader board */}
                    <div className={"w-full h-[calc(100vh-595px)] bg-[#0b151e] flex flex-col px-10 gap-[3px] justify-start items-center overflow-y-auto"}>
                        {leaderBoardRanks.length > 0 && leaderBoardRanks.map((item : any, index) => {
                            if (index < 3) {
                                return <CardTop3 key={index} data={item} index={index} />
                            } else {
                                return <CardRank key={index} data={item} index={index} />
                            }
                        })}
                        { !leaderBoardRanks ?
                            <div className='pt-5 text-[16px].'>
                                <p>No data found</p>
                            </div> 
                        :   null
                        }
                    </div>
                </div>

                <div className={clsx(Style.Rankbord, "animated3  bounceInLeft")}>
                    <div className={Style.tab}>
                        <p className={Style.titel}>NEWS & EVENTS</p>
                    </div>
                    <div className={Style.cardgrid}>
                        {newsEvents.length > 0 && newsEvents.map((values: any,index: number) => {
                            return (
                                <CardNew key={index} {...values} />
                            );
                        })}
                        {newsEvents.length == 0 && "Coming Soon"}
                        
                        {/* {DummyNews.map((item, index) => {
                            return (
                                <CardNew key={index} {...item} />
                            )
                        })} */}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default News;