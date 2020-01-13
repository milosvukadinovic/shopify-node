const { getItemSku } = require("./api/v2/InventoryApi");
const { getAll } = require("./api/v2/ProductsApi");
const { findMatchingSku } = require("./utils/findMatchingSku");
const { setInventoryLevel } = require("./api/v2/InventoryLevelApi");

const syncTwoShopsByItem = async (item, currentShop, shopToSync) => {
  const productSku = await getItemSku(item, currentShop);
  const products = await getAll(shopToSync);

  const inventoryItemId =  await findMatchingSku(
    products,
    productSku
  );
  
  await setInventoryLevel(shopToSync, inventoryItemId, item);

};

module.exports = { syncTwoShopsByItem };
