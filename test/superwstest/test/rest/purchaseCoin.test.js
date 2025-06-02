import { purchaseCoin } from '../../utils/restClient.js';

// test for a successful response payload from the `purchase-coin` endpoint after a buy order is placed
describe('REST API /purchase-coin', () => {
  it('returns a successful response after buying CoinB', async () => {
    const res = await purchaseCoin(3, 1); // CoinB has ID 3
    console.log('Response Body:', res.body); // Checking log of the response body
    expect(res.status).toBe(200); // Check that the response status is 200  
    expect(res.body.success).toBe(true); // Check that the response body contains a success property
    expect(res.body.inventory).toBeInstanceOf(Array); // Check that the response body contains an inventory property
  });
});
