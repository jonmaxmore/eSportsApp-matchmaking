import React, { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/outline";
import { useSearchMatchContext } from "@Context/SearchMatch";
import GameAPI from "@api/MatchmakingAPI";

type Price = {
  dollar: string;
  blc: string;
};

interface Props {
  SetShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  amount: any;
  setAmount: any;
  dollarToBLC: any;
  setDollarToBLC: any;
  updateBetAmountHandler: any;
}

const Single = ({
  SetShowPopup,
  amount,
  setAmount,
  dollarToBLC,
  setDollarToBLC,
  updateBetAmountHandler,
}: Props) => {
  const navigate = useNavigate();
  const { searchMatch, SetSearch }: any = useSearchMatchContext();

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      betAmounts: [],
    }
  );

  useEffect(() => {
    getGameDetailAndBetAmount();
  }, []);

  const getGameDetailAndBetAmount = () => {
    GameAPI.getBetAmounts()
      .then((res) => {
        if (res.data.success) {
          setState({
            betAmounts: res.data.betAmounts,
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selected, setSelected] = useState<number>(-1);
  function Searching() {
    SetSearch.setSearchMatchTrue();
    navigate(`/home`);
  }

  const onClickSetAmountAndIndex = (amount: any, index: any, blc: any) => {
    setSelected(index);
    setAmount(amount);
    setDollarToBLC(blc);
  };

  const setAmountHandler = () => {
    SetShowPopup(false);
    updateBetAmountHandler();
  };

  const CardPriceBronze = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#b46f1f] shadow-[0px_0px_4px_2px] shadow-[#b46f1f]/70";

    const blc = Number(data.dollar) ;

    return (
      <div
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer ")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar} USD
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} BLC
        </p>
      </div>
    );
  };

  const CardPriceSliver = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#acacac] shadow-[0px_0px_4px_2px] shadow-[#acacac]/70";

    const blc = Number(data.dollar) ;

    return (
      <div
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar} USD
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} BLC
        </p>
      </div>
    );
  };

  const CardPriceGold = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#edab04] shadow-[0px_0px_4px_2px] shadow-[#edab04]/70";

    const blc = Number(data.dollar) ;

    return (
      <div
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar} USD
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} BLC
        </p>
      </div>
    );
  };

  return (
    <div className="w-[650px] h-[520px] bg-primary-dark text-black">
      {/* 1 */}

      <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
        <p className="text-white text-center uppercase font-bold text-base">
          confirm with this amount?
        </p>
        <button
          onClick={() => SetShowPopup(false)}
          className="bg-primary-light rounded-md p-1 absolute top-3 right-4"
        >
          <XIcon
            className="text-white w-8"
            onClick={() => {
              SetShowPopup(false);
            }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center pt-12 gap-2">
        <div>
          <span className="font-medium text-white/60">
            {" "}
            Select the amount of BLC you would like to bet for the game{" "}
          </span>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4 mt-8 mb-8">
          {state.betAmounts.map((data: any, index: number) => {
            if (index < 3) {
              return (
                <div key={`amount` + index}>{CardPriceBronze(data, index)}</div>
              );
            } else if (index < 6) {
              return (
                <div key={`amount` + index}>{CardPriceSliver(data, index)}</div>
              );
            } else {
              return (
                <div key={`amount` + index}>{CardPriceGold(data, index)}</div>
              );
            }
          })}
        </div>
        <button
          disabled={selected == -1}
          className={clsx(
            "bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
            selected == -1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={() => setAmountHandler()}
        >
          confirm
        </button>
        <button
          className="mt-2 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
          onClick={() => SetShowPopup(false)}
        >
          CANCEL
        </button>
      </div>

      {/* 2 */}

      
    </div>
  );
};

export default Single;
