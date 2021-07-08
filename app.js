const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require ("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())
const api = process.env.API_URL;

const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/product');
const usersRouter = require('./routers/users');
const orderRouter = require('./routers/orders');



//Middleware
app.use(bodyParser.json());
app.use (morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, orderRouter);


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 dbName: 'newshop'
 })
     .then(()=>{
     console.log('database connection is ready...')
    })
     .catch((err)=>{
         console.log(err);
     })
app.listen(3000,()=>{
    console.log('server is running http://localhost:3000');
})