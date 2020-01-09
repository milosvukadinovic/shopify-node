const { urlForInventory,
urlForProducts,
urlForLevels } = require('./config');
const request = require("request");
const axios = require("axios");

const syncStore = (item, currentShop, shop) => {
  const skuHelp = [];
  request(
    {
      url: urlForInventory(currentShop, item.id),
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        skuHelp[0] = body.inventory_item.sku;
        syncSet(item, skuHelp, shop);
      }
    }
  );
};

const syncSet = (item, skuHelp, shop) => {
  request(
    {
      url: urlForProducts(shop),
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        for (let i in body.products) {
          for (let j in body.products[i].variants) {
            if (body.products[i].variants[j].sku == skuHelp[0]) {
              skuHelp[1] = body.products[i].variants[j].inventory_item_id;
              if (item.available == null) {
                item.available = 0;
              }
              if (!isNaN(shop.location_id) && !isNaN(skuHelp[1])) {
                axios
                  .post(urlForLevels(shop), {
                    location_id: shop.location_id,
                    inventory_item_id: skuHelp[1],
                    available: item.available
                  })
                  .catch(error => {
                    console.log(error.message);
                  });
              }
              break;
            }
          }
        }
      }
    }
  );
};

module.exports = { syncStore };
