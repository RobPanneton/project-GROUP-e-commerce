import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BORDER_RADIUS, COLORS, MARGINS } from "../../constants";
import { getCartItems } from "../../reducers/user-reducer";
import { removeItem } from "../../actions";

const initialForm = {
  name: "",
  email: "",
  shippingAdress: "",
  ccNumber: "",
  ccExpiration: "",
  items: null,
};

const initialCcNum = "XXXX XXXX XXXX XXXX";
const initialCcExp = "00/0000";

export const Checkout = () => {
  const history = useHistory();
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();
  const [ccNumber, setCcNum] = React.useState(initialCcNum);
  const [ccExp, setCcExp] = React.useState(initialCcExp);
  const [formData, setFormData] = React.useState(initialForm);
  const [errorType, setErrorType] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  React.useEffect(() => {
    setFormData({ ...formData, items: cartItems });
  }, [cartItems]);

  let totalCart = 0;
  if (Object.keys(cartItems).length > 0) {
    Object.keys(cartItems).forEach((item) => {
      totalCart +=
        Number(cartItems[item].price.slice(1)) * cartItems[item].quantity;
    });
  }

  const handlerName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlerEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlerShippingAddresss = (e) => {
    setFormData({ ...formData, shippingAdress: e.target.value });
  };

  const handlerCcNum = (e) => {
    setCcNum(e.target.value);
    setFormData({ ...formData, ccNumber: e.target.value });
  };
  const handlerCcExp = (e) => {
    setCcExp(e.target.value);
    setFormData({ ...formData, ccExpiration: e.target.value });
  };

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setErrorType("name");

      return;
    }

    if (!formData.email) {
      setErrorType("email");

      return;
    }

    if (!formData.shippingAdress) {
      setErrorType("shippingAddress");

      return;
    }

    if (!formData.ccNumber) {
      setErrorType("ccNum");

      return;
    }

    if (!formData.ccExpiration) {
      setErrorType("ccExp");

      return;
    }

    setErrorType(null);
    setSuccess(true);

    //We have to add the backend logic here.
    //Adjust (PUT) stock quantity
    //empty cart -> react store
    //Do we add orders in the database?
    console.log(formData);
    setCcNum(initialCcNum);
    setCcExp(initialCcExp);
    e.target.reset();
  };

  return (
    <Wrapper>
      <CheckoutText>Checkout</CheckoutText>
      {Object.keys(cartItems).length > 0 ? (
        <div>
          <Text>Please review your cart before purchasing.</Text>
          <AllItemsContainer>
            {Object.values(cartItems).map((product) => {
              return (
                <ProductContainer
                  key={product._id}
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/shop/${product._id}`);
                  }}
                >
                  <div key={product._id}>
                    <Image
                      src={product.imageSrc}
                      alt={`image of ${product.name}`}
                    />
                    <div>
                      <p style={{ fontWeight: 700, maxWidth: "300px" }}>
                        {product.name}
                      </p>
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
                        value={product.quantity}
                        style={{
                          textAlign: "center",
                          border: "none",
                          borderBottom: `2px solid ${COLORS.grey}`,
                          width: "25px",
                          marginLeft: "5px",
                        }}
                        onChange={(e) => e.stopPropagation()} //needs to connect to store
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeItem(product));
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    >
                      remove ❌
                    </button>
                  </div>
                </ProductContainer>
              );
            })}
          </AllItemsContainer>
          <p style={{ marginTop: "35px" }}>
            Total: <strong>${totalCart.toFixed(2)}</strong>
          </p>
          <Form onSubmit={handlerSubmitForm}>
            <Label htmlFor="name">Name</Label>
            <br />
            <StyledInput
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              onChange={handlerName}
            />
            <Label htmlFor="email">Email</Label>
            <br />
            <StyledInput
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={handlerEmail}
            />
            <Label htmlFor="address">Shipping Address</Label>
            <br />
            <StyledInput
              type="text"
              name="address"
              id="address"
              placeholder="Full address"
              onChange={handlerShippingAddresss}
            />
            <CreditcardMockUp>
              <p>
                {ccNumber ? ccNumber.match(/.{1,4}/g).join("   ") : ccNumber}
              </p>
              <p>{ccExp}</p>
            </CreditcardMockUp>
            <Label htmlFor="cc">Credit Card Number</Label>
            <br />
            <CreditCardInput
              type="number"
              name="cc"
              id="cc"
              onChange={handlerCcNum}
              placeholder={ccNumber}
            />
            <Label htmlFor="expiration">Expiration Date</Label>
            <br />
            <CreditCardInput
              type="number"
              name="expiration"
              id="expiration"
              onChange={handlerCcExp}
              placeholder={ccExp}
            />
            {success && (
              <SuccessContainer>
                <p>SUCCESS 🎉</p>
              </SuccessContainer>
            )}
            {errorType && (
              <ErrorContainer>
                <p>
                  {" "}
                  You need to provide your
                  {errorType === "name" && <i> full name.</i>}
                  {errorType === "email" && <i> email address.</i>}
                  {errorType === "shippingAddress" && <i> shipping address.</i>}
                  {errorType === "ccNum" && <i> credit card number.</i>}
                  {errorType === "ccExp" && (
                    <i> credit card expiration date.</i>
                  )}
                </p>
              </ErrorContainer>
            )}
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
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
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
  cursor: pointer;
`;

const Form = styled.form`
  padding: 25px 0;
  max-width: 450px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  width: 90%;
  margin: 15px ${MARGINS.mobileSides};
  padding: 5px;
  font-size: 18px;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  border: 1px solid #dbdbdb;

  @media (min-width: 761px) {
    width: 100%;
  }
`;

//removes arrows/spinners
const CreditCardInput = styled(StyledInput)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Label = styled.label`
  width: 100%;
  margin: 0 ${MARGINS.mobileSides};
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
  z-index: -1;
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
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  height: 100px;
  width: 300px;
  background: #ff8e8e;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  padding: 15px;
  font-weight: 700;
`;

const SuccessContainer = styled.div`
  height: 100px;
  width: 300px;
  background: #8eff94;
  border-radius: ${BORDER_RADIUS.mediumCorner};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  padding: 15px;
  font-weight: 700;
`;

const Image = styled.img`
  border-radius: "15px";
  margin: 15px 0;
  height: 100px;
  @media (min-width: 761px) {
    height: 180px;
  }
`;

const ProductContainer = styled.div`
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  width: 300px;
  margin: 11px;

  @media (min-width: 768px) {
    width: 350px;
  }
`;

const CheckoutText = styled.h1`
  @media (max-width: 768px) {
    padding-top: 35px;
  }
`;

const AllItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${MARGINS.mobileSides};

  @media (min-width: 761px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1130px;
    margin: 0 auto;
  }
`;
