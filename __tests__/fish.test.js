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

  it('#GET /fish/:id should return a fish', async () => {
    const response = await request(app).get('/fish/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      name: 'saba',
      yummy: true,
    });
  });

  it('#POST /fish should add a new fish', async () => {
    const newFish = {
      name: 'maguro',
      yummy: true,
    };
    const response = await request(app).post('/fish').send(newFish);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newFish.name);
    expect(response.body.yummy).toEqual(newFish.yummy);
  });

  it('#PUT /fish/:id should update an existing fish', async () => {
    const newFish = {
      name: 'maguro',
      yummy: true
    };
    const response = await request(app).put('/fish/1').send(newFish);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(newFish.name);
    expect(response.body.yummy).toEqual(newFish.yummy);
  });

  it('#DELETE /fish/:id should delete a fish', async () => {
    const response = await request(app).delete('/fish/1');
    expect(response.status).toBe(200);

    const deletedFish = await request(app).get('/fish/1');
    expect(deletedFish.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
