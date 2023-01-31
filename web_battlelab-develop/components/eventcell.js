const EventCell = (props) => {

    return (
        <tr className={`${props.highlight && 'bg-bl-hilight'} transition duration-300` }>
            <td className='text-xs md:text-base text-bl-secondary p-2'>[{props.category}]</td>
            <td className='text-xs md:text-base text-white'>{props.headline}</td>
            <td className='text-xs md:text-base text-white'>{props.date}</td>
        </tr>
    )
}

export default EventCell