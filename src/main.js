const { grabCurrentItemSku } = require("./helper_methods/grabCurrentItemSku");
const {
  getAllProductsFromRecieverShop
} = require("./helper_methods/getAllProductsFromRecieverShop");
const { findMatchingSku } = require("./helper_methods/findMatchingSku");
const { setInventoryLevel } = require("./helper_methods/setInventoryLevel");

const syncTwoShopsByItem = async (item, currentShop, shopToSync) => {
  let productSku;
  let setInventoryItemId;

  grabCurrentItemSku(item, currentShop).then(productSkuValue => {
    productSku = productSkuValue;
  });

  const products = getAllProductsFromRecieverShop(shopToSync);

  await products.then(products => {
    setInventoryItemId = findMatchingSku(
      products,
      productSku,
      shopToSync,
      item
    );
  });

  await setInventoryItemId.then(setInventoryItemId => {
    setInventoryLevel(shopToSync, setInventoryItemId, item);
  });
};

module.exports = { syncTwoShopsByItem };
