import React from "react";
import styled from "styled-components";
import loaderIcon from "../assets/loader-icon.svg";

export const Loader = () => {
  return (
    <Container>
      <LoaderIcon
        src={loaderIcon}
        alt="Thanks for your patience, it won't be long."
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100px;
  perspective: 100px;
`;

const LoaderIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1) rotateX(45deg) rotateZ(0deg);
  height: 90%;
  animation: smallRotate 1s infinite ease-in-out;

  @keyframes smallRotate {
    0% {
      transform: translate(-50%, -50%) scale(0.5) rotateX(0deg) rotateZ(360deg);
    }

    50% {
      transform: translate(-50%, -50%) scale(1) rotateX(180deg) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(0.5) rotateX(360deg) rotateZ(0deg);
    }
  }
`;
