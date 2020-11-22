import React from "react";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";

export const FooterFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleOpenFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <Wrapper>
      <FilterButton onClick={handleOpenFilter}>
        {isFilterOpen ? <span>Coming Soon</span> : <span>Filter</span>}
      </FilterButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const FilterButton = styled.button`
  background-color: ${COLORS.grey};
  color: #fff;
  font-family: "Montserrat Alternates", sans-serif;
  padding: 10px 40px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  border: none;
  border-radius: 50px;
  box-shadow: 2px 4px 7px rgba(0, 0, 0, 0.2), -2px 4px 14px rgba(0, 0, 0, 0.5);
`;
