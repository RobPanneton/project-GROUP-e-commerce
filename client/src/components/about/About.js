import React from "react";
import styled from "styled-components";

import { MARGINS, BORDER_RADIUS } from "../../constants";
import aboutPhoto from "../../assets/aboutPhoto.jpg";

export const About = () => {
  return (
    <Wrapper>
      <Top>About us</Top>
      <ImageContainer>
        <CompanyImage src={aboutPhoto} />
      </ImageContainer>
      <Text>
        We are all about staying healthy while looking great. Our goal is to
        make you feel good about yourself.
      </Text>

      <Text>
        While our little gadgets are only little gadgets, they have the
        potential to hold much more meaning than that.
      </Text>

      <Text>
        We hope to help as much as we can in your life journey to bettering
        youself.
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  padding-bottom: 55px;
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  padding: 15px 0;

  @media (min-width: 1440px) {
    padding: 45px 0;
    font-size: 99px;
  }
`;

// keeps flexbox from mutating image
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CompanyImage = styled.img`
  width: 95%;

  border-radius: ${BORDER_RADIUS.mediumCorner};
`;

const Text = styled.p`
  text-align: center;
  margin-top: 25px;
  font-size: 18px;
  max-width: 600px;
  line-height: 30px;
`;
