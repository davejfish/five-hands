const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /os should return a list of os', async () => {
    const response = await request(app).get('/os');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      good: expect.any(Boolean),
    });
  });

  it('#GET /os/:id should return a single os', async () => {
    const response = await request(app).get('/os/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'android',
      good: true,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
