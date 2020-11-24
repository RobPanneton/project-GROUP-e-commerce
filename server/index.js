"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const items = require("./data/items.json");
const companies = require("./data/companies.json");
const orders = require("./data/orders.json");
const { search } = require("./search/search");
const { filter } = require("./search/filter");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  //Get all products => .get("/products") no params
  //OR
  //Get range of all products
  //send range in params with start and end as keys
  //example: localhost:4000/products?start=0&end=5
  //this returns produts from index 0 to 4;
  .get("/products", (req, res) => {
    const { start, end } = req.query;

    const filteredItems = items.filter((item, index) => {
      if (end === undefined) {
        return true;
      }
      if (index >= start && index < end) {
        return true;
      }
    });

    res.status(200).json({
      status: 200,
      message: "success",

      data: filteredItems,
    });
  })

  //Get all companies => .get("/companies") no params
  //OR
  //Get range of all companies
  //send range in params with start and end as keys
  //example: localhost:4000/products?start=0&end=5
  //this returns produts from index 0 to 4;
  .get("/companies", (req, res) => {
    const { start, end } = req.query;

    const filteredCompanies = companies.filter((company, index) => {
      if (end === undefined) {
        return true;
      }
      if (index >= start && index < end) {
        return true;
      }
    });

    res.status(200).json({
      status: 200,
      message: "success",

      data: filteredCompanies,
    });
  })

  //returns individual product based on product id as param
  .get("/products/:id", (req, res) => {
    const { id } = req.params;
    const reqItem = items.find((item) => item._id === Number(id));

    if (!reqItem) {
      res.status(400).json({
        status: 400,
        message: "This item does not exist",
        error: reqItem,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "success",
        data: reqItem,
      });
    }
  })

  //purchase endpoint, updates orders.json, and adjusts items.json numInStock
  .put("/products/purchase", (req, res) => {
    const order = req.body;
    const {
      name,
      email,
      shippingAddress,
      itemsPurchased,
      ccNumber,
      ccExpiration,
    } = order;

    if (
      (!name,
      !email,
      !shippingAddress,
      !itemsPurchased,
      !ccNumber,
      !ccExpiration)
    ) {
      res.status(400).json({
        status: 400,
        message: "Cannot complete order with missing information",
        error: order,
      });
      return;
    }

    //adds the order to the orders array from orders.json
    orders.push(order);

    //for each purchased item (item), it goes through all database items (stock).
    //if they have the same ID, the stock in the database goes down by the number of items purchsed.
    Object.keys(itemsPurchased).forEach((item) => {
      items.forEach((stock) => {
        if (itemsPurchased[item]._id === stock._id) {
          stock.numInStock -= itemsPurchased[item].quantity;
        }
      });
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: order,
    });
  })

  //endpoint to get orders array from orders.json
  .get("/products/admin/orders", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "success",
      data: orders,
    });
  })

  //returns individual company based on comapny id as param
  .get("/companies/:id", (req, res) => {
    const { id } = req.params;
    const reqCompany = companies.find((company) => company._id === Number(id));

    if (!reqCompany) {
      res.status(400).json({
        status: 400,
        message: "This company does not exist",
        error: reqCompany,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "success",
        data: reqCompany,
      });
    }
  })

  // search endpoint. See search/search.js for notes
  .get("/search/:query", (req, res) => {
    const { query } = req.params;
    let searchResults = [];
    try {
      searchResults = search(query);
    } catch (e) {
      res.status(400).json({
        status: 400,
        message: "Search error",
        error: e.message,
      });
    }
    res.status(200).json({
      status: 200,
      message: "success",
      data: searchResults,
    });
  })

  // filter / advanced search, see search/filter.js
  .get("/filter/:query", (req, res) => {
    const { query } = req.params;
    let filterResults = [];
    try {
      filterResults = filter(query);
    } catch (e) {
      console.error(e.message);
      res.status(400).json({
        status: 400,
        message: "Filter error",
        error: "filter error, check back end console",
      });
    }
    res.status(200).json({
      status: 200,
      message: "success",
      data: filterResults,
    });
  })

  //Endpint does not exist
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
