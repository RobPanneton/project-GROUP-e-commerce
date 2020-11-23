import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";
import { Errorpage } from "../errorpage/Errorpage";

export const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);

  // same code as other pages, could probably write a generic fetch
  // but who has time for that?
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
    try {
      const response = await fetch(`/products`);
      const json = await response.json();
      if (response.ok) {
        setCompany(json.data);
      } else {
        console.error("error retrieving products");
        return;  
      }
    } catch (error) {
      return;
    }
  };



  useEffect(() => {
    getCompany();
  }, []);

  // load all produts then filter by company
  // obviously more efficient to filter at backend
  // TODO
  // useEffect(() => {
    




  // }, [company]);





  return (
    <Wrapper>
      {company ? (
        <>
          <CompanyTop>
            <CompanyName>{company.name}</CompanyName>
            <CompanyCountry>{company.country}</CompanyCountry>
          </CompanyTop>
          <CompanyIframe>
            something else here... all their products? Their favicon logo?
          </CompanyIframe>
          <CompanyBottom>
            <CompanyUrl href={company.url}>{company.url}</CompanyUrl>
          </CompanyBottom>
        </>
      ) : <Errorpage/>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin: ${MARGINS.mobileSides} 16px;
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

const CompanyName = styled.span`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
`;
