"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const items = require("./data/items.json");
const companies = require("./data/companies.json");

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

  //Endpint does not exist
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
