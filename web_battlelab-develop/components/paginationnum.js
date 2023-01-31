const PaginationNum = (props) => {
    return (
        <>
            {props.style == "current" ?
                <div className='w-9 h-9 border bg-bl-primary border-bl-hilight hover:bg-bl-primary-dark flex justify-center items-center transition duration-300'>
                    <p className='text-lg font-bold text-gray-700'>{props.num}</p>
                </div>
                :
                <div className='w-9 h-9 border border-bl-primary bg-bl-hilight hover:bg-bl-hilight-dark flex justify-center items-center transition duration-300'>
                    <p className='text-lg font-bold text-gray-400'>{props.num}</p>
                </div>
            }
        </>
    )
}

export default PaginationNum