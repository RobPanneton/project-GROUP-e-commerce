import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";

export const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const history = useHistory();

  const getCompanies = async () => {
    try {
      const response = await fetch("/companies/");
      const json = await response.json();
      if (response.ok) {
        setCompanies(json.data);
      } else {
        // else bad response (not caught as error)
        console.error("error fetching companies");
        // send to error page             TODO
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const redirectToCompanyPage = (id) => {
    history.push(`/companies/${id}`);
  };

  return (
    <WrapperWrapper>
      <Wrapper>
        <ComaniesBanner>Brands</ComaniesBanner>
        {companies && companies.length > 0 && (
          <>
            {companies.map((company) => {
              return (
                <CompanyWrapper
                  key={company._id}
                  onClick={() => redirectToCompanyPage(company._id)}
                >
                  {company.name}
                </CompanyWrapper>
              );
            })}
          </>
        )}
      </Wrapper>
    </WrapperWrapper>
  );
};

const WrapperWrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  padding-bottom: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ComaniesBanner = styled.div`
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  margin: 25px 0;
  width: 100%;
`;

const CompanyWrapper = styled.button`
  width: 100%;
  border: none;
  color: ${COLORS.black};
  background-color: ${COLORS.white};
  border-radius: ${BORDER_RADIUS.mediumCorner};
  padding: 20px;
  margin: 10px;
  text-align: center;
  max-width: 300px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 770px) {
    width: 150px;
    height: 160px;
    margin: 20px;
  }
`;
