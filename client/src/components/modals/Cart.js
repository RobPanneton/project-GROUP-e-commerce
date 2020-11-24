import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";

import cart from "../../assets/cart-icon-black.svg";
import { getCartItems } from "../../reducers/user-reducer";

import {
  removeItem,
  IncrementQuantity,
  DecrementQuantity,
  fixStockAmount,
} from "../../actions";

export const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.user?.cart);

  let totalCart = 0;

  if (Object.keys(cartItems).length > 0) {
    Object.keys(cartItems).forEach((item) => {
      totalCart +=
        Number(cartItems[item].price.slice(1)) * cartItems[item].quantity;
    });
  }

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    history.push(`/checkout`);
  };
  const proceedToShopping = () => {
    setIsCartOpen(false);
    history.push(`/shop`);
  };

  const removeItemClick = (item) => {
    dispatch(fixStockAmount(item));
    dispatch(removeItem(item));
  };

  return (
    <>
      {isCartOpen && (
        <BackgroundCart
          tabIndex="0"
          onClick={(e) => {
            e.stopPropagation();
            setIsCartOpen(!isCartOpen);
          }}
        >
          <CartContainer
            tabIndex="0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CartAndButton>
              <div style={{ display: "flex" }}>
                <CartTitle>CART</CartTitle>
                <img src={cart} alt="cart-icon" />
              </div>
              <CloseCartButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCartOpen(!isCartOpen);
                }}
              >
                ✕
              </CloseCartButton>
            </CartAndButton>
            <div style={{ textAlign: "center" }}>
              {Object.keys(cartItems).length > 0 && (
                <ProceedToCheckout onClick={proceedToCheckout}>
                  Proceed to checkout
                </ProceedToCheckout>
              )}
            </div>
            {cartItems &&
              Object.values(cartItems).map((product) => {
                return (
                  <Wrapper
                    key={product._id}
                    tabIndex="0"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/shop/${product._id}`);
                      setIsCartOpen(!isCartOpen);
                    }}
                  >
                    <ProductContainer key={product._id}>
                      <ProductImage
                        src={product.imageSrc}
                        alt={`image of ${product.name}`}
                      />
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </ProductContainer>
                    <QuantityAndRemove>
                      <PriceAndQuanity>
                        <Price>{product.price} ✕</Price>
                        <Quantity>{product.quantity}</Quantity>
                        <IncOrDec>
                          <Inc
                            disabled={!product?.numInStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(IncrementQuantity(product));
                            }}
                          >
                            ➕
                          </Inc>
                          <Dec
                            disabled={product?.quantity < 2}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(DecrementQuantity(product));
                            }}
                          >
                            ➖
                          </Dec>
                        </IncOrDec>
                      </PriceAndQuanity>
                      <RemoveButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItemClick(product);
                        }}
                      >
                        remove ❌
                      </RemoveButton>
                    </QuantityAndRemove>
                  </Wrapper>
                );
              })}
            <div style={{ textAlign: "center" }}>
              {Object.keys(cartItems).length === 0 && (
                <div style={{ padding: "25px 0" }}>
                  <p>You don't have any items in your cart</p>
                  <ProceedToCheckout onClick={proceedToShopping}>
                    Go to shop
                  </ProceedToCheckout>
                </div>
              )}
              {Object.keys(cartItems).length > 0 && (
                <Total>Total: ${totalCart.toFixed(2)}</Total>
              )}
              {Object.keys(cartItems).length > 0 && (
                <ProceedToCheckout onClick={proceedToCheckout}>
                  Proceed to checkout
                </ProceedToCheckout>
              )}
            </div>
          </CartContainer>
        </BackgroundCart>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 7px;
  margin: 20px 0;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const BackgroundCart = styled.div`
  background: rgba(0, 0, 0, 0);
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const CartContainer = styled.div`
  position: fixed;
  overflow-y: auto;
  width: 300px;
  max-height: 80vh;
  background: #fff;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  padding: ${MARGINS.mobileSides};
  top: 64px;
  right: 11px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2), 2px 2px 12px rgba(0, 0, 0, 0.2);
`;

const CartAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Montserrat Alternates", sans-serif;
`;

const CartTitle = styled.h1`
  font-family: "Montserrat Alternates", sans-serif;
`;

const CloseCartButton = styled.button`
  border: none;
  background: transparent;
  font-size: 21px;
  padding-bottom: 10px;
  font-weight: 700;
  cursor: pointer;
`;

const ProceedToCheckout = styled.button`
  margin-top: 15px;
  padding: 15px;
  text-decoration: underline;
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.navyBlue};
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 65px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  margin-right: 10px;
`;

const QuantityAndRemove = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

const PriceAndQuanity = styled.div`
  display: flex;
`;

const Quantity = styled.span`
  width: 25px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${COLORS.navyBlue};
  font-weight: 700;
`;

const IncOrDec = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: space-evenly;
  width: 80px;
`;

const Inc = styled.button`
  width: 24px;
  height: 24px;
  text-align: center;
  display: inline-block;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: ${COLORS.white};
  font-weight: bold;
  margin-left: 6px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: #ececec;
  }
`;

const Dec = styled.button`
  width: 24px;
  height: 24px;
  text-align: center;
  display: inline-block;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: ${COLORS.white};
  font-weight: bold;
  margin-left: 6px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.1s ease-in-out;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
  &:hover:disabled {
    background: transparent;
  }
  &:hover {
    background: #ececec;
  }
`;

const Price = styled.p`
  font-size: 14px;
  font-weight: 700;
  padding-right: 7px;
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  font-weight: 700;
  opacity: 0.8;
  cursor: pointer;
  padding: 4px;
  transition: all 0.1s ease-in-out;
  border-radius: ${BORDER_RADIUS.smallCorner};

  &:hover {
    background: #f3cdcd;
  }
`;

const Total = styled.p`
  font-size: 21px;
  font-weight: 700;
  padding: 15px 0;
`;
