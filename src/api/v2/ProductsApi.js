const { urlForProducts } = require("../../config");
const axios = require("axios");

const getAll = shopToSync => {
  return axios
    .get(urlForProducts(shopToSync), {
      params: {
        json: true
      }
    })
    .then(response => {
      return response.data.products;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { getAll };
