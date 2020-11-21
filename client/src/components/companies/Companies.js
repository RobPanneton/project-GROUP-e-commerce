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
    <Wrapper>
      {companies && companies.length > 0 && (
        <>
          {companies.map((company) => {
            return (
              <CompanyWrapper
                onClick={() => redirectToCompanyPage(company._id)}
              >
                {company.name}
              </CompanyWrapper>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
`;

const CompanyWrapper = styled.button`
  width: 100%;
  color: ${COLORS.white};
  background-color: ${COLORS.black};
  border-radius: ${BORDER_RADIUS.mediumCorner};
  padding: 20px;
  margin-top: 10px;
  text-align: left;
`;
