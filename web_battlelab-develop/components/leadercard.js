const LeaderCard = (props) => {
    return (
        <div>
            <div>
                {props.rank == "gold" &&
                    <div className='relative'>
                        <img src="/images/home/ic_gold_frame.svg" alt="" className='object-contain min-w-full min-h-full h-full' />
                        <img src="/images/home/ic_no1.png" alt="" className='absolute top-4 left-4' />
                        <img src="/images/home/ic_gold.png" alt="" className='absolute -top-1 -right-1' />
                        <img src="/images/home/female_cha_mock.png" alt="" className='absolute top-0 h-full p-10 ml-24' />
                    </div>

                }
                {props.rank == "silver" &&
                    <div className='relative'>
                        <img src="/images/home/ic_silver_frame.svg" alt="" className='object-contain min-w-full min-h-full h-full' />
                        <img src="/images/home/ic_no2.png" alt="" className='absolute top-4 left-4' />
                        <img src="/images/home/BadgeSilver.png" alt="" className='absolute -top-1 -right-1' />
                        <img src="/images/home/female_cha_mock.png" alt="" className='absolute top-0 h-full p-10 ml-24' />
                    </div>
                }
                {props.rank == "bronze" &&
                    <div className='relative'>
                        <img src="/images/home/ic_bronze_frame.svg" alt="" className='object-contain min-w-full min-h-full h-full' />
                        <img src="/images/home/ic_no3.png" alt="" className='absolute top-4 left-4' />
                        <img src="/images/home/ic_bronze.png" alt="" className='absolute -top-1 -right-1' />
                        <img src="/images/home/female_cha_mock.png" alt="" className='absolute top-0 h-full p-10 ml-24' />
                    </div>
                }
            </div>
            {/* <img src="/images/home/ic_silver_frame.svg" alt="" className='object-contain min-w-full min-h-full h-full' />
            <img src="/images/home/ic_bronze_frame.svg" alt="" className='object-contain min-w-full min-h-full h-full' /> */}

            <div className="bg-bl-hilight-dark mt-4 px-4 py-2 space-y-2">
                <div className="flex justify-between items-center">
                    <p className='font-bold text-white'>{props.name}</p>
                    <p className='text-3xl font-bold text-white'>{props.us}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className='text-2xl font-bold text-white w-9 h-9 bg-gradient-to-tr from-bl-dark to-bl-hilight rounded-md text-center'>{props.level}</p>
                    <p className='font-bold text-sm text-bl-secondary'>={props.blc}</p>
                </div>
            </div>
        </div>
    )
}

export default LeaderCard