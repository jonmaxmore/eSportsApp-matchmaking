const BannerStats = (props) => {




    return (
        <div className='flex text-white'>
            <div className='flex flex-col items-center w-40 border-r border-white'>
                <p className='text-3xl md:text-5xl'>{props.users}</p>
                <p className='text-sm md:text-xl text-bl-gray'>Users</p>
            </div>
            <div className='flex flex-col items-center w-40 border-r border-white'>
                <p className='text-3xl md:text-5xl'>{props.games}</p>
                <p className='text-sm md:text-xl text-bl-gray'>Games</p>
            </div>
            <div className='flex flex-col items-center w-40'>
                <p className='text-3xl md:text-5xl'>{props.matches}</p>
                <p className='text-sm md:text-xl text-bl-gray'>Matches</p>
            </div>
        </div>
    )
}

export default BannerStats