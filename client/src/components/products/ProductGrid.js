import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addItem } from "../../actions";

import { COLORS } from "../../constants";

import star from "../../assets/ecom-star.svg";

export const ProductGrid = ({ productArray, title, children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <ShopTitle>{title}</ShopTitle>
      {productArray.map((item, index) => {
        return (
          <ItemCard
            key={index}
            tabIndex="0"
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/shop/${item._id}`);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                history.push(`/shop/${item._id}`);
              }
            }}
          >
            <ItemContent>
              <ProductImage
                style={{
                  backgroundImage: `url(${item?.imageSrc})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <ProductPriceWrapper>
                  <ProductPrice>{item?.price}</ProductPrice>
                </ProductPriceWrapper>
              </ProductImage>
              <ProductName>{item?.name}</ProductName>

              <AddToCart
                disabled={!item?.numInStock}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addItem(item));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                  }
                }}
              >
                <CartBtnText>
                  {!item?.numInStock ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      out of stock{" "}
                      <span role="img" aria-label="sad face">
                        😞
                      </span>
                    </p>
                  ) : (
                    <p>Add to Cart</p>
                  )}
                </CartBtnText>
              </AddToCart>
            </ItemContent>
          </ItemCard>
        );
      })}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* padding-top: 108px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: -1;

  @media (min-width: 761px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1130px;
  }
`;

const ItemCard = styled.div`
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  width: 300px;
  height: 100%;
  margin: 11px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    width: 350px;
    height: 400px;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 11px 16px;
  height: 100%;
`;

const ProductImage = styled.div`
  border: 1px solid white;
  height: 190px;
  width: 190px;
  border-radius: 12px;
  text-align: center;
  position: relative;
`;

const ShopTitle = styled.h1`
  width: 100%;
  text-align: center;
  padding: 45px 0;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 46px;
  font-weight: 800;
`;

const ProductPriceWrapper = styled.div`
  background: url(${star});
  height: 111px;
  width: 111px;
  position: absolute;
  top: -20px;
  right: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(12deg);
`;

const ProductPrice = styled.span`
  color: ${COLORS.white};
  font-weight: 700;
`;

const ProductName = styled.span`
  padding: 11px 0;
  font-weight: 700;
  text-align: center;
  max-width: 250px;
  display: block;
  word-wrap: break-word;
  color: ${COLORS.navyBlue};
`;

const AddToCart = styled.button`
  margin-top: 11px;
  border: 3px solid ${COLORS.navyBlue};
  border-radius: 24px;
  padding: 12px 32px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${COLORS.babyBlue};
    color: ${COLORS.white};
    border: 3px solid ${COLORS.babyBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:disabled:hover {
    background: transparent;
    border: 3px solid ${COLORS.navyBlue};
  }
`;

const CartBtnText = styled.span`
  font-weight: 700;
  font-size: 18px;
`;
