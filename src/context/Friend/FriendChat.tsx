import React,{Children, createContext, useContext, useReducer, useState} from "react";
import { node } from "prop-types";
import { CreateContext } from "./FriendChatAction";

const defaultMatchState:any = {
    items: {
        friendsMessageListCount: 0
    }
};

const DispatchContext = createContext<CreateContext>({
    dispatch: () => null,
    items: {
        friendsMessageListCount: 0
    },
    _addFriendChatDetails: () => null,
});
  
export function useFriendChathDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error("useSpinDispatch must be used within a SpinProvider");
    }
    return useContext(DispatchContext);
}

const Reducer = (state:any, action:any) => {
        return {
            items: action.item
        }
}

function FriendChatProvider({ children }: { children?: React.ReactNode; }) {

    const [state, dispatch] = useReducer(Reducer, defaultMatchState);

    const addFriendChatDetails = (item:any) => {
        dispatch({item: item});
    }
    
    const DispatchValue: CreateContext = {
        items: state?.items,
        _addFriendChatDetails: addFriendChatDetails,
    }

    return (
            <DispatchContext.Provider value={DispatchValue}>
            {children}
            </DispatchContext.Provider>
    );
}

FriendChatProvider.propTypes = {
    children: node.isRequired,
}

export default FriendChatProvider;