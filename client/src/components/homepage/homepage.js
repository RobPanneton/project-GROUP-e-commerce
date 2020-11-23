import React from "react";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";

import hero from "../../assets/ecom-hero.svg";
import { useHistory } from "react-router-dom";

export const Homepage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <HeroImage src={hero} alt="Display watch" />
      <HeroHeading>
        Watch your health with <span>HEALTHwatch</span>
      </HeroHeading>
      <ShopNowButton onClick={() => history.push(`/shop`)}>
        SHOP NOW
      </ShopNowButton>
      <CompaniesButton onClick={() => history.push(`/companies`)}>
        See our partner companies
      </CompaniesButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
`;

const HeroImage = styled.img`
  filter: drop-shadow(30px 30px 30px rgba(77, 126, 218, 0.2));
  z-index: -1;
  padding-top: 10px;
  @media (min-width: 761px) {
    width: 450px;
  }
`;

const HeroHeading = styled.h1`
  color: ${COLORS.darkestBlue};
  font-weight: 500;
  text-align: center;
  font-size: 25px;
  line-height: 40px;
  padding: 20px;

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
  }
`;

const ShopNowButton = styled.button`
  color: ${COLORS.navyBlue};
  border: 3px solid ${COLORS.navyBlue};
  background: transparent;
  padding: 12px 25px;
  font-size: 21px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  font-weight: 700;
  margin-bottom: 20px;
  font-family: "Montserrat Alternates", sans-serif;
  cursor: pointer;
`;

const CompaniesButton = styled.button`
  border: none;
  color: ${COLORS.babyBlue};
  background: transparent;
  cursor: pointer;
`;
