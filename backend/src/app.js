// Express app setup — middleware and route registration (no server listen here).

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/players', playerRoutes);

app.use(errorHandler);

module.exports = app;
