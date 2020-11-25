import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {search} from "../../search"

export const SearchResults = ({searchString}) => {

    const shopInv = useSelector((state) => state?.user?.shopInv);

    let results = [];
    if (shopInv){
        results = search(searchString, shopInv)
    }
    

return (<div>Search Results {results.length}</div>)

}