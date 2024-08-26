const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const authRoute = require('./src/routes/authRoute');
const storeRoute = require('./src/routes/storeRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/store', storeRoute);

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
});