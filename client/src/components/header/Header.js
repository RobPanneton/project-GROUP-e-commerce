import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/search-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import styled from "styled-components";
import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";
import { Cart } from "../modals/Cart";
import { useSelector } from "react-redux";
import { getCartItems } from "../../reducers/user-reducer";

export const Header = () => {
  const cartItems = useSelector(getCartItems);
  const [isHamOpen, setIsHamOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  let amountOfItems = 0;

  if (cartItems) {
    Object.keys(cartItems).forEach((item) => {
      amountOfItems++;
    });
  }

  return (
    <HeaderContainer>
      <LogoContainer exact to="/">
        <img src={logo} alt="Health Watch Logo" />
        HEALTHwatch
      </LogoContainer>

      <SearchAndHamMenu>
        <StylessButton onClick={() => setIsHamOpen(!isHamOpen)}>
          <HamBarMenu>
            <HamBar />
            <HamBar />
            <HamBar />
          </HamBarMenu>
        </StylessButton>
        <SearchBarContainer>
          <label htmlFor="search">
            <img src={searchIcon} alt="Click to enter search query" />
          </label>
          <SearchInput
            type="text"
            name="search"
            id="search"
            placeholder="What are you looking for?"
          />
        </SearchBarContainer>
      </SearchAndHamMenu>
      <LoginAndCart>
        <StylessButton>Login</StylessButton>
        <StylessButton
          onClick={() => setIsCartOpen(!isCartOpen)}
          style={{ position: "relative" }}
        >
          <img src={cartIcon} alt="Click to view cart" />
          <CartItemCounter>{amountOfItems}</CartItemCounter>
          {/* make CartItemCounter conditinally render (if at least 1 item in cart) */}
        </StylessButton>
      </LoginAndCart>
      {isHamOpen && (
        <DropDownBackground
          tabIndex="0"
          aria-label="Click to close navigation menu"
          onClick={(e) => {
            e.stopPropagation();
            setIsHamOpen(!isHamOpen);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              setIsHamOpen(!isHamOpen);
            }
          }}
        >
          <DropDownMenu
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            }}
          >
            <ListConatiner>
              <NavLinkContainer to="/shop">
                <NavItems
                  style={{
                    borderBottom: `1px solid ${COLORS.grey}`,
                    borderTop: `1px solid ${COLORS.grey}`,
                  }}
                >
                  Shop
                </NavItems>
              </NavLinkContainer>
              <NavLinkContainer to="/companies">
                <NavItems
                  style={{
                    borderBottom: `1px solid ${COLORS.grey}`,
                  }}
                >
                  Partner companies
                </NavItems>
              </NavLinkContainer>
              <NavLinkContainer to="/contact">
                <NavItems
                  style={{
                    borderBottom: `1px solid ${COLORS.grey}`,
                  }}
                >
                  Contact us
                </NavItems>
              </NavLinkContainer>
              <NavLinkContainer to="/about">
                <NavItems>About</NavItems>
              </NavLinkContainer>
            </ListConatiner>
          </DropDownMenu>
        </DropDownBackground>
      )}
      <Cart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background: ${COLORS.shortGreyGradient};
  height: 54px;
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${MARGINS.mobileSides};
`;

const SearchAndHamMenu = styled.div`
  position: absolute;
  height: 54px;
  top: 54px;
  left: 0;
  z-index: -1;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${MARGINS.mobileSides};
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  font-family: "Montserrat Alternates";
  font-weight: 700;
  font-size: 18px;
  color: ${COLORS.white};
  text-decoration: none;
`;

const StylessButton = styled.button`
  border: none;
  background: transparent;
  color: ${COLORS.white};
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border: 1px solid ${COLORS.lightBabyBlue};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LoginAndCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;
`;

const HamBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 18px;
`;

const HamBar = styled.div`
  height: 2px;
  width: 30px;
  background: ${COLORS.navyBlue};
`;

const CartItemCounter = styled.div`
  background: ${COLORS.babyBlue};
  color: #fff;
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 244px;
  padding: 2px 7px;
  border-radius: 20px;
  border: 1px solid ${COLORS.navyBlue};
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 14px;
  border: none;
  line-height: 25px;
  border-radius: 20px;
  padding-left: 7px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border: 1px solid ${COLORS.lightBabyBlue};
  }
`;

const DropDownMenu = styled.div`
  position: fixed;
  left: 0;
  top: 54px;
  min-height: 216px;
  width: 100%;
  background: ${COLORS.longGreyGradient};
  border-radius: 0 0 ${BORDER_RADIUS.mediumCorner} ${BORDER_RADIUS.mediumCorner};
  animation: dropDown 0.5s;

  &:focus {
    outline: none;
  }

  @keyframes dropDown {
    from {
      top: -1000px;
    }
    to {
      top: 54px;
    }
  }
`;

const DropDownBackground = styled.div`
  position: fixed;
  left: 0;
  top: 54px;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      background: rgba(0, 0, 0, 0);
    }
    to {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

const ListConatiner = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const NavLinkContainer = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  color: ${COLORS.white};
  font-weight: 700;
`;
const NavItems = styled.li`
  padding: 25px 0;

  &:hover {
    opacity: 0.5;
  }
`;
