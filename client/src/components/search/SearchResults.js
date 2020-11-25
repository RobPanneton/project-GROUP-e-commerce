import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { search } from "../../search";
import { MARGINS } from "../../constants";

export const SearchResults = ({ searchString }) => {
  const shopInv = useSelector((state) => state?.user?.shopInv);
  const [results, setResults] = useState(null)
  const { searchTerm } = useParams();

  useEffect(() => { 
    if (shopInv) {
    const searchString = decodeURI(searchTerm)
    const searchResults = search(searchString, shopInv)
    console.log(searchString)
    setResults(searchResults)
 }}, [])

  return (<Wrapper>
      {results && 
      <>
      Search Results {results.map(r => <TestOnly text={r.name}/>)} 
      </>}
      </Wrapper>);
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
`;

const TestOnly = ({text}) => {
    return <div>{text}</div>
}