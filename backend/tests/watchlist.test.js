const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');

beforeAll(async () => {
  await new Promise(resolve => {
    if (mongoose.connection.readyState === 1) return resolve();
    mongoose.connection.once('open', resolve);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Watchlist API', () => {
  let testMovieId;
  let createdEntryId;
  const testUserId = '6a53a4997bdf3943064addbd';

  beforeAll(async () => {
    const movieRes = await request(app).post('/api/movies').send({
      title: 'Temp Movie for Watchlist Tests',
      description: 'Used only during automated testing.',
      genre: ['Comedy'],
      releaseYear: 2024,
      duration: 95,
      director: 'Test Director'
    });
    testMovieId = movieRes.body._id;
  });

  afterAll(async () => {
    await request(app).delete(`/api/movies/${testMovieId}`);
  });

  test('POST /api/watchlist - fails without required fields', async () => {
    const res = await request(app).post('/api/watchlist').send({ user: testUserId });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/watchlist - fails with invalid status', async () => {
    const res = await request(app).post('/api/watchlist').send({
      user: testUserId,
      movie: testMovieId,
      status: 'NotARealStatus'
    });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/watchlist - creates an entry with valid data', async () => {
    const res = await request(app).post('/api/watchlist').send({
      user: testUserId,
      movie: testMovieId,
      status: 'Want to Watch'
    });
    expect(res.statusCode).toBe(201);
    createdEntryId = res.body._id;
  });

  test('GET /api/watchlist/user/:userId - retrieves the user\'s watchlist', async () => {
    const res = await request(app).get(`/api/watchlist/user/${testUserId}`);
    expect(res.statusCode).toBe(200);
    const found = res.body.find(entry => entry._id === createdEntryId);
    expect(found).toBeDefined();
  });

  test('PUT /api/watchlist/:id - updates status', async () => {
    const res = await request(app)
      .put(`/api/watchlist/${createdEntryId}`)
      .send({ status: 'Watching' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Watching');
  });

  test('DELETE /api/watchlist/:id - removes the entry', async () => {
    const res = await request(app).delete(`/api/watchlist/${createdEntryId}`);
    expect(res.statusCode).toBe(200);
  });
});