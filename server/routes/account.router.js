const express = require('express');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const variableNames = require('../variableNames');
const accountRows = variableNames.databaseSelects.account;
const accountRoutes = variableNames.routes.accountRouter;

// NOTE: There's no way to create an account in this example. If you want to add a route
// for creating accounts just do a "post" route that inserts the info into the database.

router.get(accountRoutes.root, rejectUnauthenticated, (req, res) => {
  // Send back the user object for the current session (previously queried from the database).
  res.send(req.user);
});

// Example get for a specific user.
router.get(accountRoutes.getID, rejectUnauthenticated, async (req, res) => {
  const id = req.params.id;
  // If a user is singed in their request will include a "user" which has all of the information
  // from the passport.deserializeUser query in the user.strategy.js file.
  const accessLevel = req.user.access_level;

  // If a user has an access_level of 1 they are an admin, so if it's below that return 403 (Forbidden).
  if (accessLevel < 1) {
    res.sendStatus(403);
    return;
  }

  const conn = await pool.connect();
  try {
    const result = await conn.query(accountRows.getUserInfoByID, [id]);
    const user = result.rows && result.rows[0];
    if (user) {
      // The above query selects all of the information from a user row so return that
      // info except don't return the password.
      // Remove the user's password so it doesn't get sent.
      delete user[variableNames.databaseColumns.account.password];
      res.status(200).send(user);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(`Error GET ${accountRoutes.base}${id}`, error);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
});

// Send login credentials here to generate a session cookie.
// userStrategy.authenticate('local') is middleware run on this route.
router.post(accountRoutes.login, userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user.
router.post(accountRoutes.logout, (req, res) => {
  // Use passport's built-in method to log out the user.
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
