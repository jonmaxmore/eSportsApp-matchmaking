import { useRouter } from "next/router"

const BorderButton = (props) => {
    const router = useRouter();
    return (
        <>
            {props.size == "large" ?
                <button className='bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark w-full md:w-80 md:px-10 py-4 md:py-5 rounded-md md:rounded-lg transition duration-300'>
                    <p className='text-md md:text-xl font-medium md:font-bold text-white'>{props.label}</p>
                </button>
                :
                // onClick={() => { router.push("/aboutus")}} 
                <button  className='bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark w-full md:w-80 md:px-10 py-4 md:py-5 rounded-md md:rounded-lg transition duration-300'>
                    <p className='text-md md:text-xl font-medium md:font-bold text-white'>{props.label}</p>
                </button>
            }
        </>

    )
}

export default BorderButton