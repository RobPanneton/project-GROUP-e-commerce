import React from "react";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";

import hero from "../../assets/ecom-hero.svg";
import { useHistory } from "react-router-dom";

export const Homepage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <HeroImgAndHeading>
        <HeroImage src={hero} alt="Display watch" />
        <HeroHeading>
          Watch your health with <span>HEALTHwatch</span>
        </HeroHeading>
      </HeroImgAndHeading>
      <ShopNowButton onClick={() => history.push(`/shop`)}>
        SHOP NOW
      </ShopNowButton>
      <CompaniesButton onClick={() => history.push(`/companies`)}>
        See our partner companies
      </CompaniesButton>
      <BackgroundWave>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill={COLORS.babyBlue}
            fill-opacity="1"
            d="M0,0L60,5.3C120,11,240,21,360,48C480,75,600,117,720,149.3C840,181,960,203,1080,186.7C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <BackgroundSpacing />
      </BackgroundWave>
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
    width: 250px;
  }
  @media (min-width: 1440px) {
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
  width: 350px;

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 700;
  }

  @media (min-width: 761px) {
    font-size: 36px;
    width: 450px;
  }

  @media (min-width: 1440px) {
    font-size: 66px;
    width: 750px;
    line-height: 80px;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2);
  @media (min-width: 761px) {
    font-size: 32px;
  }
  @media (min-width: 1440px) {
    color: #fff;
    border: 6px solid #fff;
    background: ${COLORS.babyBlue};
    font-size: 54px;
    padding: 17px 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 2px 2px 10px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CompaniesButton = styled.button`
  border: none;
  color: ${COLORS.babyBlue};
  background: transparent;
  cursor: pointer;
  @media (min-width: 1440px) {
    color: ${COLORS.white};
    font-size: 16px;
  }
`;

const HeroImgAndHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 761px) {
    flex-direction: row;
    margin: 0 40px;
  }
`;

const BackgroundWave = styled.div`
  @media (min-width: 1440px) {
    position: absolute;
    z-index: -999;
    bottom: 0px;
    left: 0;
    right: 0;
    padding-bottom: 120px;
  }
`;

const BackgroundSpacing = styled.div`
  @media (min-width: 1440px) {
    background: ${COLORS.babyBlue};
    height: 130px;
    width: 100%;
    position: absolute;
    z-index: -999;
    bottom: 0px;
    left: 0;
    right: 0;
  }
`;
