require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const { shops } = require("./src/config");
const { syncStore } = require('./src/request_handlers');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(express.urlencoded());


app.all("/store/:shopName/api/v2", (req, res) => {
  const currentShopName = req.params.shopName;
  const currentShop = shops.find(shop => shop.name == currentShopName);
  const item = { id: req.body.inventory_item_id, available: req.body.available };
  shops
    .filter(shop => shop.name != currentShopName)
    .forEach(shop => syncStore(item, currentShop, shop));
    res.send('Done');
});

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
