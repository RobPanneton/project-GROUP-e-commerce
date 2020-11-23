import React from "react";
import styled from "styled-components"
import {COLORS, MARGINS} from "../../constants"

export const Errorpage = () => {
  return (
    <Wrapper>
      <FourOhFour>404</FourOhFour>
  <NotFound>Page not found</NotFound>
    <Oops>OOPS!</Oops>
<ErrorMessage>The page you are looking for doesn't exist, or some other error occurred.</ErrorMessage>
    </Wrapper>
  )
};

// 
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides};
  margin-right: ${MARGINS.mobileSides};
`;

// box-shadow could be better
const Oops = styled.div`
  background-color: ${COLORS.babyBlue};
  font-size: xx-large;
  color: ${COLORS.white};
  font-weight: 900;
  padding: 20px;
  border-radius: 25% /50%;
  margin: 40px 20px;
  box-shadow: rgba(0,0,0,0.8) 0 0 10px;   
`;

const FourOhFour = styled.p`
  font-size: xx-large;
  font-weight: 600;
`;

const NotFound = styled.p`
  font-size: x-large;
  font-weight: 400;
`;

const ErrorMessage = styled.p`
font-style: italic;
`;
