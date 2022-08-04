const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /consoles should return all consoles', async () => {
    const response = await request(app).get('/consoles');
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      console: expect.any(String),
      released: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
