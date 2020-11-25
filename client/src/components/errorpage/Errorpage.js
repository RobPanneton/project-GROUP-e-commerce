import React from "react";
import styled from "styled-components";
import { COLORS, MARGINS } from "../../constants";

export const Errorpage = () => {
  const [mode, setMode] = React.useState(false);
  return (
    <Wrapper mode={mode}>
      <FourOhFour mode={mode}>404</FourOhFour>
      <NotFound mode={mode}>Page not found</NotFound>
      <Oops mode={mode} onClick={() => setMode(!mode)}>
        OOPS!
      </Oops>
      <ErrorMessage mode={mode}>
        The page you are looking for doesn't exist, or some other error
        occurred.
      </ErrorMessage>
    </Wrapper>
  );
};

//
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${MARGINS.mobileTop};
  padding-left: ${MARGINS.mobileSides};
  padding-right: ${MARGINS.mobileSides};
  background-color: ${(props) => (props.mode ? COLORS.babyBlue : COLORS.white)};
`;

// box-shadow could be better
const Oops = styled.button`
  background-color: ${(props) => (props.mode ? COLORS.white : COLORS.babyBlue)};
  border: none;
  font-size: xx-large;
  color: ${(props) => (props.mode ? COLORS.black : COLORS.white)};
  font-weight: 900;
  padding: 20px;
  border-radius: 25% /50%;
  margin: 40px 20px;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px;
  cursor: pointer;
`;

const FourOhFour = styled.p`
  font-size: 58px;
  padding-top: 50px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.mode ? COLORS.white : COLORS.black)};
`;

const NotFound = styled.p`
  font-size: x-large;
  font-weight: 400;
  color: ${(props) => (props.mode ? COLORS.white : COLORS.black)};
`;

const ErrorMessage = styled.p`
  font-style: italic;
  color: ${(props) => (props.mode ? COLORS.white : COLORS.black)};
`;
