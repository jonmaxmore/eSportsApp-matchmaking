const SettingToggle = (props) => {
    return (
        <div className='border-b border-neutral-500 ml-28 py-8 mr-28 flex justify-between items-center'>
            <div className='space-y-4'>
                <p className='text-white font-bold'>{props.label}</p>
                <p className='text-white'>{props.description}</p>
            </div>
            <div>
                {/* <!-- Toggle A --> */}
                <div className="flex items-center justify-center w-full">

                    <label
                        htmlFor="toogleA"
                        className="flex items-center cursor-pointer"
                    >
                        {/* <!-- toggle --> */}
                        <div className="relative">
                            {/* <!-- input --> */}
                            <input id="toogleA" type="checkbox" className="sr-only" />
                            {/* <!-- line --> */}
                            <div className="line w-10 h-4 bg-bl-inactive rounded-full shadow-inner"></div>
                            {/* <!-- dot --> */}
                            <div className="dot absolute w-6 h-6 bg-neutral-300 rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>

                    </label>

                </div>
            </div>

            <style jsx>{`
                /* Toggle A */
                input:checked ~ .dot {
                    transform: translateX(100%);
                    background-color: #ffffff;
                }
                input:checked ~ .line {
                    background-color: #58AFE6;
                }
                `}
            </style>
        </div>
    )
}

export default SettingToggle