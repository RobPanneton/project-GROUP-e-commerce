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
<ComaniesBanner>Partner Companies</ComaniesBanner>
    <Wrapper>
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

  padding-bottom: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

`;

const ComaniesBanner = styled.div`
  text-align: left;
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 10px;

`;


const CompanyWrapper = styled.button`
  width: 100%;
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  border-radius: ${BORDER_RADIUS.mediumCorner};
  padding: 20px;
  margin-top: 10px;
  text-align: left;
  max-width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  @media (min-width: 770px) {
  max-width: 200;
  margin: 10px;
}

`;
