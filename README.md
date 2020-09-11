# This is the repo for my [Javascript Authenticated Tests Gist](https://gist.github.com/Fetchinator7/7774ea181a56b79636d311066cca0877)

[![Hit Count](http://hits.dwyl.com/Fetchinator7/test-authenticated-endpoints-example.svg)](http://hits.dwyl.com/Fetchinator7/test-authenticated-endpoints-example)

![Tests](https://github.com/Fetchinator7/test-authenticated-endpoints-example/workflows/tests/badge.svg)

## Notes

This needs to be hooked up to a remote database to run the tests on GitHub by adding a DATABASE_URL as a [secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) to the repo and injecting that into the env of the GitHib test. For this example it's merely a simple database setup on [Heroku](https://www.heroku.com/) but the host can of course be changed.

It's assumed that this is a database specifically for testing that's not used for production.

## Setup

To run the tests on github setup a [secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets), but to run them locally create a `.env` file in the root of the repo and add either `DATABASE_NAME` to connect to a local database or `DATABASE_URL` to connect to a remote one. For example:

```env
DATABASE_NAME=database_name
```

or

```env
DATABASE_URL=postgres://sbkhkjiwyjvnln:f75794317fe1e04...
```
