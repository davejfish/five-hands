const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#POST /smt should return list of smt games', () => {
    const response = await request(app).get('/smt');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
  });
  afterAll(() => {
    pool.end();
  });
});
