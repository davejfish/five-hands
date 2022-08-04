const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/smt', require('./controllers/smt'));
app.use('/consoles', require('./controllers/consoles'));
app.use('/tmnt', require('./controllers/tmnt'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
