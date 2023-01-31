import BorderButton from './borderbutton'

const Featured = (props) => {
    return (
        <div className='bg-black'>
            <div className='mx-auto max-w-sm md:max-w-screen-2xl py-0 md:py-20'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <h1 className='text-2xl md:text-5xl font-bold text-white mb-4 ml-0 md:ml-6'>Featured & Recommended</h1>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 py-14 px-0 md:px-28 bg-cover mt-10 bg-[url('/images/mockup/mock_bgnew.png')]">
                    <div>
                        <div className='hidden md:flex justify-between mb-4'>
                            <p className='text-lg text-white font-bold'>Featured</p>
                            <p className='text-lg text-white font-bold'>4 DAYS AGO</p>
                        </div>
                        <div className='space-y-8 md:bg-black md:bg-opacity-25 pt-80 px-6 md:pt-12 md:px-12'>
                            <p className='text-xl md:text-2xl text-white font-bold'>{props.label}</p>
                            <p className='text-white'>{props.description}</p>
                            <BorderButton label={"Buy now"} />
                        </div>
                    </div>
                    <div>
                        {/* <div className='w-[451px] h-[461px] absolute top-0 -mt-24 border'> */}
                        <img src="/images/mockup/mock_cha1.png" alt="" className='w-[400px] top-0 -mt-16 right-0 md:w-[550px] lg:w-[650px] absolute md:-mt-28 md:-right-12' />
                    </div>
                    {/* <div className='w-[600px] absolute top-0 -mt-28 ml-5 border'>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Featured