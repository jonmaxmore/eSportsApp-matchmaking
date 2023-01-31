import LeaderCard from './leadercard'
import LeaderCell from './leadercell'
import PaginationNum from './paginationnum'

const Leaderboard = (props) => {
    return (
        <div className='bg-black pb-8 md:pb-28'>
            <div className='mx-auto max-w-screen-2xl'>
                <h1 className='text-2xl md:text-5xl font-bold text-white py-10 ml-6'>Leaderboard Earning</h1>
                <div className="bg-bl-dark">
                    <div className='px-6 md:px-12 pt-4 md:py-12'>
                        <div className='grid grid-cols-4 justify-items-center mb-2 md:mb-6 pb-6 border-b-2 border-bl-hilight'>
                            <a href="#" className='text-sm md:text-2xl text-bl-secondary font-bold'>All time</a>
                            <a href="#" className='text-sm md:text-2xl text-white font-bold'>Monthly</a>
                            <a href="#" className='text-sm md:text-2xl text-white font-bold'>Weekly</a>
                            <a href="#" className='text-sm md:text-2xl text-white font-bold'>Daily</a>
                        </div>
                        {/* <div className="grid grid-cols-3 gap-x-14">
                            <LeaderCard {...props.leaderboarddata[0]} rank={"gold"} />
                            <LeaderCard {...props.leaderboarddata[1]} rank={"silver"} />
                            <LeaderCard {...props.leaderboarddata[2]} rank={"bronze"} />
                        </div> */}
                    </div>
                    {/* <div className='grid grid-rows-5 grid-flow-col px-12 gap-x-14 gap-y-4 pb-8'>
                        <LeaderCell {...props.leaderboarddata[3]} />
                        <LeaderCell {...props.leaderboarddata[4]} />
                        <LeaderCell {...props.leaderboarddata[5]} />
                        <LeaderCell {...props.leaderboarddata[6]} />
                        <LeaderCell {...props.leaderboarddata[7]} />
                        <LeaderCell {...props.leaderboarddata[8]} />
                        <LeaderCell {...props.leaderboarddata[9]} />
                        <LeaderCell {...props.leaderboarddata[10]} />
                        <LeaderCell {...props.leaderboarddata[11]} />
                        <LeaderCell {...props.leaderboarddata[12]} />
                    </div> */}
                    <div className='text-2xl justify-center text-center text-white font-bold'><p>No data found</p></div>
                    <div className='flex justify-center pt-10 pb-16'>
                        {/* <div className='flex items-center gap-5'>
                            <div className='w-9 h-9 border border-bl-primary bg-bl-hilight hover:bg-bl-hilight-dark flex justify-center items-center transition duration-300'>
                                <img src="/images/home/ic_previous.png" alt="" className='w-3' />
                            </div>
                            <PaginationNum num={1} style={"current"} />
                            <PaginationNum num={2} />
                            <PaginationNum num={3} />
                            <PaginationNum num={4} />
                            <PaginationNum num={5} />
                            <div className='w-9 h-9 border border-bl-primary bg-bl-hilight hover:bg-bl-hilight-dark flex justify-center items-center transition duration-300'>
                                <img src="/images/home/ic_next.png" alt="" className='w-3' />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard