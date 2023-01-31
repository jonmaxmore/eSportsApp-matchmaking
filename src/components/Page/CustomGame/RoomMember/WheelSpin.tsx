import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'
import { ReactComponent as SelectCone } from '@Image/Matchmaking/SelectCone3.svg';

const data = [
    { option: '0' },
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
]

const Wheelspin = () => {
    const [mustSpin, setMustSpin] = useState(true);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [stopspin, setStopspin] = useState(false);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setStopspin(false);
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }


    return (
        <div className="w-[1100px] h-[600px] flex flex-col items-center relative">
            <div className="absolute top-20 ">
                <div className=" 2xl:scale-[1.3] relative -rotate-[45deg] ">



                    <div className='absolute rotate-[45deg] -top-16  -right-6   w-full h-[500px]  z-50'>
                        <div className='w-[430px] h-[430px] top-20 right-0 left-4 bottom-0 absolute z-10   shadow-[0_0px_55px_2px_rgba(88,175,230,0.6)] rounded-full'></div>

                        <div className="w-full h-full relative">

                            <div className=' absolute top-[10px] left-[70px] z-40'>

                                <SelectCone className='w-[320px] stroke-primary-green stroke-10 brightness-125' />
                                <div className="absolute top-6 left-0 right-4 flex justify-center items-center text-white font-semibold text-[45px]">
                                    {stopspin ? prizeNumber : ''}
                                </div>
                            </div>
                            <div className='clip w-full h-full absolute top-0 left-0 scale-[1]  rotate-180 '>

                            </div>


                        </div>

                    </div>
                    <div className='delete brightness-125 '>
                        <Wheel
                            radiusLineWidth={0}
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}
                            outerBorderWidth={16}
                            outerBorderColor={'#95be4c'}
                            textColors={["#ffffff"]}
                            backgroundColors={["#14354d", "#0f2737"]}
                            innerBorderColor={"#95be4c"}
                            innerRadius={10}
                            innerBorderWidth={16}
                            spinDuration={0.4}
                            perpendicularText={true}
                            onStopSpinning={() => {
                                setMustSpin(false);
                                setStopspin(true);
                            }}
                        />

                    </div>


                </div>
            </div>

            <button onClick={handleSpinClick} className=" py-3 w-80 border-2  absolute bottom-8 2xl:-bottom-12 border-primary-sky bg-[#2a3c4b] text-white text-center uppercase font-bold">
                start
            </button>

        </div>
    )
}

export default Wheelspin;