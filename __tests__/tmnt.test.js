const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /tmnt should return a list of all tmnt', async () => {
    const response = await request(app).get('/tmnt');
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      weapon: expect.any(String)
    });
  });

  it('#GET /tmnt/:id should return a single TMNT', async () => {
    const response = await request(app).get('/tmnt/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      weapon: expect.any(String),
    });
  });

  it('#POST /tmnt should add a new tmnt', async () => {
    const newTMNT = {
      name: 'casey jones',
      weapon: 'hockey stick'
    };
    const response = await request(app).post('/tmnt').send(newTMNT);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newTMNT.name);
    expect(response.body.weapon).toEqual(newTMNT.weapon);
  });

  afterAll(() => {
    pool.end();
  });
});
