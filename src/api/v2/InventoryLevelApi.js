const { urlForLevels } = require("../../config");
const axios = require("axios");

const setInventoryLevel = (shopToSync, inventoryItemId, item) => {
  axios
    .post(urlForLevels(shopToSync), {
      location_id: shopToSync.location_id,
      inventory_item_id: inventoryItemId,
      available: item.available
    })
    .catch(error => {
      console.log(error.message);
    });
};
module.exports = { setInventoryLevel };
