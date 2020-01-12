const findMatchingSku = (products, productSku, shopToSync, item) => {
  return new Promise((resolve, reject) => {
    for (let product in products) {
      for (let variant in products[product].variants) {
        if (products[product].variants[variant].sku == productSku) {
          const inventoryItemID =
            products[product].variants[variant].inventory_item_id;
          if (!isNaN(shopToSync.location_id) && !isNaN(inventoryItemID)) {
            resolve(inventoryItemID);
          }
          break;
        }
      }
    }
    reject();
  });
};

module.exports = { findMatchingSku };
