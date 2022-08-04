const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /fish should return a list of fish', async () => {
    const response = await request(app).get('/fish');
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      yummy: expect.any(Boolean)
    });
  });

  afterAll(() => {
    pool.end();
  });
});
