const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');

beforeAll(async () => {
  // wait for mongoose connection from app.js to be ready
  await new Promise(resolve => {
    if (mongoose.connection.readyState === 1) return resolve();
    mongoose.connection.once('open', resolve);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Movie API', () => {
  let createdMovieId;

  test('POST /api/movies - fails without required fields', async () => {
    const res = await request(app).post('/api/movies').send({ title: 'Incomplete' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/movies - creates a movie with valid data', async () => {
const res = await request(app).post('/api/movies').send({
  title: 'Test Movie for Jest',
  description: 'A movie created during automated testing.',
  genre: ['Drama'],
  releaseYear: 2024,
  duration: 120,
  director: 'Test Director'
});
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Movie for Jest');
    createdMovieId = res.body._id;
  });

  test('GET /api/movies/:id - retrieves the created movie', async () => {
    const res = await request(app).get(`/api/movies/${createdMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdMovieId);
  });

  test('PUT /api/movies/:id - updates the movie', async () => {
    const res = await request(app)
      .put(`/api/movies/${createdMovieId}`)
      .send({ title: 'Updated Test Movie' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Test Movie');
  });

  test('DELETE /api/movies/:id - deletes the movie', async () => {
    const res = await request(app).delete(`/api/movies/${createdMovieId}`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/movies/:id - confirms movie is gone', async () => {
    const res = await request(app).get(`/api/movies/${createdMovieId}`);
    expect(res.statusCode).toBe(404);
  });
});