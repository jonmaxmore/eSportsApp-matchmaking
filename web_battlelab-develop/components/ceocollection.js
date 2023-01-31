import CEOCollectionCard from './ceocollectioncard'

const CEOCollection = (props) => {
    return (
        <div className='bg-black overflow-hidden'>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-no-repeat bg-center p-20 space-y-6">
                <h1 className="text-5xl font-bold text-white text-center">CEO collection details</h1>
                <p className='text-lg text-white text-center'>We are constantly working on Battlelab to bring out the best experience for the users with new updates and features such as</p>
                <div className='grid grid-cols-3 justify-items-center'>
                    <CEOCollectionCard title={"CEO Suit"} description={"Professionalism , Investor with battlelab logo welcome to our family."}/>
                    <CEOCollectionCard title={"Pant"} description={"Simple but Smart and you don't have to wash it because you can't."}/>
                    <CEOCollectionCard title={"Shoes"} description={"Back to the future ,Walking to new era leaving footprints heading into the future."}/>
                    <CEOCollectionCard title={"Phone"} description={"The beginning of all ,contain all the data of Battlelab Platform in the device."}/>
                    <CEOCollectionCard title={"Mask"} description={"Equality , Representative of gamers."}/>
                    {/* <CEOCollectionCard title={"Special NFT"} description={"collect 5 nfts to redeem the exclusive item."}/> */}
                </div>
            </div>
        </div>
    )
}

export default CEOCollection