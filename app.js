const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')
require('dotenv/config');


app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads/'))
app.use(errorHandler)





// Routers
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const userRoutes = require('./routers/users');
const orderRoutes = require('./routers/orders');



const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)



// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'

})
.then(() => {
    console.log('Database is Connection is ready...')
}).catch((err)=> {
    console.log(err)
})

app.listen(3000, ()=> {
    console.log(api)
    console.log('server is running http://localhost:3000')
})