const { urlForLevels } = require("../../config");
const axios = require("axios");

const setInventoryLevelApi = (shopToSync, item, inventoryItemID) => {
  axios
    .post(urlForLevels(shopToSync), {
      location_id: shopToSync.location_id,
      inventory_item_id: inventoryItemID,
      available: item.available
    })
    .catch(error => {
      console.log(error.message);
    });
};
module.exports = { setInventoryLevelApi };
