import React from "react";
import styled from "styled-components";
import loader from "../assets/loader.svg";

export const Loader = () => {
  return (
    <Container>
      <LoaderIcon
        src={loader}
        alt="Thanks for your patience, it won't be long."
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 300px;
`;

const LoaderIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(0deg);

  animation: smallRotate 1s infinite linear;

  @keyframes smallRotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }
`;
