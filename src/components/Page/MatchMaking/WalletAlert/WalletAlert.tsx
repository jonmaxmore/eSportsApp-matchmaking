import { XIcon } from "@heroicons/react/outline";

export const WalletBalanceAlert = (props: any) => {
    return (
        <div className="w-[600px] h-[350px] bg-primary-dark text-black">
            <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
                <p className="text-white text-center uppercase font-bold text-base">
                    Wallet Alert?
                </p>
                <button onClick={() => props.setWalletAlert(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
                    <XIcon className="text-white w-8" />
                </button>
            </div>
            <div className="flex flex-col items-center pt-12 gap-2">
                <div>
                    <p className="text-white text-center font-medium text-[16px] pl-10 pr-10">Sorry, the amount of swordz that you selected for wagering has exceeded the amount that you currently have in your wallet. 
                    Please refill your wallet with swordz first and then try again after. Thank you. </p>
                </div>
                <button
                    className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => props.setWalletAlert(false)}
                >
                    Okay
                </button>
            </div>
        </div>
    )
}