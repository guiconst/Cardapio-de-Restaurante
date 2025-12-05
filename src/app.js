const express = require('express');
const pratosRoutes = require('./routes/pratosRoutes');

const app = express();

app.use(express.json());
app.use('/pratos', pratosRoutes);

module.exports = app;
