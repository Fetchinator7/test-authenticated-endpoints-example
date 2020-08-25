const app = require('../server');
const request = require('supertest');
const variableNames = require('../variableNames');
const accountTableColumns = variableNames.databaseColumns.account;
const accountRoutes = variableNames.routes.accountRouter;

const adminUser = request.agent(app);
const adminInfo = variableNames.adminUser;
const adminName = adminInfo.adminName;
const adminUsername = adminInfo.adminUsername;
const adminEmail = adminInfo.adminEmail;
const adminPassword = adminInfo.adminPassword;
const adminAccessLevel = adminInfo.adminAccessLevel;
const adminID = 1;

const testUser = request.agent(app);
const testUserInfo = variableNames.testUser;
const testUserName = testUserInfo.testUserName;
const testUserUsername = testUserInfo.testUserUsername;
const testUserEmail = testUserInfo.testUserEmail;
const testUserPassword = testUserInfo.testUserPassword;
const testUserAccessLevel = testUserInfo.testUserAccessLevel;
const testUserID = 2;

const id = accountTableColumns.id;
const name = accountTableColumns.name;
const username = accountTableColumns.username;
const email = accountTableColumns.email;
const accessLevel = accountTableColumns.accessLevel;
const password = accountTableColumns.password;

describe(`GET ${accountRoutes.base}`, () => {
  it('Reject get info for current user while logged out', async (done) => {
    await testUser
      .get(`${accountRoutes.base}`)
      .expect(403);
    done();
  });
});

describe(`GET ${accountRoutes.base}/${adminID}`, () => {
  it('Reject get info for specific user while logged out', async (done) => {
    await testUser
      .get(`${accountRoutes.base}/${adminID}`)
      .expect(403);
    done();
  });
});

describe(`POST to login ${accountRoutes.base}${accountRoutes.login}`, () => {
  it("Responds with the user's information", async (done) => {
    await testUser
      .post(`${accountRoutes.base}${accountRoutes.login}`)
      .send({
        [username]: testUserUsername,
        [password]: testUserPassword
      })
      .expect(200);
    done();
  });
});

const standardTestUserResp = {
  [id]: testUserID,
  [name]: testUserName,
  [email]: testUserEmail,
  [username]: testUserUsername,
  [accessLevel]: testUserAccessLevel
};

describe(`GET ${accountRoutes.base}`, () => {
  it('Get the account owner info', async (done) => {
    const res = await testUser
      .get(`${accountRoutes.base}`)
      .expect(200);
    expect(res.body).toEqual(standardTestUserResp);
    done();
  });
});

describe(`GET ${accountRoutes.base}/${adminID}`, () => {
  it('Reject get info for specific user because current user is not an admin', async (done) => {
    await testUser
      .get(`${accountRoutes.base}/${adminID}`)
      .expect(403);
    done();
  });
});

describe(`POST to login ${accountRoutes.base}${accountRoutes.login}`, () => {
  it("Responds with the administrator's information", async (done) => {
    await adminUser
      .post(`${accountRoutes.base}${accountRoutes.login}`)
      .send({
        [username]: adminUsername,
        [password]: adminPassword
      })
      .expect(200);
    done();
  });
});

describe(`GET ${accountRoutes.base}`, () => {
  it("Get the admin's info", async (done) => {
    const res = await adminUser
      .get(`${accountRoutes.base}`)
      .expect(200);
    expect(res.body).toEqual({
      // NOTE: The get doesn't return the admin's password.
      [id]: adminID,
      [name]: adminName,
      [username]: adminUsername,
      [email]: adminEmail,
      [accessLevel]: adminAccessLevel
    });
    done();
  });
});

describe(`GET ${accountRoutes.base}/${testUserID}`, () => {
  it('Use the admin account to get info for the test user', async (done) => {
    const res = await adminUser
      .get(`${accountRoutes.base}/${testUserID}`)
      .expect(200);
    expect(res.body).toEqual(standardTestUserResp);
    done();
  });
});
