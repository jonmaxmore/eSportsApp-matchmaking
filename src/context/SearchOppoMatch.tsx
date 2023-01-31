import React,{Children, createContext, useContext, useState} from "react";
import { node } from "prop-types";

const SearchMatchContext = createContext({});

export function useSearchOppoMatchContext() {
    return useContext(SearchMatchContext);
}

function SearchOppoProvider({ children }: { children?: React.ReactNode; }) {
    const [searchOppoMatch, setSearchOppoMatch] = useState(false);
    function setSearchOppoMatchTrue() {
        setSearchOppoMatch(true);
    }

    function CancelOppoSearch() {
        setSearchOppoMatch(false);
    }

    const SearchStatus = {
        searchOppoMatch,
        SetSearchOppo:{
            setSearchOppoMatchTrue,
            CancelOppoSearch
        }
    }

    return (
        <SearchMatchContext.Provider value={SearchStatus}>
            {children}
        </SearchMatchContext.Provider>
    );
}

SearchOppoProvider.propTypes = {
    children: node.isRequired,
}

export default SearchOppoProvider;