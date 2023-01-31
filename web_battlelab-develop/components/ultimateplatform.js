const UltimateHeadline = (props) => {
    return (
        <div className='flex flex-col items-center'>
            <div className="flex gap-3 items-center">
                <img src="/images/aboutus/ic_play_battlelab.svg" alt="" className='w-6 h-6 md:w-10 md:h-10' />
                <p className='text-xl md:text-2xl lg:text-3xl font-bold text-white'>{props.headline1}</p>
            </div>
            <p className='text-xl md:text-2xl lg:text-3xl font-bold text-white'>{props.headline2}</p>
        </div>
    )
}

const UltimatePlatform = (props) => {
    return (
        <div className='bg-black'>
            <div className="mx-auto max-w-screen-2xl py-16 md:py-28 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className='flex flex-col space-y-10 md:space-y-6 md:-mt-8 lg:-mt-16'>
                        <UltimateHeadline headline1={"ULTIMATE PLATFORM"} headline2={"FOR E-SPORT"} />
                        <div className='block md:hidden'>
                            <img src="/images/aboutus/mock_image1.png" alt="" />
                        </div>
                        <p className='text-white text-left md:text-sm lg:text-base md:text-center md:px-4 lg:px-12'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati molestias quod adipisci, atque vero, eveniet corporis vitae iusto dolorum quisquam, harum expedita inventore amet sed excepturi dolores accusamus reprehenderit consequatur.
                        </p>
                    </div>

                    <div className='hidden md:block'>
                        <img src="/images/aboutus/mock_image1.png" alt="" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-8 md:-mt-8 lg:-mt-16">
                    <div className='hidden md:block'>
                        <img src="/images/aboutus/mock_image2.png" alt="" />
                    </div>
                    <div className='flex flex-col space-y-10 md:space-y-6 md:mt-10'>
                        <UltimateHeadline headline1={"BET WITH"} headline2={"CRYPTOCURRENCY"} />
                        <div className='block md:hidden'>
                            <img src="/images/aboutus/mock_image2.png" alt="" />
                        </div>
                        <p className='text-white text-left md:text-sm lg:text-base md:text-center md:px-4 lg:px-12 leading-loose md:leading-none'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UltimatePlatform