const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');
  

require ("dotenv/config");
const api = process.env.API_URL;

//Middleware
app.use(bodyParser.json());
app.use (morgan('tiny'));



const productsRoutes= require('./routers/products');
const ordersRoutes= require('./routers/orders');
const categoriesRoutes= require('./routers/categories');
const usersRoutes= require('./routers/users');



//routes
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/categories`, categoriesRoutes)

//database
mongoose.connect(process.env.CONNECTION_STRING, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 dbName: 'E-shop-database'
 })
     .then(()=>{
     console.log('database connection is ready...')
    })
     .catch((err)=>{
         console.log(err);
     })

     //server
app.listen(3000,()=>{
    console.log('server is running http://localhost:3000');
})
