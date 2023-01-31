import React,{Children, createContext, useContext, useReducer, useState} from "react";
import { node } from "prop-types";
import { CreateContext } from "./WalletAction";

const defaultMatchState:any = {
    items: {
        walletBLCAmount: 0
    }
};

const DispatchContext = createContext<CreateContext>({
    dispatch: () => null,
    items: {
        walletBLCAmount: 0
    },
    _addWalletDetails: () => null,
});
  
export function useWalletDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error("useWalletDispatch must be used within a WalletProvider");
    }
    return useContext(DispatchContext);
}

const Reducer = (state:any, action:any) => {
        return {
            items: action.item
        }
}

function WalletProvider({ children }: { children?: React.ReactNode; }) {

    const [state, dispatch] = useReducer(Reducer, defaultMatchState);

    const addWalletDetails = (item:any) => {
        dispatch({item: item});
    }
    
    const DispatchValue: CreateContext = {
        items: state?.items,
        _addWalletDetails: addWalletDetails,
    }

    return (
            <DispatchContext.Provider value={DispatchValue}>
            {children}
            </DispatchContext.Provider>
    );
}

WalletProvider.propTypes = {
    children: node.isRequired,
}

export default WalletProvider;