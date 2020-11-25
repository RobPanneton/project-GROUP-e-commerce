// USE:
// call search(searchString, products)
// returns array of products 

// -------- utility functions -------------

// parse a search string into a word array
const parseInput = (text) => {
  // dump punctuation, lowercase
  let words = text.replace(/[.,;:!?]/g, " ").toLowerCase();
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

// // if word found in a company name, return all their products
// const searchCompanies = (word, companies) => {
//   let id = 0; //assume no company with id = 0;
//   companies.forEach((c) => {
//     if (wordInCompanyName(word, c)) {
//       id = c.id;
//     }
//   });
//   if (id) {
//     return products.filter((p) => id == p.companyId);
//   }
//   return [];
// };


const searchProducts = (word, prods) => {
  return prods.filter((p) => wordInProduct(word, p));
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
const searchResultsMatrix = (searchTerm, products) => {
  const words = parseInput(searchTerm);

  // for each search term, search for matching products and companies
  const results = [];
  words.forEach((word, index) => {
    results[index] = [
      ...searchProducts(word, products),                 
    //   ...searchCompanies(word, companiesList),            
    ];
  });
  return results;
};


// narrower search, return intersection of all results
const narrowSearch = (searchTerm, products) => {
  const results = searchResultsMatrix(searchTerm, products);
  return intersectionOfResults(results);
};

// helper function, print to console
const printResults = (results) => {
    results.forEach((item) => {
      console.log({
        name: item.name,
        id: item._id,
        category: item.category,
        body_location: item.body_location,
        // company: companiesList.some((c) => c._id === item.companyId),
      });
    });
  };
  
// -----------------------------------


// entry point here 
export const search = (searchTerm, products) => {
  console.log("calling search")
  return narrowSearch(searchTerm, products);
};


