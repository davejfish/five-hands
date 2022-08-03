const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#POST /smt should return list of smt games', async () => {
    const response = await request(app).get('/smt');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(5);
  });

  it('#POST smt/:id should return an smt game', async () => {
    const response = await request(app).get('/smt/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      title: 'shin megami tensei 1',
      platform: 'super famicom',
    });
  });

  it('#INSERT /smt should insert item into smt table', async () => {
    const newSMT = {
      title: 'megami tensei',
      platform: 'famicom'
    };
    const response = await request(app).post('/smt').send(newSMT);
    expect(response.status).toBe(200);
    expect(response.body.title).toEqual(newSMT.title);
    expect(response.body.platform).toEqual(newSMT.platform);
  });

  afterAll(() => {
    pool.end();
  });
});
