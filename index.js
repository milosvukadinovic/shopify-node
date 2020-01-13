require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const { shops } = require("./src/config");
const { syncTwoShopsByItem } = require("./src/shopService");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.all("/store/:shopName/api/v2", (req, res) => {
  const currentShop = shops.find(shop => shop.name == req.params.shopName);
  const item = {
    id: req.body.inventory_item_id,
    available: req.body.available
  };
  shops
    .filter(shopToSync => shopToSync.name != currentShop.name)
    .forEach(shopToSync => syncTwoShopsByItem(item, currentShop, shopToSync));
  res.send("Done");
});

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
