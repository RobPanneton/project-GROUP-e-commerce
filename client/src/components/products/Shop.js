import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

import { FooterFilter } from "./FooterFilter";
import { ProductGrid } from "./ProductGrid";
import { COLORS, BORDER_RADIUS, MARGINS } from "../../constants";
import { Loader } from "../Loader";

export const Shop = () => {
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(15);
  const [productArr, setProductArr] = React.useState(null);
  const shopInv = useSelector((state) => state?.user?.shopInv);

  useEffect(() => {
    setProductArr(
      shopInv?.filter((item, index) => {
        if (index >= startIndex && index < endIndex) {
          return true;
        }
      })
    );
  }, [shopInv, startIndex]);
  console.log({ productArr: productArr });
  return (
    <>
      <Spacer />
      {!productArr && <Loader />}
      {productArr && (
        <ProductGrid productArray={productArr} title="SHOP 🛍️">
          <PageSelectorContainer>
            <PreviousButton
              onClick={(e) => {
                e.stopPropagation();
                if (shopInv.length - 15 > startIndex) {
                  setStartIndex(startIndex - 15);
                  setEndIndex(endIndex - 15);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={startIndex < 14}
            >
              Previous
            </PreviousButton>
            <PageButton
              onClick={(e) => {
                e.stopPropagation();
                if (shopInv.length - 15 > startIndex) {
                  setStartIndex(startIndex + 15);
                  setEndIndex(endIndex + 15);
                  window.scrollTo(0, 0);
                }
              }}
            >
              Next
            </PageButton>
          </PageSelectorContainer>
        </ProductGrid>
      )}
      <FooterFilter />
    </>
  );
};

const PageSelectorContainer = styled.div`
  width: 100%;
  padding: 45px 0 120px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.div`
  height: ${MARGINS.mobileTop};
  width: 100%;
  background: transparent;
  z-index: -99999999;
`;

const PageButton = styled.button`
  border-radius: ${BORDER_RADIUS.smallCorner};
  color: ${COLORS.white};
  border: none;
  background: ${COLORS.babyBlue};
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
  width: 110px;
`;

const PreviousButton = styled(PageButton)`
  margin-right: 33px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
