const { grabCurrentItemSku } = require("./utils/grabCurrentItemSku");
const {
  getAllProductsFromRecieverShop
} = require("./utils/getAllProductsFromRecieverShop");
const { findMatchingSku } = require("./utils/findMatchingSku");
const { setInventoryLevel } = require("./utils/setInventoryLevel");

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
