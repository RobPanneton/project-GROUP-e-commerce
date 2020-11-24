import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";

export const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);

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

  const getProducts = async () => {
    const filterSettings = { company: company.name };
    try {
      const response = await fetch(
        `/filter/${encodeURI(JSON.stringify(filterSettings))}`
      );
      const json = await response.json();
      if (response.ok) {
        setProducts(json.data);
      } else {
        console.error("error retrieving products");
        return;
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  useEffect(() => {
    if (company) {
      getProducts();
    }
  }, [company]);


  if (products) {
    console.log(products)
  }

  return (
    <Wrapper>
      {company ? (
        <>
          <CompanyTop>
            <CompanyName href={company.url}>{company.name}</CompanyName>
            <CompanyCountry>{company.country}</CompanyCountry>
          </CompanyTop>
          <CompanyIframe>
            todo
          </CompanyIframe>
          <CompanyBottom>
            <CompanyUrl href={company.url}>{company.url}</CompanyUrl>
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

`;

const CompanyCountry = styled.div``;

const CompanyIframe = styled.div`
  display: flex;
  justify-content: center;
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  padding: 90px;
  margin: 10px 0;
  border-radius: ${BORDER_RADIUS.mediumCorner};
`;

const CompanyBottom = styled.div``;

const CompanyUrl = styled.a`
  font-size: small;
  text-decoration: none;
  color: ${COLORS.black};
`;

const CompanyName = styled.a`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  color: ${COLORS.black};
  font-size: xx-large;
`;
