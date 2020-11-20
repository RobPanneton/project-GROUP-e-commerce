import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export const FooterFilter = () => {
  return <Wrapper>todo: filters</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;
  height: 24px;
  top: 544px;
  background-color: ${COLORS.grey};
  width: 100%;
`;
