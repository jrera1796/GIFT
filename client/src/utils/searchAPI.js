const axios = require('axios');

const searchProducts = function (keyword, category) {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
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
          'rating': a.rating
        }
      ))
      return data;
    }).catch(error => {
      console.log(error);
    })
}

module.exports = searchProducts;