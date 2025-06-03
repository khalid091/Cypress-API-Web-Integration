import { getServer } from '../../utils/wsClient.js';

// This test verifies that CoinB's price increases over time
describe('WebSocket - CoinB increments correctly', () => {
  it('CoinB should increase in price on each update', async () => {
    console.log('Step 1: Initializing test...');
    
    // Array to store the prices we receive
    const prices = [];
    
    // Get the dynamic server instance
    const server = getServer();
    
    // Start listening for messages and collect prices
    await server
      .ws('/')
      .expectJson((data) => {
        // console.log('Step 2: Message received from server', data);
        
        // Find CoinB in the coins array
        const coinB = data.coins.find(c => c.name === 'CoinB');
        console.log('Step 3: CoinB found in the data', coinB);
        
        // If CoinB is not found, throw an error
        if (!coinB) {
          throw new Error('CoinB not found in coins data');
        }
        
        // Add the current price to our prices array
        prices.push(coinB.price);
        console.log(`Step 4: Added price update - CoinB: $${coinB.price}`);
        
        // Keep listening until we have 3 price updates
        if (prices.length < 3) {
          console.log(`Step 5: Waiting for more updates... (${prices.length}/3)`);
          return true;
        }
        
        // After getting 3 prices, verify the increases
        const firstIncrease = prices[1] - prices[0];
        const secondIncrease = prices[2] - prices[1];
        console.log('Step 6: Price increases:', {
          first: `$${firstIncrease}`,
          second: `$${secondIncrease}`
        });
        
        // Check if each price update shows an increase
        expect(firstIncrease).toBeGreaterThan(0);
        expect(secondIncrease).toBeGreaterThan(0);
        console.log('Step 7: Verifying price increases...', firstIncrease, secondIncrease);
        
        return false; // Stop listening after verification
      })
      .close();
    
    console.log('Step 8: WebSocket connection closed');
  });
});
