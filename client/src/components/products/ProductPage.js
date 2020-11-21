import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { addItem } from "../../actions";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);

  const getItem = async () => {
    try {
      const response = await fetch(`/products/${id}`);
      const json = await response.json();
      setItem(json.data);
    } catch (error) {
      return;
    }
  };

  const getCompany = async () => {
    try {
      const response = await fetch(`/companies/${item.companyId}`);
      const json = await response.json();
      setCompany(json.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    getCompany();
    console.log(item);
  }, [item]);

  return (
    <Wrapper>
      {company && (
        <>
          <ItemCard key={item._id}>
            <ItemContent>
              <ProductName>{item.name}</ProductName>
              <CatWrapper>
                <CatButton>{item.category}</CatButton>
              </CatWrapper>
              <ProductImage
                style={{
                  backgroundImage: `url(${item.imageSrc})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></ProductImage>

              <AddToCart
                onClick={() => {
                  dispatch(addItem(item));
                }}
              >
                <CartBtnText>Add to Cart</CartBtnText>
              </AddToCart>
              <StockAndPrice>
                <Stock>{item.numInStock} in stock</Stock>
                <Price>Price: {item.price}</Price>
              </StockAndPrice>
              <SoldByWrapper>
                <SoldBy>Sold by: {company.name}</SoldBy>
                <CompanyName></CompanyName>
              </SoldByWrapper>
            </ItemContent>
          </ItemCard>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 108px;
`;

const ItemCard = styled.div`
  border: 1px solid white;
  border-radius: 12px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 11px 16px;
`;

const CatWrapper = styled.div`
  position: relative;
`;

const CatButton = styled.button`
  position: absolute;
  border: none;
  padding: 6px 12px;
  font-weight: 600;
  left: -136px;
  top: 17px;
`;

const ProductImage = styled.div`
  border: 1px solid white;
  height: 190px;
  width: 190px;
  border-radius: 12px;
  text-align: center;
  margin-top: 12px;
`;

const ProductName = styled.span`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
`;

const AddToCart = styled.button`
  margin-top: 23px;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
`;

const CartBtnText = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const StockAndPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 23px;
`;

const Stock = styled.span``;

const Price = styled.span``;

const SoldByWrapper = styled.div`
  margin-top: 32px;
`;

const SoldBy = styled.span``;

const CompanyName = styled.button``;
