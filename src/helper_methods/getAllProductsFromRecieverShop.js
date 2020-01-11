const { getAllProductsApi } = require("../api/v2/getAllProductsApi");

const getAllProductsFromRecieverShop = shopToSync => {
  return getAllProductsApi(shopToSync)
    .then(response => {
      return response.data.products;
    })
    .catch(error => {
      console.log(error.response);
    });
};

module.exports = { getAllProductsFromRecieverShop };
