import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "./about/About";
import { Checkout } from "./checkout/Checkout";
import { Companies } from "./companies/Companies";
import { CompanyPage } from "./companies/CompanyPage";
import { Contact } from "./contact/Contact";
import { Errorpage } from "./errorpage/Errorpage";
import { GlobalStyle } from "./GlobalStyle";
import { Header } from "./header/Header";
import { Homepage } from "./homepage/homepage";
import { ProductPage } from "./products/ProductPage";
import { Shop } from "./products/Shop";
import { useDispatch } from "react-redux";
import { populateInventory } from "../actions";
import { SearchResults } from "./search/SearchResults";

function App() {
  const dispatch = useDispatch();

  const getItems = async () => {
    try {
      const response = await fetch(`/products`);
      const json = await response.json();
      dispatch(populateInventory(json.data));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/shop/:id">
          <ProductPage />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/companies/:id">
          <CompanyPage />
        </Route>
        <Route path="/companies">
          <Companies />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/search/:searchTerm">
          <SearchResults />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route>
          <Errorpage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
