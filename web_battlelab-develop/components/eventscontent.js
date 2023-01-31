import EventCell from './eventcell'

const EventsContent = (props) => {
    return (
        <table className="table-auto w-full">
            <tbody >
                {props.eventsdata.map((data, index) => (
                    <EventCell {...data} key={index}/>
                ))}
            </tbody>
        </table >
    )
}

export default EventsContent