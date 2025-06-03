import { getServer } from '../../utils/wsClient.js';

// This test verifies that CoinB's price increases over time
describe('WebSocket - CoinB increments correctly', () => {
  it('CoinB should increase in price on each update', async () => {
    // Array to store the prices we receive
    const prices = [];
    
    // Step 1: Get the dynamic server instance
    const server = getServer();
    
    // Step 2: Start listening for messages and collect prices
    await server
      .ws('/')
      .expectJson((data) => {
        // Find CoinB in the coins array
        const coinB = data.coins.find(c => c.name === 'CoinB');
        
        // If CoinB is not found, throw an error
        if (!coinB) {
          throw new Error('CoinB not found in coins data');
        }
        
        // Add the current price to our prices array
        prices.push(coinB.price);
        console.log(`Received price update for CoinB: $${coinB.price}`);
        
        // Keep listening until we have 3 price updates
        if (prices.length < 3) {
          return true;
        }
        
        // After getting 3 prices, verify the increases
        const firstIncrease = prices[1] - prices[0];
        const secondIncrease = prices[2] - prices[1];
        
        console.log('Price increases:', {
          first: firstIncrease,
          second: secondIncrease
        });
        
        // Check if each price update shows an increase
        expect(firstIncrease).toBeGreaterThan(0);
        expect(secondIncrease).toBeGreaterThan(0);
        
        return false; // Stop listening after verification
      })
      .close();
  });
});
