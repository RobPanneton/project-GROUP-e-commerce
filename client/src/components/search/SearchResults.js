import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { search } from "../../search";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";
import { ProductGrid } from "../products/ProductGrid";

export const SearchResults = () => {
  const shopInv = useSelector((state) => state?.user?.shopInv);
  const [results, setResults] = useState([]);
  const { searchTerm } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (shopInv) {
      const searchString = decodeURI(searchTerm);
      const searchResults = search(searchString, shopInv);
      setResults(searchResults);
      console.log(searchString);
    }
  }, [searchTerm]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {results && (
        <ProductGrid
          productArray={results}
          title="Search Results"
        ></ProductGrid>
      )}
      {results.length < 1 && (
        <NoSearchContainer>
          <NoSearchTitle>No results found...</NoSearchTitle>
          <p>Go to the shop to find awesome products</p>
          <GoToShopButton onClick={() => history.push("/shop")}>
            Go to shop
          </GoToShopButton>
        </NoSearchContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${MARGINS.mobileTop} 0px;
`;

const NoSearchContainer = styled.div`
  text-align: center;
`;

const NoSearchTitle = styled.h1`
  padding: 30px;
`;

const GoToShopButton = styled.button`
  border: none;
  background: transparent;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 21px;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 50px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  padding: 10px 17px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${COLORS.babyBlue};
    color: ${COLORS.white};
  }
`;
