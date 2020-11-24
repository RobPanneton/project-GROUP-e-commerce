import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions";

import { COLORS, MARGINS, BORDER_RADIUS } from "../../constants";

export const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([])
  const [showInStock, setShowInStock] = useState(false)

  const productsInStock = products.filter(p => p.numInStock > 0);

  const toggleShowInStock = () => {
    setShowInStock(!showInStock);
  }

  useEffect(() => {
    if (showInStock){
      setDisplayProducts(products.filter(p => p.numInStock > 0))
    } else {
      setDisplayProducts(products)
    }

  }, [showInStock, products]);


  const getCompany = async () => {
    try {
      const response = await fetch(`/companies/${id}`);
      const json = await response.json();
      if (response.ok) {
        setCompany(json.data);
      } else {
        console.error("company not found");
        return;
      }
    } catch (error) {
      return;
    }
  };

  const getProducts = async () => {
    const filterSettings = { company: company.name };
    try {
      const response = await fetch(
        `/filter/${encodeURI(JSON.stringify(filterSettings))}`
      );
      const json = await response.json();
      if (response.ok) {
        setProducts(json.data);
      } else {
        console.error("error retrieving products");
        return;
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };


  useEffect(() => {
    getCompany();
  }, []);

  useEffect(() => {
    if (company) {
      getProducts();
    }
  }, [company]);


  return (
    <Wrapper>
      {company ? (
        <>
          <CompanyTop>
            <CompanyNameAndCountry>
            <CompanyName href={company.url} target="_blank" >{company.name}</CompanyName>
            <CompanyCountry>{company.country}</CompanyCountry>
            </CompanyNameAndCountry>
            <ButtonContainer>
      <ShowInStock onClick={toggleShowInStock}>{showInStock? "show all" : "show in stock only"}</ShowInStock>
      </ButtonContainer>
          </CompanyTop>
          <CompanyProducts>
          {displayProducts && displayProducts.map(
              product => {return <Item key={product._id} item={product}/>}
)}
          </CompanyProducts>
          <CompanyBottom>
          </CompanyBottom>
        </>
      ) : null}
    </Wrapper>
  );
};


const Item = ({item}) => {
  const {name, price, imageSrc, numInStock} = item;
  const dispatch = useDispatch();
  return (
  <ItemCard >
    {item && 
    <ItemContent>
      <ProductImage
        style={{
          backgroundImage: `url(${item?.imageSrc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <ProductPriceWrapper>
          <ProductPrice>{item?.price}</ProductPrice>
        </ProductPriceWrapper>
      </ProductImage>
      <ProductName>{item?.name}</ProductName>
      <AddToCart
        disabled={!item?.numInStock}
        onClick={() => {
          // dispatch(addItem(item));
        }}
      >
        <CartBtnText>Add to Cart</CartBtnText>
      </AddToCart>
      {!item?.numInStock && (
        <p
          style={{
            padding: "10px 0",
            color: "red",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          out of stock 😞
        </p>
      )}
    </ItemContent>
}

  </ItemCard>);

}








const Wrapper = styled.div`
  padding-top: ${MARGINS.mobileTop};
  margin-left: ${MARGINS.mobileSides} ;
  margin-right: ${MARGINS.mobileSides} ;

`;

const CompanyTop = styled.div`
  padding-top: 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

const CompanyNameAndCountry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start
`;

const CompanyCountry = styled.div``;

const CompanyProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: auto;  //center without shrinking itemcards

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ShowInStock = styled.button`
  border: none;
  border-radius: 24px;
  padding: 5px 10px;
  margin: 0;
  font-size: x-small;
  font-weight: 600;
  outline: none;

  @media (min-width: 768px) {
    padding: 10px 5px;
    font-size: small;
  }

`;


const CompanyBottom = styled.div``;

const CompanyName = styled.a`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  color: ${COLORS.black};
  font-size: xx-large;
`;

// item css begins here
const ItemCard = styled.div`
  border: 1px solid #eaeaee;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 11px;

  @media (min-width: 768px) {
    width: 350px;
    height: 400px;
  }

`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 11px 16px;
`;

const ProductImage = styled.div`
  border: 1px solid white;
  height: 190px;
  width: 190px;
  border-radius: 12px;
  text-align: center;
`;

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 11px 11px;
`;

const ProductPrice = styled.span`
  color: red;
  font-weight: 800;
`;

const ProductName = styled.span`
  padding-top: 16px;
  font-weight: 800;
  text-align: center;
`;

const AddToCart = styled.button`
  margin-top: 11px;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
`;

const CartBtnText = styled.span`
  font-size: 15px;
  font-weight: 600;
`;


