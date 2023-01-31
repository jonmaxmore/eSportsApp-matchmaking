import React, { useEffect, useReducer, useState } from 'react';
import "./styles.css";

import { XIcon } from '@heroicons/react/solid';
import { Collapse, Select } from 'antd';
import { LeftSquareTwoTone, SettingOutlined } from '@ant-design/icons';
import { CaretRightOutlined } from '@ant-design/icons';
import FaqAPI from "../../../api/FaqAPI";
import { FaQuestionCircle, FaSquare } from 'react-icons/fa';

const { Panel } = Collapse;
const { Option } = Select;






interface Props {
    ActivePop: (value: any) => void
}




const Faq = ({ ActivePop }: Props) => {

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            firstFaq: {
                Faq: []
            },
            faqCategories: [],
        }
    );

    useEffect(() => {
        getFaqs();
    }, [])

    const getFaqs = () => {
        FaqAPI.fetchFaqs()
            .then(res => {

                if (res.data.success) {
                    console.log("faq",res.data);
                    setState({
                        firstFaq: res.data.faqFirst,
                        faqCategories: res.data.faqCategories,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const text = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const text2 = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const text3 = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const text4 = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const text5 = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const text6 = `
    Lorem ipsun dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nistrud. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `;

    const genExtra = () => (
        <SettingOutlined
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    return (
        <div className="flex justify-center animated bounceInLeftfaq">
            <div className="w-full h-full bg-transparent revers-rounded drop-shadow-[0px_0px_15px_rgba(0,0,0,0.7)] "  >
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                    backgroundColor: 'transparent',
                }} className="relative ">
                    <XIcon className='absolute -top-6 w-9 h-9 right-3 cursor-pointer z-50' onClick={() => ActivePop('')} />



                    <div className="  h-full ">
                        <p className="mt-10 text-center text-[#fff] text-3xl font-semibold animated bounceInLeftfaq"> FREQUENTLY ASKED QUESTIONS</p>
                        <p className="mt-6 text-center text-[#b0b4b4] text-base font-light animated bounceInLeftfaq">
                            Couldn't find an answer to your question? Please send a message to
                            <a className=""> </a>
                            <a className="underline decoration-[#94bd4b] text-base text-[#94bd4b] ">info@battlelab.com</a>
                        </p>
                        <p className="ml-16 my-6 text-left text-[#fff] text-base font-semibold animated2 bounceInLeftfaq"> {state.firstFaq.category_name_en}</p>
                        <div style={{
                            height: 'calc(100vh - 320px)'
                        }} className="setting-scroll w-full overflow-y-auto animated3 bounceInLeftfaq">
                            <div className="flex justify-center">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIconPosition="right"
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
                                    className="site-collapse-custom-collapse w-full px-16 space-y-6 bg-[#0c1c22]">
                                    {state.firstFaq.Faq.map((faq:any, i:any) => {
                                        return (
                                            <Panel header={faq.question_en} key={parseInt(i) + 1} className="site-collapse-custom-panel 
                                                bg-gradient-to-r from-[#142835] to-[#0b151e] ">
                                                <div className="flex justify-center text-left ml-6 ">
                                                    <p className="text-[#b0b4b4] text-base my-6">{faq.answer_en}</p>
                                                </div>
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            </div>

                            {state.faqCategories.map((faq:any, i:any) => {
                                return (
                                    <div>
                                        <p className="ml-16 my-6 text-left text-[#fff] text-base font-semibold">{faq.category_name_en}</p>
                                        <div className="flex justify-center">
                                            <Collapse
                                                bordered={false}
                                                defaultActiveKey={['1']}
                                                expandIconPosition="right"
                                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
                                                className="site-collapse-custom-collapse w-full px-16 space-y-6 bg-[#0c1c22]">
                                                {faq.Faq.map((faqQue:any, i:any) => {
                                                    return (
                                                        <Panel key={i} header={faqQue.question_en} className="site-collapse-custom-panel 
                                                        bg-gradient-to-r from-[#142835] to-[#0b151e] ">
                                                                <p className="text-[#b0b4b4] text-sm my-6 mx-6">{faqQue.answer_en}</p>
                                                        </Panel>
                                                    );
                                                })}
                                            </Collapse>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};
export default Faq;
