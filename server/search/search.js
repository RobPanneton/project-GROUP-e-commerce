const products = require("../data/items.json");
const companiesList = require("../data/companies.json");

// Search (for the search box in the header)
// input: input string from search field
// output: array of products matching the search
// algorithm:
// parse search string into words
// for each word:
//    find all matching items
// return intersection of all results (items that are common to all results)

// this works better than a sloppy union of all results
// eg: a search for "Garmin medical":
// union gives 59 results: all Garmin products and all medical products
// intersection gives 1 result, the only Garmin medical product (a heart rate monitor)

// USE:
// send queries to "/search/:query"
// encode query string before appending to url with encodeURI()
// ie: fetch(`/search/${encodeURI(queryString)}`)
// returns a JSON matching the other server endpoints: either an error notice, or:
// {
//  "status": 200,
//   "message": "success",
//   "data": searchResults
// {
// ... where "searchResults" is an array of products matching the search
// there is no error thrown for zero results, you just get an empty array

// parse a search string into a word array
const parseInput = (text) => {
  const decoded = decodeURI(text);

  // dump punctuation, lowercase
  let words = decoded.replace(/[.,;:!?]/g, " ").toLowerCase();
  words = words.split(" ");

  // dump spurious entries
  words = words.filter((word) => word !== "");
  return words;
};

const wordInProduct = (word, product) => {
  const { name, price, body_location, category } = product;
  if (
    name.toLowerCase().includes(word) ||
    price.toLowerCase().includes(word) ||
    body_location.toLowerCase().includes(word) ||
    category.toLowerCase().includes(word)
  ) {
    return true;
  }
  return false;
};

const wordInCompanyName = (word, company) => {
  return company.name.toLowerCase().includes(word);
};

// if word found in a company name, return all their products
const searchCompanies = (word, companies) => {
  let id = 0; //assume no company with id = 0;
  companies.forEach((c) => {
    if (wordInCompanyName(word, c)) {
      id = c.id;
    }
  });
  if (id) {
    return products.filter((p) => id == p.companyId);
  }
  return [];
};

const searchProducts = (word, prods) => {
  return prods.filter((p) => wordInProduct(word, p));
};

// flatten 2d results array and remove duplicates
const unionResults = (results) => {
  return Array.from(new Set(results.flat()));
};

// for narrower search: return instersection
const intersectionOfResults = (results) => {
  let intersection = results[0];
  for (let i = 1; i < results.length; i++) {
    intersection = intersection.filter((e) => includedInResults(e, results[i]));
  }
  return intersection;
};

// intersection helper function
const includedInResults = (product, array) => {
  const contains = array.filter((e) => e._id === product._id);
  return contains.length > 0;
};

// returns 2D array of results, an array of results for each search term
const searchResultsMatrix = (searchTerm) => {
  const words = parseInput(searchTerm);

  // for each search term, search for matching products and companies
  const results = [];
  words.forEach((word, index) => {
    results[index] = [
      ...searchProducts(word, products),
      ...searchCompanies(word, companiesList),
    ];
  });
  return results;
};

// standard search, return union of all results (unused)
const broadSearch = (searchTerm) => {
  const results = searchResultsMatrix(searchTerm);
  return unionResults(results);
};

// narrower search, return intersection of all results
const narrowSearch = (searchTerm) => {
  const results = searchResultsMatrix(searchTerm);
  return intersectionOfResults(results);
};

const search = (searchTerm) => {
  return narrowSearch(searchTerm);
};

// helper function, print to console
const printResults = (results) => {
  results.forEach((item) => {
    console.log({
      name: item.name,
      id: item._id,
      category: item.category,
      body_location: item.body_location,
      company: companiesList.some((c) => c._id === item.companyId),
    });
  });
};

module.exports = { search };
