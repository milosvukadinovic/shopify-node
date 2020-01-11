const { urlForInventory } = require("../../config");
const axios = require("axios");

const getItemSkuApi = (currentShop, item) => {
  return axios
    .get(urlForInventory(currentShop, item.id), {
      json: true
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};
module.exports = { getItemSkuApi };
