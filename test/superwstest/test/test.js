import superwstest from 'superwstest';
import supertest from 'supertest';
import express from 'express';

describe('API Integration Tests', () => {
  // HTTP API Tests
  describe('HTTP Endpoints', () => {
    const app = express();
    const request = supertest('http://localhost:3100');

    it('should get coins list', async () => {
      const response = await request.get('/get-coins');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(5);
    });

    it('should get inventory', async () => {
      const response = await request.get('/get-inventory');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(5);
    });

    it('should handle coin purchase', async () => {
      const response = await request
        .post('/purchase-coin')
        .send({ coinId: 2, amount: 1 });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('inventory');
    });
  });

  // WebSocket Tests
  describe('WebSocket Endpoints', () => {
    it('should receive initial data on connect', async () => {
      await superwstest('ws://localhost:3100')
        .ws('/')
        .expectJson((data) => {
          expect(data).toHaveProperty('coins');
          expect(data).toHaveProperty('inventory');
          expect(data).toHaveProperty('time');
          expect(data.time).toBe(0);
        })
        .close();
    });

    it('should receive price updates', async () => {
      await superwstest('ws://localhost:3100')
        .ws('/')
        .expectJson((data) => {
          expect(data.time).toBe(0);
        })
        .expectJson((data) => {
          expect(data.time).toBeGreaterThan(0);
          expect(Array.isArray(data.coins)).toBe(true);
          expect(Array.isArray(data.inventory)).toBe(true);
        })
        .close();
    });
  });

  // Add afterAll to ensure all connections are closed
  afterAll(async () => {
    // Add a small delay to ensure all connections are properly closed
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
});
