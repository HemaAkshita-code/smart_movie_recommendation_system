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

describe('Review API', () => {
  let testMovieId;
  let createdReviewId;
  const testUserId = '6a53a4997bdf3943064addbd'; // your existing test user

  beforeAll(async () => {
    // create a temporary movie to attach reviews to
    const movieRes = await request(app).post('/api/movies').send({
      title: 'Temp Movie for Review Tests',
      description: 'Used only during automated testing.',
      genre: ['Drama'],
      releaseYear: 2024,
      duration: 100,
      director: 'Test Director'
    });
    testMovieId = movieRes.body._id;
  });

  afterAll(async () => {
    // clean up the temp movie
    await request(app).delete(`/api/movies/${testMovieId}`);
  });

  test('POST /api/reviews - fails without required fields', async () => {
    const res = await request(app).post('/api/reviews').send({ movie: testMovieId });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/reviews - fails with rating out of range', async () => {
    const res = await request(app).post('/api/reviews').send({
      movie: testMovieId,
      user: testUserId,
      rating: 15,
      reviewText: 'Invalid rating test'
    });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/reviews - creates a review with valid data', async () => {
    const res = await request(app).post('/api/reviews').send({
      movie: testMovieId,
      user: testUserId,
      rating: 8,
      reviewText: 'Great test movie.'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.rating).toBe(8);
    createdReviewId = res.body._id;
  });

  test('GET /api/reviews/movie/:movieId - retrieves reviews for the movie', async () => {
    const res = await request(app).get(`/api/reviews/movie/${testMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/reviews/movie/:movieId/average-rating - calculates average', async () => {
    const res = await request(app).get(`/api/reviews/movie/${testMovieId}/average-rating`);
    expect(res.statusCode).toBe(200);
    expect(res.body.averageRating).toBe(8);
    expect(res.body.totalReviews).toBe(1);
  });

  test('DELETE /api/reviews/:id - deletes the review', async () => {
    const res = await request(app).delete(`/api/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
  });
});