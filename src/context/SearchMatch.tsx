import React,{Children, createContext, useContext, useReducer, useState} from "react";
import { node } from "prop-types";
import { CreateContext } from "./SeachMatchAction";

const defaultMatchState:any = {
    items: {
        team_id: 0,
        team_room_id: "", 
        is_team_fulfilled: false,
        betAmount: 0,
        amountToBlc: 0,
        game_id: "",
        gameName: "",
        imageUrl: "",
        gameIcon: "",
        numberOfPlayerPerTeam: 0,
    }
};

const SearchMatchContext = createContext({});

const DispatchContext = createContext<CreateContext>({
    dispatch: () => null,
    items: {
        team_id: 0,
        team_room_id: "", 
        is_team_fulfilled: false,
        betAmount: 0,
        amountToBlc: 0,
        game_id: "",
        gameName: "",
        imageUrl: "",
        gameIcon: "",
        numberOfPlayerPerTeam: 0,
    },
    _addSearchMatchDetails: () => null,
});
  
export function useSearchMatchContext() {
    return useContext(SearchMatchContext);
}

export function useSearchMatchDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error("useSpinDispatch must be used within a SpinProvider");
    }
    return useContext(DispatchContext);
}

const Reducer = (state:any, action:any) => {
    if(action.type == "TEAM"){
        // console.log("TEAM",action.item);
        return {
            items: action.item
        }
    }
}

function SearchProvider({ children }: { children?: React.ReactNode; }) {
    const [searchMatch, setSearchMatch] = useState(false);

    const [state, dispatch] = useReducer(Reducer, defaultMatchState);

    const addSearchMatchDetailsHandler = (item:any) => {
        dispatch({ type: "TEAM", item: item});
    }
    
    const DispatchValue: CreateContext = {
        items: state?.items,
        _addSearchMatchDetails: addSearchMatchDetailsHandler,
    }

    function setSearchMatchTrue() {
        setSearchMatch(true);
    }

    function CancelSearch() {
        setSearchMatch(false);
    }

    const SearchStatus = {
        searchMatch,
        SetSearch:{
            setSearchMatchTrue,
            CancelSearch
        }
    }

  

    return (
        <SearchMatchContext.Provider value={SearchStatus}>
            <DispatchContext.Provider value={DispatchValue}>
            {children}
            </DispatchContext.Provider>
        </SearchMatchContext.Provider>
    );
}

SearchProvider.propTypes = {
    children: node.isRequired,
}

export default SearchProvider;