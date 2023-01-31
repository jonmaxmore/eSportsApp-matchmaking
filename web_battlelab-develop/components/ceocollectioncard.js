const CEOCollectionCard = (props) => {
    return (
        <div className='flex flex-col justify-center items-center space-y-4 w-64 my-10'>
            <ChatSystem title={props.title} />
            <h1 className='text-lg font-bold text-white text-center uppercase'>{props.title}</h1>
            <p className="text-white text-center text-sm">{props.description}</p>
        </div>
    )
}

const ChatSystem = (props) => {
    return (
        <>
            {
                props.title == "CEO Suit" &&
                <div className="bg-[url('/images/nfts/suite.png')] bg-65% bg-center bg-no-repeat w-40 h-40 transition duration-300"></div>
            }
            {
                props.title == "Pant" &&
                <div className="bg-[url('/images/nfts/pant.png')] bg-65% bg-center bg-no-repeat w-40 h-40 transition duration-300"></div>
            }
            {
                props.title == "Shoes" &&
                <div className="bg-[url('/images/nfts/shoes.png')] bg-65% bg-center bg-no-repeat w-40 h-40 transition duration-300"></div>
            }
            {
                props.title == "Phone" &&
                <div className="bg-[url('/images/nfts/mobile.png')] bg-65% bg-center bg-no-repeat w-40 h-40 transition duration-300"></div>
            }
            {
                props.title == "Mask" &&
                <div className="bg-[url('/images/nfts/mask.png')] bg-65% bg-center bg-no-repeat w-40 h-40 transition duration-300"></div>
            }
            {
                props.title == "Special NFT" &&
                <div className="bg-[url('/images/aboutus/avatar_inactive.svg')] hover:bg-[url('/images/aboutus/avatar_active.svg')] bg-65% bg-center bg-no-repeat w-32 h-32 bg-bl-inactive hover:bg-bl-active rounded-full transition duration-300"></div>
            }
        </>
    )
}

export default CEOCollectionCard
