const Button = (props) => {
    return (
        <>
            {props.size == "large" ?
                <button className='bg-bl-primary border-2 border-bl-primary hover:bg-bl-primary-dark w-full md:w-80 md:px-10 py-4 md:py-5 rounded-lg transition duration-300'>
                    <p className='text-md md:text-xl font-medium md:font-bold text-white'>{props.label}</p>
                </button>
                :
                <button className='bg-bl-primary border-2 border-bl-primary hover:bg-bl-primary-dark w-full md:w-80 md:px-10 py-4 md:py-5 rounded-lg transition duration-300'>
                    <p className='text-md md:text-xl font-medium md:font-bold text-white'>{props.label}</p>
                </button>
            }
        </>
    )
}

export default Button