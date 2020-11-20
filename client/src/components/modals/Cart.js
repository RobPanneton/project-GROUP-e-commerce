import React from "react";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";

import cart from "../../assets/cart-icon-black.svg";

export const Cart = ({ isCartOpen, setIsCartOpen }) => {
  //change to store

  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    fetch("/products?start=0&end=3")
      .then((obj) => obj.json())
      .then((arr) => setProducts(arr.data));
  }, []);

  console.log(products);

  let totalCart = 0;

  if (products) {
    products.forEach((product) => {
      totalCart += Number(product.price.slice(1));
    });
  }

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
              <ProceedToCheckout>Proceed to checkout</ProceedToCheckout>
            </div>
            {products &&
              products.map((product) => {
                return (
                  <Wrapper>
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
                        <Quantity type="number" placeholder="1" />
                      </PriceAndQuanity>
                      <RemoveButton>remove ❌</RemoveButton>
                    </QuantityAndRemove>
                  </Wrapper>
                );
              })}
            <div style={{ textAlign: "center" }}>
              <Total>Total: ${totalCart.toFixed(2)}</Total>
              <ProceedToCheckout>Proceed to checkout</ProceedToCheckout>
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
  overflow: scroll;
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

const Quantity = styled.input`
  width: 25px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${COLORS.navyBlue};
  font-weight: 700;
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
`;

const Total = styled.p`
  font-size: 21px;
  font-weight: 700;
  padding: 15px 0;
`;
