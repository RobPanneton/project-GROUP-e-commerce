import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addItem, decreaseStock, populateInventory } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../reducers/user-reducer";

import { COLORS } from "../../constants";
import { FooterFilter } from "./FooterFilter";
import { Loader } from "../Loader";

export const Shop = () => {
  const dispatch = useDispatch();

  const shopInv = useSelector((state) => state?.user?.shopInv);

  const getItems = async () => {
    try {
      const response = await fetch(`/products`);
      const json = await response.json();
      dispatch(populateInventory(json.data));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Wrapper>
        {!shopInv && <Loader />}
        {shopInv &&
          shopInv.map((item) => {
            return (
              <ItemCard key={item?._id}>
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
                    onClick={() => {
                      dispatch(addItem(item));
                    }}
                  >
                    <CartBtnText>Add to Cart</CartBtnText>
                  </AddToCart>
                  {!item?.numInStock && (
                    <p
                      style={{
                        padding: "10px 0",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      out of stock 😞
                    </p>
                  )}
                </ItemContent>
              </ItemCard>
            );
          })}
      </Wrapper>
      <FooterFilter />
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 108px;
`;

const ItemCard = styled.div`
  margin: 11px;
  border: 1px solid #eaeaee;
  border-radius: 12px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 11px 16px;
`;

const ProductImage = styled.div`
  border: 1px solid white;
  height: 190px;
  width: 190px;
  border-radius: 12px;
  text-align: center;
`;

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 11px 11px;
`;

const ProductPrice = styled.span`
  color: red;
  font-weight: 800;
`;

const ProductName = styled.span`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
`;

const AddToCart = styled.button`
  margin-top: 11px;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
`;

const CartBtnText = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
