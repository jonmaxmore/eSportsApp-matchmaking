import React,{Children, createContext, useContext, useState} from "react";
import { node } from "prop-types";

const SearchMatchContext = createContext({});

export function useSearchTimerContext() {
    return useContext(SearchMatchContext);
}

function SearchTimerProvider({ children }: { children?: React.ReactNode; }) {
    const [searchTimer, setSearchTimerStatus] = useState(false);
    function setSearchTimerTrue() {
        setSearchTimerStatus(true);
    }

    function setSearchTimerFalse() {
        setSearchTimerStatus(false);
    }

    const SearchTimerStatus = {
        searchTimer,
        SetSearchTimer:{
            setSearchTimerTrue,
            setSearchTimerFalse
        }
    }

    return (
        <SearchMatchContext.Provider value={SearchTimerStatus}>
            {children}
        </SearchMatchContext.Provider>
    );
}

SearchTimerProvider.propTypes = {
    children: node.isRequired,
}

export default SearchTimerProvider;