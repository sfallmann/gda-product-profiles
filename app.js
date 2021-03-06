const request = require('request-promise');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
//const handlebars = require('express-handlebars');
const PDFDocument = require('pdfkit');
const {user, pass, accessToken, clientID, storeHash} = require('./config');

const imagePathRoot = 'https://store-kr5xz.mybigcommerce.com/dav/product_images/configured_products/';
const gdaProductID = 565;

const app = express();
app.use(bodyParser.json());
//app.engine('hbs', handlebars({defaultLayout: 'main', extname: 'hbs'}));
//app.set('view engine', 'hbs');
const port = process.env.PORT || 3000;

app.post('/api/gda/prod_profiles', function (req, res) {
  console.log(req.headers);
  console.log(req.body);
  const orderID = '1205';
  getOrderProducts(orderID)
  .then((products) => {
    //res.send(products);
    
    res.json({"data": "webhook hit endpoint"}).status(200);
  })
  .catch(console.log);
  //res.render('main', { test: 'Hey - It works!'});
});

app.listen(port);


function getOrderProducts(orderID){

  const uri = `https://api.bigcommerce.com/stores/${storeHash}/v2/orders/${orderID}/products.json`;
  return request.get(uri, {
    headers: {
      'X-Auth-Client': clientID,
      'X-Auth-Token': accessToken
    }
  });
}


/*


getOrderProducts('1205')
.then((products) => {
  products = JSON.parse(products);
  products.forEach((product) => {
    if (product.product_id == 565){
      console.log(product.name)
    }
  })
})
.catch(console.log);

request.get(host, {
  port: 443,
  'auth': {
    'user': user,
    'pass': pass,
    'sendImmediately': false
  },
  encoding: null
}, (error, response, body) => {
  console.log(response.headers);
  const image = new Buffer(body, 'binary').toString('base64');
  const html = `<h1>Test</h1><br><br><h2>Another tag</h2><img src="data:image/png;base64,${image}"/>`;
  pdf.create(html).toFile('./test.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' } 
  });
});

*/

