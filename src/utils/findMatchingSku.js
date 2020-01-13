const findMatchingSku = (products, productSku) => {
  for (let product in products) {
    let inventoryItemID = products[product].variants.find(variant => variant.sku == productSku)
    return inventoryItemID.inventory_item_id;
  }
};

module.exports = { findMatchingSku };

