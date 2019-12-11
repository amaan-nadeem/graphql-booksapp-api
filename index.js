const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const cors = require('cors');

// connecting to mongodb
connectDB();


// adding cors
app.use(cors());

// graphql setup 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening request on Port ${PORT}`)); 