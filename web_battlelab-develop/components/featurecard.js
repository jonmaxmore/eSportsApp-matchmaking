const FeatureCard = (props) => {
    return (
        <div className='flex flex-col justify-center items-center space-y-2 md:space-y-4 px-2 md:px-8 lg:px-14 xl:px-28 my-10'>
            <ChatSystem title={props.title} />
            <h1 className='text-sm md:text-lg font-bold text-white text-center uppercase pt-2 md:pt-0'>{props.title}</h1>
            <p className="text-white text-center text-[10px] lg:px-0 md:text-sm">{props.description}</p>
        </div>
    )
}

const ChatSystem = (props) => {
    return (
        <>
            {
                props.title == "CHAT SYSTEM" &&
                <div className="bg-[url('/images/aboutus/chat_inactive.svg')] hover:bg-[url('/images/aboutus/chat_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
            {
                props.title == "CLAN SYSTEM" &&
                <div className="bg-[url('/images/aboutus/clan_inactive.svg')] hover:bg-[url('/images/aboutus/clan_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
            {
                props.title == "MATCHMAKING" &&
                <div className="bg-[url('/images/aboutus/match_inactive.svg')] hover:bg-[url('/images/aboutus/match_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
            {
                props.title == "MARKET" &&
                <div className="bg-[url('/images/aboutus/market_inactive.svg')] hover:bg-[url('/images/aboutus/market_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
            {
                props.title == "RANKING" &&
                <div className="bg-[url('/images/aboutus/rank_inactive.svg')] hover:bg-[url('/images/aboutus/rank_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
            {
                props.title == "AVATAR" &&
                <div className="bg-[url('/images/aboutus/avatar_inactive.svg')] hover:bg-[url('/images/aboutus/avatar_active.svg')] bg-65% bg-center bg-no-repeat w-[82px] h-[82px] md:w-32 md:h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
        </>
    )
}

export default FeatureCard
