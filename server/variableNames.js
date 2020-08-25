const databaseTables = {
  databaseTables: {
    account: 'account'
  }
};

module.exports = {
  ...databaseTables,
  // You could include multiple account objects here.
  adminUser: {
    id: 1,
    adminName: 'ExampleName',
    adminUsername: 'ExampleUsername',
    adminEmail: 'email@email.com',
    adminPassword: 'Password',
    adminAccessLevel: '1'
  },
  testUser: {
    id: 1,
    testUserName: 'testUser',
    testUserUsername: 'TestUsername',
    testUserEmail: 'test@email.com',
    testUserPassword: 'Password',
    testUserAccessLevel: '0'
  },
  databaseColumns: {
    account: {
      id: 'id',
      name: 'name',
      username: 'username',
      email: 'email',
      password: 'password',
      accessLevel: 'access_level'
    }
  },
  databaseSelects: {
    account: {
      // NOTE: $1 is replaced by the actual value after being filtered through pg.
      getUserInfoByUsername: `SELECT * FROM "${databaseTables.databaseTables.account}" WHERE username = $1`,
      getUserInfoByID: `SELECT * FROM "${databaseTables.databaseTables.account}" WHERE id = $1`
    }
  },
  routes: {
    accountRouter: {
      base: '/api/account',
      root: '/',
      getID: '/:id',
      login: '/login',
      logout: '/logout'
    }
  }
};
