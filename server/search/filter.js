const productsList = require("../data/items.json");
const companiesList = require("../data/companies.json");

// USE
// send queries to "/filter/:query"

// for a filter object "filterSettings", call it this way:
// fetch(`/filter/${encodeURI(JSON.stringify(filterSettings))}`)
// returns a JSON
// {
//     status: 200,
//     message: "success",
//     data: filterResults,
// }
// .. where filterResults is an array of products


// the input "filterSettings" is an object with this shape:
// const filterSettings = {
//     minPrice: "",
//     maxPrice: "",
//     body_location: "",
//     category: "",
//     inStock: "",
//     company: "",
//   };

// categories with empty strings will not be filtered. You can also leave them 
// out entirely, so this is an acceptable filter setting:
// const myfilter = {
//     inStock: "true",
//     company: "Garmin"
//  };




const retrieveCompanyId = (companyName, companies) => {
  const company = companies.find((c) => c.name === companyName);
  return company._id;
};

const priceToFloat = (price) => {
  return Number(price.slice(1));
};

const companyProducts = (company, products, companies) => {
  return products.filter(
    (p) => p.companyId === retrieveCompanyId(company, companies)
  );
};

const filter = (filterSettings) => {
 const {
    minPrice,
    maxPrice,
    body_location,
    category,
    inStock,
    company,
  } = JSON.parse(decodeURI(filterSettings));

  products = productsList;
  companies = companiesList;

  const min = Number(minPrice);
  const max = Number(maxPrice);

  let results = [];
  // if filtering by company, retrieve those first, since it's a hassle
  if (company) {
    results = companyProducts(company, products, companies);
  }

  if (minPrice && min > 0) {
    results = results.filter((p) => priceToFloat(p.price) >= min);
  }

  if (maxPrice && max < Infinity) {
    results = results.filter((p) => priceToFloat(p.price) <= max);
  }

  if (inStock !== undefined) {
    if (inStock){
        results = results.filter((p) => p.numInStock > 0);
    } else {
        results = results.filter((p) => p.numInStock == 0);
    }
}

  const remaining = { body_location, category };
  for (const [filterCategory, value] of Object.entries(remaining)) {
    if (filterCategory.value) {
      results = results.filter((p) => p[filterCategory] === value);
    }
  }
  return results;
};

module.exports = { filter };
