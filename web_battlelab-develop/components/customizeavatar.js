import BorderButton from './borderbutton'

const CustomizeAvatar = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl pb-14 md:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                    <div className='hidden md:block md:col-span-3'>
                        <img src="/images/aboutus/feature2.svg" alt="" />
                    </div>
                    <div className='md:col-span-2 space-y-10 pr-6 pl-6 md:pl-0 md:pr-12 flex flex-col md:items-end'>
                        <p className='text-2xl md:text-5xl text-white font-bold text-center md:text-right'>
                            Customize avatar
                        </p>
                        <p className='text-white text-center md:text-right'>
                        Have a look at how your avatar is set, make changes and customize according to your style, mood or preference.
                        </p>
                        <div className='block md:hidden'>
                            <img src="/images/aboutus/feature2.svg" alt="" />
                        </div>
                        <BorderButton label={"GO TO MY PROFILE"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomizeAvatar