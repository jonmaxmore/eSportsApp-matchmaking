const ButtonSmall = (props) => {
    return (
        <>
            <button className={`${props.style == 'dark' ? `bg-bl-dark hover:bg-bl-darker` : `bg-bl-hilight hover:bg-bl-primary-dark`} w-36 border-bl-primary border-2 py-1 rounded-sm text-xs font-bold text-white transition duration-300`}>{props.label}</button>
        </>
    )
}

export default ButtonSmall