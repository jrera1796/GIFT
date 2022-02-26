const axios = require('axios');
// require('dotenv')

// const searchProducts = require("./searchAPI");

// searchProducts('1000', "soup")
// .then(response => {
//   const data = response
//   console.log(data)
// })

// const categories = [
//   { 'Apps & Games': 2350150011 },
//   { 'Arts, Crafts & Sewing': 2617942011 },
//   { 'Beauty': 11055981 },
//   { 'Books': 1000 },
//   { 'CDs & Vinyl': 301668 },
//   { 'Clothing, Shoes & Jewelry': 7141124011 },
//   { 'Collectibles & Fine Arts': 4991426011 },
//   { 'Digital Music': 624868011 },
//   { 'Electronics': 493964 },
//   { 'Gift Cards': 2864120011 },
//   { 'Grocery & Gourmet Food': 16310211 },
//   { 'Handmade': 11260433011 },
//   { 'Health & Personal Care': 3760931 },
//   { 'Home & Kitchen': 1063498 },
//   { 'Industrial & Scientific': 16310161 },
//   { 'Movies & TV': 2625374011 },
//   { 'Musical Instruments': 11965861 },
//   { 'Office Products': 1084128 },
//   { 'Patio, Lawn & Garden': 3238155011 },
//   { 'Pet Supplies': 2619534011 },
//   { 'Software': 409488 },
//   { 'Sports & Outdoors': 3375301 },
//   { 'Tools & Home Improvement': 468240 },
//   { 'Toys & Games': 165795011 },
//   { 'Vehicles': 10677470011 },
//   { 'Video Games': 11846801 }

// ]

const searchProducts = function (keyword, category) {

  const params = {
    api_key: "Put API KEY Here" ,// .env isn't working
    type: "search",
    category_id: category,
    amazon_domain: "amazon.com",
    output: "json",
    search_term: keyword,
    exclude_sponsored: "true"
  }

  return axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
      let results = response.data.search_results;

      let data = results.map(a => (
        
        {
          'category': category,
          'title': a.title,
          'asin': a.asin,
          'link': a.link,
          'image': a.image,
          // 'price': a.prices.raw, Some items don't return a price!
          'rating': a.rating
        }
      ))
      return data;
    }).catch(error => {
      console.log(error);
    })
}

module.exports = searchProducts;