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

  it('#INSERT /tmnt should add a new tmnt', async () => {
    const newTMNT = {
      name: 'casey jones',
      weapon: 'hockey stick'
    };
    const response = await request(app).post('/tmnt').send(newTMNT);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newTMNT.name);
    expect(response.body.weapon).toEqual(newTMNT.weapon);
  });

  it('#PUT /tmnt/:id should update a tmnt', async () => {
    const update = {
      name: 'leo',
    };
    const response = await request(app).put('/tmnt/1').send(update);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(update.name);
  });

  it('#DELETE /tmnt/1 should delete a tmnt', async () => {
    const response = await request(app).delete('/tmnt/1');
    expect(response.status).toBe(200);

    const deletedTMNT = await request(app).get('/tmnt/1');
    expect(deletedTMNT.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
