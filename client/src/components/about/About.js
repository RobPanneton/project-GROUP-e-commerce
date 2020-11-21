import React from "react";
import styled from "styled-components";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";
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
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  font-size: x-large;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

// keeps flexbox from mutating image
const ImageContainer = styled.div``;

const CompanyImage = styled.img`
  height: 150px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
`;

const Text = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: smaller;
`;
