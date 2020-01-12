const { setInventoryLevelApi } = require("../api/v2/setInventoryLevelApi");

const setInventoryLevel = (shopToSync, inventoryItemID, item) => {
  setInventoryLevelApi(shopToSync, item, inventoryItemID);
};

module.exports = { setInventoryLevel };
