

// USE
// filter(filterSettings, products, companies)

// products and companies are the usual array of products and companies, 
// but they don't need to be the full collections, they can be any subset

// filterSettings is an object with this shape:

// const defaultFilter = {
//     minPrice: "",
//     maxPrice: "",
//     body_location: "",
//     category: "",
//     inStock: "",
//     company: "",
//   };
  
// all values are strings
// minPrice and maxPrice can be any of "0", "11.99", "120", etc... 
// I imagine a a slider tool or something here, highest price in the shop is $850

// inStock is a boolean (but as a string, ie: either "true" or "false")

// remaining categories need to be exact matches to work (so, use a pull down menu, lists are in the Google doc)

// So to search for Garmin items in stock:

// const myfilter = {
//     inStock: "true",
//     company: "Garmin"
//  };
// const filterResults = filter(myFilter, products, companies);

// Any entry with an empty string is ignored, so this gives the same result:
// const myFilter = {
//     minPrice: "",
//     maxPrice: "",
//     body_location: "",
//     category: "",
//     inStock: "true",
//     company: "Garmin",
//   };


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

  export const filter = (filterSettings, products, companies) => {
    const {
      minPrice,
      maxPrice,
      body_location,
      category,
      inStock,
      company,
    } = filterSettings;
  
    const min = Number(minPrice);
    const max = Number(maxPrice);
  
    let results = [];
    // if filtering by company, retrieve those first, since it's a hassle
    if (company) {
      results = companyProducts(company, products, companies);
    }
  
    if (minPrice && min > 0) {
      results = results.filter(p => priceToFloat(p.price) >= min)
    }
  
    if (maxPrice && max < Infinity){
      results = results.filter(p => priceToFloat(p.price) <= max)
    }
  
    if (inStock !== undefined){
      if (inStock){
        results = results.filter(p => p.numInStock > 0);
      } else {
        results = results.filter(p => p.numInStock === 0);
      }
    }
  
    const remaining = {body_location, category}
    for (const [filterCategory, value] of Object.entries(remaining)) {
      if (filterCategory.value) {
        results = results.filter((p) => p[filterCategory] === value);
      }
    }
    return results;
  };
  
  