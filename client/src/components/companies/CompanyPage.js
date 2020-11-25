import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { ProductGrid } from "../products/ProductGrid";
import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";

export const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([])
  const [showInStock, setShowInStock] = useState(false)

  const shopInv = useSelector((state) => state?.user?.shopInv);
  const productsInStock = shopInv ? shopInv.filter(p => p.numInStock > 0) : []

  const toggleShowInStock = () => {
    setShowInStock(!showInStock);
  }

  useEffect(() => {
    if (showInStock){
      setDisplayProducts(products.filter(p => p.numInStock > 0))
    } else {
      setDisplayProducts(products)
    }

  }, [showInStock, products]);


  const getCompany = async () => {
    try {
      const response = await fetch(`/companies/${id}`);
      const json = await response.json();
      if (response.ok) {
        setCompany(json.data);
      } else {
        console.error("company not found");
        return;
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  useEffect(() => {
    if (company && shopInv) {
      setProducts(shopInv.filter(p => p.companyId === company._id));
    }
  }, [company, shopInv]);

  return (
    <Wrapper>
      {company ? (
        <>
          <CompanyTop>
            <CompanyNameAndCountry>
            {/* <CompanyName href={company.url} target="_blank" >{company.name}</CompanyName> */}
            <CompanyCountry>{company.country}</CompanyCountry>
            </CompanyNameAndCountry>
            <ButtonContainer>
      <ShowInStock onClick={toggleShowInStock}>{showInStock? "show all" : "show in stock only"}</ShowInStock>
      </ButtonContainer>
          </CompanyTop>
          <ProductGrid
          productArray={displayProducts}
          title={company.name}
        ></ProductGrid>
          <CompanyBottom>
          </CompanyBottom>
        </>
      ) : null}
    </Wrapper>
  );
};


const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides} ;
  margin-right: ${MARGINS.mobileSides} ;
`;

const CompanyTop = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

const CompanyNameAndCountry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start
`;

const CompanyCountry = styled.div``;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ShowInStock = styled.button`
  border: none;
  border-radius: 24px;
  padding: 5px 10px;
  margin: 0;
  font-size: x-small;
  font-weight: 600;
  outline: none;

  @media (min-width: 768px) {
    padding: 10px 10px;
    font-size: small;
  }
`;

const CompanyBottom = styled.div``;

const CompanyName = styled.a`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  color: ${COLORS.black};
  font-size: xx-large;
`;
