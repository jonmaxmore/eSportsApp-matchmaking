const LeaderCell = (props) => {
    return (
        <div className={`${props.rank == 'gold' ? 'border-3 border-bl-gold' : props.rank == 'silver' ? 'border-3 border-bl-silver' : props.rank == 'bronze' && 'border-3 border-bl-bronze'} bg-bl-hilight px-4 py-2 md:px-8 md:py-6 flex justify-between`}>
            <div className='flex items-center gap-2 md:gap-4'>
                <div className='border w-8 h-8 md:w-10 md:h-10 flex items-center justify-center'>
                    <p className='text-lg md:text-2xl font-bold text-white'>{props.num}</p>
                </div>
                <div className='relative'>
                    <img src="/images/home/mock_cha_avatar.png" alt="" className='w-16 md:w-24' />
                    <p className='text-xs md:text-lg font-bold text-white w-5 h-5 md:w-7 md:h-7 bg-gradient-to-tr from-bl-dark to-bl-hilight rounded-md text-center absolute -bottom-1 right-1'>
                        {props.level}
                    </p>
                </div>
                <p className='text-xs md:text-lg font-bold text-white'>{props.name}</p>
            </div>
            <div className='text-right space-y-1'>
                <p className='text-md md:text-2xl font-bold text-white'>{props.us}</p>
                <p className='text-[8px] md:text-sm font-bold text-bl-secondary'>={props.blc}</p>
            </div>
        </div>
    )
}

export default LeaderCell