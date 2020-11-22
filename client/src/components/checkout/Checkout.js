import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";
import { getCartItems } from "../../reducers/user-reducer";
import { removeItem } from "../../actions";
export const Checkout = () => {
  const history = useHistory();
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();
  const [ccNumber, setCcNum] = React.useState("XXXX XXXX XXXX XXXX");
  const [ccExp, setCcExp] = React.useState("00/0000");

  let totalCart = 0;
  if (Object.keys(cartItems).length > 0) {
    Object.keys(cartItems).forEach((item) => {
      totalCart +=
        Number(cartItems[item].price.slice(1)) * cartItems[item].quantity;
    });
  }

  const handlerCcNum = (e) => {
    setCcNum(e.target.value);
  };
  const handlerCcExp = (e) => {
    setCcExp(e.target.value);
  };

  return (
    <Wrapper>
      <h1>Checkout</h1>
      {Object.keys(cartItems).length > 0 ? (
        <div>
          <Text>Please review your cart before purchasing.</Text>
          {Object.values(cartItems).map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  margin: "11px",
                  padding: "10px",
                  border: "1px solid #ececec",
                  borderRadius: "15px",
                }}
              >
                <div key={product._id}>
                  <img
                    src={product.imageSrc}
                    alt={`image of ${product.name}`}
                    style={{ borderRadius: "15px" }}
                  />
                  <div>
                    <p>{product.name}</p>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      padding: "10px 0",
                    }}
                  >
                    <p>{product.price} ✕</p>
                    <input
                      type="number"
                      placeholder={product.quantity}
                      min={1}
                      max={Number(product.numInStock)}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      dispatch(removeItem(product));
                    }}
                    style={{ border: "none", background: "transparent" }}
                  >
                    remove ❌
                  </button>
                </div>
              </div>
            );
          })}
          <p>
            Total: <strong>${totalCart.toFixed(2)}</strong>
          </p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="name">Name</Label>
            <br />
            <StyledInput
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
            />
            <Label htmlFor="address">Shipping Address</Label>
            <br />
            <StyledInput
              type="text"
              name="address"
              id="address"
              placeholder="Full address"
            />
            <CreditcardMockUp>
              <p>{ccNumber}</p>
              <p>{ccExp}</p>
            </CreditcardMockUp>
            <Label htmlFor="cc">Credit Card Number</Label>
            <br />
            <StyledInput
              type="number"
              name="cc"
              id="cc"
              onChange={handlerCcNum}
              placeholder={ccNumber}
            />
            <Label htmlFor="expiration">Expiration Date</Label>
            <br />
            <StyledInput
              type="number"
              name="expiration"
              id="expiration"
              onChange={handlerCcExp}
              placeholder={ccExp}
            />
            <PurchaseButton type="submit">PURCHASE</PurchaseButton>
          </Form>
          <p style={{ paddingBottom: " 30px" }}>
            Total: <strong>${totalCart.toFixed(2)}</strong>
          </p>
        </div>
      ) : (
        <div>
          <Text>
            You don't have any items in your cart. Check out our shop for really
            cool products.
          </Text>
          <GoToShopButton onClick={() => history.push("/shop")}>
            Go to shop
          </GoToShopButton>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Text = styled.p`
  padding: 20px 0;
`;

const GoToShopButton = styled.button`
  border: none;
  background: transparent;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 21px;
  font-weight: 700;
  text-decoration: underline;
`;

const Form = styled.form`
  padding: 25px 0;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 5px;
  font-size: 18px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  border: 1px solid #dbdbdb;
  margin: 15px 0;
`;

const Label = styled.label`
  width: 90%;
  font-size: 14px;
  font-weight: 600;
`;
const CreditcardMockUp = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  background: linear-gradient(${COLORS.navyBlue}, ${COLORS.babyBlue});
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  margin: 20px auto;
`;

const PurchaseButton = styled.button`
  border: none;
  background: ${COLORS.shortGreyGradient};
  color: ${COLORS.white};
  border-radius: ${BORDER_RADIUS.mediumCorner};
  font-size: 21px;
  padding: 10px 20px;
  font-weight: 700;
  margin-top: 20px;
`;
