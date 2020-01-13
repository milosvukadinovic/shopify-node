const { urlForInventory } = require("../../config");
const axios = require("axios");

const getItemSku = (item , currentShop) => {
  return axios
    .get(urlForInventory(currentShop, item.id), {
      json: true
    })
    .then(response => {
      return response.data.inventory_item.sku;
    })
    .catch(error => {
      throw error;
    });
};
module.exports = { getItemSku };
