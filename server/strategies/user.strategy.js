const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const variableNames = require('../variableNames');

// If a user is made with a LocalStrategy serialize it.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Log a user in with passport then get their information from the database.
 */
const getUserInfoByIDQuery = variableNames.databaseSelects.account.getUserInfoByID;
// Confirm the user exists based on the provided "id."
passport.deserializeUser(async (id, done) => {
  const conn = await pool.connect();
  try {
    const result = await conn.query(getUserInfoByIDQuery, [id]);
    const user = result.rows && result.rows[0];
    if (user) {
      // Remove the user's password so it doesn't get sent.
      delete user[variableNames.databaseColumns.account.password];
      // The user was found so return the "user" in the done and "null" for the error.
      done(null, user);
    } else {
      // The user was not found so generate a 401 status code.
      done(null, null);
    }
  } catch (error) {
    console.log('Error getting user information', error);
    // An error was encountered so return the error and null for the user which generates a 500 status code.
    done(error, null);
  } finally {
    conn.release();
  }
});

// Pull the query string in from variableNames.
const getUserInfoByUsernameQuery = variableNames.databaseSelects.account.getUserInfoByUsername;
// Does the actual logging in.
passport.use('local', new LocalStrategy(async (username, password, done) => {
  const conn = await pool.connect();
  try {
    const result = await conn.query(getUserInfoByUsernameQuery, [username]);
    const user = result.rows && result.rows[0];
    if (user && encryptLib.comparePassword(password, user[variableNames.databaseColumns.account.password])) {
      // The passwords match so return the "user" in the done and "null" for the error.
      done(null, user);
    } else {
      // The username and password do not match so return null for the user and error which generates a 401 status code.
      done(null, null);
    }
  } catch (error) {
    console.log('Error with query for user', error);
    // An error was encountered so return the error and null for the user which generates a 500 status code.
    done(error, null);
  } finally {
    conn.release();
  }
}));

module.exports = passport;
