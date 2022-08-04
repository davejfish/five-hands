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

  it('#GET /consoles/:id should return a specific console', async () => {
    const response = await request(app).get('/consoles/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      console: 'famicom',
      released: '1983'
    });
  });

  it('#INSERT /consoles should add a new console', async () => {
    const newConsole = ({
      console: 'playstation',
      released: '1994',
    });
    const response = await request(app).post('/consoles').send(newConsole);
    expect(response.status).toBe(200);
    expect(response.body.console).toEqual(newConsole.console);
    expect(response.body.released).toEqual(newConsole.released);
  });

  afterAll(() => {
    pool.end();
  });
});
