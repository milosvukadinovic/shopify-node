const { getItemSkuApi } = require("../api/v2/getItemSkuApi");

const grabCurrentItemSku = (item, currentShop) => {
  return getItemSkuApi(currentShop, item)
    .then(response => {
      return response.data.inventory_item.sku;
    })
    .catch(error => {
      console.log(error.response);
    });
};

module.exports = { grabCurrentItemSku };
