require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios');
const fetch = require('node-fetch');
const Promise = require('promise');
const request = require('request');

//add your own to .env file
const apiKey1 = process.env.SHOPIFY_API_KEY1;
const apiSecret1 = process.env.SHOPIFY_API_SECRET1;
// for second shop .env file
const apiKey2 = process.env.SHOPIFY_API_KEY2;
const apiSecret2 = process.env.SHOPIFY_API_SECRET2;

const forwardingAddress = "https://shopify-milos.herokuapp.com/"; // heroku
const PORT = process.env.PORT || 3000;
var variantList=[];

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 
app.use(express.json());       
app.use(express.urlencoded());


//setting location
global.location;
function setLocation(apiKey,apiSecret,number) {
  let url = "https://"+apiKey+":"+apiSecret+"@crisp-shop"+number+".myshopify.com/admin/api/2020-01/locations.json";
  let settings = { method: "Get" };
  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        global.location=json;
    });
} 

// store 1 api v2
// every item level that changes it SETS the value of the opposite shop
// this should cover both admin and order changes.
app.all('/store1/api/v2', (req, res) => {

  const item = [req.body.inventory_item_id , req.body.available ];
  setLocation(apiKey2,apiSecret2,2);

  
  if(item[1]==null){
    item[1]=0;
  };
  if ((!isNaN(global.location.locations[0].id)) && (!isNaN(item[0]))) {
    axios.post("https://"+apiKey2+":"+apiSecret2+"@crisp-shop2.myshopify.com/admin/api/2020-01/inventory_levels/set.json", {
      "location_id": global.location.locations[0].id,
      "inventory_item_id": item[0],
      "available": item[1]
    }).catch(error => console.log(error.message));
  }else{
    console.log('if error')
  }
  console.log('finished v2 store1');
});

// store 2 api v2
// every item level that changes it SETS the value of the opposite shop
// this should cover both admin and order changes.
app.all('/store2/api/v2', (req, res) => {

  const item = [req.body.inventory_item_id , req.body.available ];
  setLocation(apiKey1,apiSecret1,1);

  if(item[1]==null){
    item[1]=0;
  };
  if ((!isNaN(global.location.locations[0].id)) && (!isNaN(item[0]))) {
    axios.post("https://"+apiKey1+":"+apiSecret1+"@crisp-shop1.myshopify.com/admin/api/2020-01/inventory_levels/set.json", {
      "location_id": global.location.locations[0].id,
      "inventory_item_id": item[0],
      "available": item[1]
    }).catch(error => console.log(error.message));
  }else{
    console.log('if error')
  }
  console.log('finished v2 store2');
});
  
//store one
// app.all('/store1/api/v1', (req, res) => {
  
//     //need location from second shop so i can sync inventory
//     setLocation(apiKey2,apiSecret2,2);

//     const items=[];
//     for (var i in req.body.line_items) {
//       items[i] = [req.body.line_items[i].variant_id , req.body.line_items[i].quantity ];
// }

//       //create promises for variants
//       function initialize(i) {
//         var options = {
//             url: "https://"+apiKey1+":"+apiSecret1+"@crisp-shop1.myshopify.com/admin/api/2020-01/variants/"+items[i][0]+".json",
//         };
//         return new Promise(function(resolve, reject) {
//          request.get(options, function(err, resp, body) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(JSON.parse(body));
//                 }
//             })
//         })
//     }
    
//     for (var i in items) {
//       var initializePromise = initialize(i);
//       initializePromise.then(function(result) {
//           variantList[i] = result;
          
//       }, function(err) {
//           console.log(err);
//       })
//     }

//     // send to second shop to delete items based on how much are added
//     for (var i in items) {
//       axios.post("https://"+apiKey2+":"+apiSecret2+"@crisp-shop2.myshopify.com/admin/api/2020-01/inventory_levels/adjust.json", {
//       "location_id": global.location.locations[0].id,
//       "inventory_item_id": variantList[i].variant.inventory_item_id,
//       "available_adjustment": -items[i][1]
//     })
//     }
  
//     res.send('Hello from A!');
  
// });





//store two
// app.all('/store2/api/v1', (req, res) => {
  
//   //need location from second shop so i can sync inventory
//   setLocation(apiKey1,apiSecret1,1);

//   const items=[];
//   for (var i in req.body.line_items) {
//     items[i] = [req.body.line_items[i].variant_id , req.body.line_items[i].quantity ];
// }

//     //create promises for variants
//     function initialize(i) {
//       var options = {
//           url: "https://"+apiKey2+":"+apiSecret2+"@crisp-shop2.myshopify.com/admin/api/2020-01/variants/"+items[i][0]+".json",
//       };
//       return new Promise(function(resolve, reject) {
//        request.get(options, function(err, resp, body) {
//               if (err) {
//                   reject(err);
//               } else {
//                   resolve(JSON.parse(body));
//               }
//           })
//       })
//   }
  
//   for (var i in items) {
//     var initializePromise = initialize(i);
//     initializePromise.then(function(result) {
//         variantList[i] = result;
        
//     }, function(err) {
//         console.log(err);
//     })
//   }

//   // send to second shop to delete items based on how much are added
//   for (var i in items) {
//     axios.post("https://"+apiKey1+":"+apiSecret1+"@crisp-shop1.myshopify.com/admin/api/2020-01/inventory_levels/adjust.json", {
//     "location_id": global.location.locations[0].id,
//     "inventory_item_id": variantList[i].variant.inventory_item_id,
//     "available_adjustment": -items[i][1]
//   })
//   }

  
//   res.send('Hello from A!');

// });

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

