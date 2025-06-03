import { getServer } from '../../utils/wsClient.js';

// This test verifies that CoinB's price increases over time
describe('WebSocket - CoinB increments correctly', () => {
  it('CoinB should increase in price on each update', async () => {
    console.log('Step 1: Initializing test...');
    
    // Array to store the prices we receive
    const prices = [];
    console.log('Step 2: Created array to store price updates');
    
    // Step 1: Get the dynamic server instance
    console.log('Step 3: Getting server instance...');
    const server = getServer();
    
    // Step 2: Start listening for messages and collect prices
    console.log('Step 4: Establishing WebSocket connection...');
    await server
      .ws('/')
      .expectJson((data) => {
        console.log('Step 5: Message received from server');
        
        // Find CoinB in the coins array
        console.log('Step 6: Looking for CoinB in the data...');
        const coinB = data.coins.find(c => c.name === 'CoinB');
        
        // If CoinB is not found, throw an error
        if (!coinB) {
          throw new Error('CoinB not found in coins data');
        }
        
        // Add the current price to our prices array
        prices.push(coinB.price);
        console.log(`Step 7: Added price update - CoinB: $${coinB.price}`);
        
        // Keep listening until we have 3 price updates
        if (prices.length < 3) {
          console.log(`Waiting for more updates... (${prices.length}/3)`);
          return true;
        }
        
        // After getting 3 prices, verify the increases
        console.log('Step 8: Calculating price increases...');
        const firstIncrease = prices[1] - prices[0];
        const secondIncrease = prices[2] - prices[1];
        
        console.log('Price increases:', {
          first: `$${firstIncrease}`,
          second: `$${secondIncrease}`
        });
        
        // Check if each price update shows an increase
        console.log('Step 9: Verifying price increases...');
        expect(firstIncrease).toBeGreaterThan(0);
        expect(secondIncrease).toBeGreaterThan(0);
        
        console.log('Step 10: All verifications passed!');
        return false; // Stop listening after verification
      })
      .close();
    
    console.log('Step 11: WebSocket connection closed');
  });
});
