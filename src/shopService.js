const { getItemSku } = require("./api/v2/InventoryApi");
const { getAll } = require("./api/v2/ProductsApi");
const { findMatchingSku } = require("./utils/findMatchingSku");
const { setInventoryLevel } = require("./api/v2/InventoryLevelApi");

const syncTwoShopsByItem = async (item, currentShop, shopToSync) => {
  console.log('item:'+ item);
  const productSku = await getItemSku(item, currentShop);
  console.log('productSku:'+ productSku);
  const products = await getAll(shopToSync);
  console.log('products:'+ products);
  const inventoryItemId =  await findMatchingSku(
    products,
    productSku
  );
    console.log(inventoryItemId);
  await setInventoryLevel(shopToSync, inventoryItemId, item);

};

module.exports = { syncTwoShopsByItem };
