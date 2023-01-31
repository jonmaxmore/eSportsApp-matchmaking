import { Disclosure } from '@headlessui/react'

const FaqsCell = (props) => {
    return (
        <Disclosure as="div" className={"space-y-8 pb-6"}>
            {({ open }) => (
                <>
                    <Disclosure.Button className="text-white font-bold text-sm md:text-base bg-bl-hilight-dark px-6 py-2 md:py-4 border-l-4 border-bl-secondary pb w-full flex items-center justify-between">
                        <p>{props.question}</p>
                        {open ?
                            <img src="/images/contact/ic_dropdown.svg" alt="" />
                            :
                            <img src="/images/contact/ic_dropup.svg" alt="" />
                            
                        }
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-white text-sm pl-6 leading-loose md:leading-normal">
                        {props.answer}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default FaqsCell