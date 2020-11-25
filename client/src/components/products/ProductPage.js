import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants";
import star from "../../assets/ecom-star.svg";
import { ProductGrid } from "./ProductGrid";
import { Loader } from "../Loader";

import styled from "styled-components";
import { addItem, addItemWithQuantity } from "../../actions";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);
  let [quantity, setQuantity] = useState(1);
  let [inStock, setInStock] = useState([]);
  let [suggArray, setSuggArray] = useState(null);
  const [sketchyPrice, setSketchyPrice] = useState(null);
  const [sketchyDiscount, setSketchyDiscount] = useState(null);
  const [loadState, setLoadState] = useState("loading");

  const shopInv = useSelector((state) => state.user.shopInv);

  const getItem = async () => {
    if (shopInv) {
      setItem(shopInv.find((item) => item._id === Number(id)));
    }
    return;
  };

  const getCompany = async () => {
    try {
      const response = await fetch(`/companies/${item.companyId}`);
      const json = await response.json();
      setCompany(json.data);
      return;
    } catch (error) {
      return;
    }
  };

  const getSketchyPrice = (price) => {
    let sPrice = Number(price.split("$")[1]);
    if (sPrice < 15) {
      sPrice += 3;
    } else if (sPrice >= 15 && sPrice < 25) {
      sPrice += 5;
    } else if (sPrice >= 25 && sPrice < 50) {
      sPrice += 10;
    } else if (sPrice >= 50 && sPrice < 100) {
      sPrice += 15;
    } else if (sPrice >= 100 && sPrice < 150) {
      sPrice += 20;
    } else if (sPrice >= 150 && sPrice < 200) {
      sPrice += 30;
    } else if (sPrice >= 200 && sPrice < 250) {
      sPrice += 40;
    } else if (sPrice >= 250) {
      sPrice += 50;
    }
    setSketchyPrice(sPrice);
  };

  const getSketchyDiscount = () => {
    setSketchyDiscount(
      ((item.price.split("$")[1] / sketchyPrice - 1) * -100).toFixed(2)
    );
  };

  const increment = () => {
    return quantity < item.numInStock ? setQuantity(quantity + 1) : quantity;
  };

  const decrement = () => {
    return quantity > 1 ? setQuantity(quantity - 1) : quantity;
  };

  useEffect(() => {
    getItem();
  }, [shopInv, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getCompany();
  }, [item]);

  useEffect(() => {
    if (sketchyPrice) getSketchyDiscount();
  }, [sketchyPrice]);

  useEffect(() => {
    if (item) getSketchyPrice(item.price);
  }, [item]);

  useEffect(() => {
    if (loadState === "loading") {
      setSuggArray([
        inStock[Math.round(Math.random() * inStock.length)],
        inStock[Math.round(Math.random() * inStock.length)],
        inStock[Math.round(Math.random() * inStock.length)],
      ]);
      if (suggArray) {
        if (suggArray.length > 1) setLoadState("loaded");
      }
    }
  }, [inStock, loadState]);

  useEffect(() => {
    setLoadState("loading");
  }, [id]);

  useEffect(() => {
    if (suggArray) {
      if (suggArray.length > 1) setLoadState("success");
    }
  }, [loadState]);

  useEffect(() => {
    if (shopInv)
      setInStock(shopInv.filter((product) => product.numInStock > 0));
  }, [company]);

  return (
    <Wrapper>
      {!company && <Loader />}
      {company && (
        <>
          <ItemCard key={item._id}>
            <ItemContent>
              <StockAndPrice>
                <Stock>{item.numInStock} in stock</Stock>
                <Price>Price: {item.price}</Price>
              </StockAndPrice>
              <CatWrapper>
                <CatButton>{item.category}</CatButton>
                <SoldBy to={`/companies/${company._id}`}>
                  <span>Sold by:</span> {company.name}
                </SoldBy>
              </CatWrapper>
              <ProductImage
                src={item.imageSrc}
                alt={`picture of ${item.name} by ${company.name}`}
              ></ProductImage>
              <ProductName>{item.name}</ProductName>

              <AddToCartMobile
                disabled={!item?.numInStock}
                onClick={() => {
                  dispatch(addItem(item));
                }}
              >
                <CartBtnText>
                  {!item?.numInStock ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      out of stock{" "}
                      <span role="img" aria-label="sad face">
                        😞
                      </span>
                    </p>
                  ) : (
                    <p>Add to Cart</p>
                  )}
                </CartBtnText>
              </AddToCartMobile>

              {/*desktop view*/}
              <DesktopDetailsDiv>
                <ItemName>{item.name}</ItemName>
                <CompanyDiv>
                  <Sold>Sold by: {"   "} </Sold>
                  <By to={`/companies/${company._id}`}> {company.name}</By>
                </CompanyDiv>
                <DesktopPrice>
                  <ActualPrice>{item.price}</ActualPrice>
                  <SketchyPrice> ${sketchyPrice.toFixed(2)}</SketchyPrice>
                  <SketchyPriceWrapper>
                    <SketchyDiscount>
                      {Math.ceil(sketchyDiscount)}% Off!
                    </SketchyDiscount>
                  </SketchyPriceWrapper>
                </DesktopPrice>
                <DesktopQuantity tabIndex={0}>
                  <DQuantText>QUANTITY: </DQuantText>
                  <DQuantAdjuster>
                    <Quantity>{quantity}</Quantity>
                    <IncorDec>
                      <Inc onClick={increment}>▲</Inc>
                      <Dec onClick={decrement}>▼</Dec>
                    </IncorDec>
                  </DQuantAdjuster>
                </DesktopQuantity>
                <DesktopAddToCart
                  tabIndex={0}
                  disabled={!item?.numInStock}
                  onClick={() => {
                    dispatch(addItemWithQuantity(item, quantity));
                    setQuantity(1);
                  }}
                >
                  Add to Cart
                </DesktopAddToCart>
              </DesktopDetailsDiv>
            </ItemContent>
          </ItemCard>
          {suggArray && (
            <>
              <ProductGrid
                productArray={suggArray}
                title="Related Items:"
                style={{ paddingTop: "-108px" }}
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 108px 0;
  position: relative;
  /* @media (min-width: 1024px) {
    padding: 108px 100px 0 100px;
  } */
`;

const ItemCard = styled.div`
  border: 1px solid white;
  border-radius: 12px;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 1350px) {
    padding: 0 2vw;
  }
`;

const AddToCartMobile = styled.button`
  margin-top: 28px;
  border: 3px solid ${COLORS.navyBlue};
  border-radius: 24px;
  padding: 12px 32px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${COLORS.babyBlue};
    color: ${COLORS.white};
    border: 3px solid ${COLORS.babyBlue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:disabled:hover {
    background: transparent;
    border: 3px solid ${COLORS.navyBlue};
  }

  @media (min-width: 600px) {
    padding: 24px 64px;
    margin-top: 48px;
    border-radius: 48px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 11px 16px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const CatWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CatButton = styled.button`
  border: none;
  padding: 6px 12px;
  font-weight: 600;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ProductImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid white;
  width: 100%;
  border-radius: 12px;
  text-align: center;
  margin: 12px 0;

  @media (min-width: 600px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    height: 480px;
    min-width: 480px;
  }
`;

const ProductName = styled.span`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CartBtnText = styled.span`
  font-size: 15px;
  font-weight: 600;

  @media (min-width: 600px) {
    font-size: 24px;
  }
`;

const StockAndPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 11px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Stock = styled.span`
  font-size: 13px;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 13px;
`;

const SoldBy = styled(Link)`
  font-weight: 700;
  color: black;
  text-decoration: none;
  cursor: pointer;

  span {
    font-size: 13px;
    font-weight: 600;
  }
`;

const DesktopDetailsDiv = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    padding-left: 50px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 480px;
  }
`;

const ItemName = styled.h1`
  /* @media (min-width: 1400px) {
    font-size: 42px;
  } ; */
`;

const CompanyDiv = styled.div`
  display: flex;
  @media (min-width: 1400px) {
    font-size: 20px;
  } ;
`;

const Sold = styled.span``;

const By = styled(Link)`
  margin-left: 6px;
  font-weight: 600;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const DesktopPrice = styled.div`
  display: flex;
  position: relative;
`;

const ActualPrice = styled.span`
  font-size: 24px;
  font-weight: 600;
  @media (min-width: 1400px) {
    font-size: 32px;
  } ;
`;

const SketchyPrice = styled.span`
  margin-left: 24px;
  text-decoration: line-through;
  opacity: 0.5;
  font-size: 24px;
  @media (min-width: 1400px) {
    font-size: 32px;
  } ;
`;

const SketchyPriceWrapper = styled.div`
  background: url(${star});
  height: 111px;
  width: 111px;
  position: absolute;
  top: -20px;
  left: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(12deg);
`;

const SketchyDiscount = styled.span`
  color: ${COLORS.white};
  font-weight: 700;
`;

const DesktopQuantity = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const DQuantText = styled.span`
  font-weight: 600;
`;

const DQuantAdjuster = styled.div`
  padding: 8px 12px;
  border: 2px solid ${COLORS.black};
  width: 100px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
`;

const Quantity = styled.span`
  text-align: center;
  top: 12px;
  font-weight: 600;
  font-size: 24px;
  margin-top: 5px;
`;

const IncorDec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Inc = styled.button`
  width: 24px;
  height: 24px;
  text-align: center;
  display: inline-block;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: ${COLORS.black};
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
  color: ${COLORS.black};
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

const DesktopAddToCart = styled.button`
  height: 100px;
  width: 100%;
  font-weight: 800;
  font-size: 32px;
  background-color: ${COLORS.black};
  color: #eaeaee;
  cursor: pointer;

  @media (min-width: 1400px) {
    width: 80%;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
