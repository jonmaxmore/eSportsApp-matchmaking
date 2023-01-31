import { Disclosure } from '@headlessui/react'
import { useEffect, useReducer } from 'react';
import FaqAPI from '../pages/api/FaqAPI';
import FaqsCell from './faqscell'

const Faqs = (props) => {

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            faqs: []
        }
    );

    useEffect(() => {
        getAllFaqs();
    }, []);

    const getAllFaqs = () => {
        FaqAPI.fetchFaqs()
            .then(res => {
                if (res.data.success) {
                    setState({
                        faqs: res.data.faqCategories
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    // console.log("faq's", state.faqs);

    return (
        <div className="bg-black" id="faq_section">
            <div className="mx-auto max-w-screen-2xl px-6 pb-6 md:pb-20">
                <h1 className='text-2xl md:text-5xl font-bold text-white pb-0 md:pb-8'>Frequently Asked Questions</h1>

                <div className='bg-bl-darker md:px-28 py-8 md:py-14'>
                    <p className='text-white pb-8'>
                        Couldn’t find an answer to your question? Please send a message to <a href="mailto:support@battlelab.gg" className='text-bl-secondary underline'>support@battlelab.gg</a>
                    </p>
                        {state.faqs.length > 0 &&
                            state.faqs.map((faqCategory, key) => {
                                return (
                                    <div key={key}>
                                    <p className="font-bold text-white pb-4 uppercase text-xs md:text-base text-center md:text-left">{faqCategory.category_name_en}</p>
                                    {
                                        faqCategory.Faq.map((faq, index) => {
                                            return (
                                                <FaqsCell key={index} question={faq.question_en}
                                                    answer={faq.answer_en}
                                                />
                                            )
                                        })
                                    }
                                    </div>
                                );
                            })
                        }
                        {state.faqs.length == 0 &&
                            <div>
                            <p className="font-bold text-center text-white">No data found</p>
                            </div>
                        }
                </div>


            </div>
        </div>
    )
} 

export default Faqs