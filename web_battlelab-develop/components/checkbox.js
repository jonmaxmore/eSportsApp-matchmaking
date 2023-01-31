const Checkbox = (props) => {
    const handleOnChange = props.handleOnChange
    return (
        <>
            {props.isChecked ?
                <button
                    className='w-7 h-7 bg-bl-primary rounded-sm flex flex-shrink-0 justify-center items-center'
                    onClick={handleOnChange}
                >
                    <img src="/images/login/checkmark.svg" alt="" className='' />
                </button>
                :
                <button
                    className='w-7 h-7 bg-transparent border-2 border-bl-primary rounded-sm flex flex-shrink-0 justify-center items-center'
                    onClick={handleOnChange}
                >
                </button>
         }

        </>
    )
}

export default Checkbox