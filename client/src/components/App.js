import React, { useState, useEffect } from "react";
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

function App() {
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
        <Route>
          <Errorpage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
