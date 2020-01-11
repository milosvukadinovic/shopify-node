const { urlForProducts } = require("../../config");
const axios = require("axios");

const getAllProductsApi = shopToSync => {
  return axios
    .get(urlForProducts(shopToSync), {
      params: {
        json: true
      }
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

module.exports = { getAllProductsApi };
