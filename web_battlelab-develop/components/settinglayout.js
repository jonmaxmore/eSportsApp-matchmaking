const SettingLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-40 px-12">
                    <h1 className='text-4xl text-white font-bold mb-8'>Settings</h1>
                    <div className="grid grid-cols-3 md:gap-6 lg:gap-12">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingLayout