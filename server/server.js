const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const variableNames = require('./variableNames');

const accountRouter = require('./routes/account.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Router files.
app.use(variableNames.routes.accountRouter.base, accountRouter);

module.exports = app;
