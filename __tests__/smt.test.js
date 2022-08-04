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

  it('#INSERT /smt should insert an item into smt table', async () => {
    const newSMT = ({
      title: 'megami tensei',
      platform: 'famicom'
    });
    const response = await request(app).post('/smt').send(newSMT);
    expect(response.status).toBe(200);
    expect(response.body.title).toEqual(newSMT.title);
    expect(response.body.platform).toEqual(newSMT.platform);
  });

  it('#PUT /smt should update existing item in the smt table', async () => {
    const smtUpdate = ({
      title: 'new megami tensei'
    });
    const response = await request(app).put('/smt/1').send(smtUpdate);
    expect(response.status).toBe(200);
    expect(response.body.title).toEqual(smtUpdate.title);
  });

  it('#DELETE /smt/:id should delete an SMT game', async () => {
    const response = await request(app).delete('/smt/1');
    expect(response.status).toBe(200);
    
    const smtGame = await request(app).get('/smt/1');
    expect(smtGame.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
