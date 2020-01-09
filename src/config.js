const shops = [
    { name: 'crisp-shop1', api_key: process.env.SHOPIFY_API_KEY1, api_secret: process.env.SHOPIFY_API_SECRET1, location_id: 35776135213 },
    { name: 'crisp-shop2', api_key: process.env.SHOPIFY_API_KEY2, api_secret: process.env.SHOPIFY_API_SECRET2, location_id: 34775433275 }
]


const baseUrlFor = (shop) => (
    "https://"+shop.api_key+":"+shop.api_secret +"@"+shop.name+".myshopify.com"
);

const urlForInventory = (shop,itemID) => (
    baseUrlFor(shop) + "/admin/api/2020-01/inventory_items/"+itemID+".json"
);

const urlForProducts = (shop) => (
    baseUrlFor(shop) + "/admin/api/2020-01/products.json"
);

const urlForLevels = (shop) => (
    baseUrlFor(shop) +"/admin/api/2020-01/inventory_levels/set.json"
);

module.exports = { shops, baseUrlFor, urlForInventory, urlForProducts, urlForLevels };



