import { connectToWS } from '../../utils/wsClient.js';

describe('WebSocket - CoinB increments correctly', () => {
  it('CoinB should increase in price on each update', async () => {
    const ws = await connectToWS();
    console.log('Step 1: Connected to WebSocket server');
    const prices = [];

    return new Promise((resolve, reject) => {
      // Store timeout ID for cleanup
      const timeoutId = setTimeout(() => {
        console.log('Test timed out - did not receive enough price updates');
        ws.close();
        reject(new Error('Test timed out before receiving 3 price updates'));
      }, 5000);

      ws.on('message', (data) => {
        try {
          const parsed = JSON.parse(data);
          const coinB = parsed.coins.find(c => c.name === 'CoinB');

          if (!coinB) {
            throw new Error('CoinB not found in coins data');
          }

          prices.push(coinB.price);
          console.log(`Step ${prices.length}: CoinB price is now $${coinB.price}`);

          if (prices.length === 3) {
            console.log('\nStep 4: Checking price increases...');
            const firstIncrease = prices[1] - prices[0];
            const secondIncrease = prices[2] - prices[1];
            
            console.log(`First increase: $${prices[1]} - $${prices[0]} = $${firstIncrease}`);
            console.log(`Second increase: $${prices[2]} - $${prices[1]} = $${secondIncrease}`);

            // Check if prices are increasing
            expect(firstIncrease).toBeGreaterThan(0);
            expect(secondIncrease).toBeGreaterThan(0);
            
            // Log the actual increments
            console.log(`Step 5: Price increases detected: +$${firstIncrease}, +$${secondIncrease}`);
            console.log('Test passed! CoinB price is increasing as expected');

            clearTimeout(timeoutId);
            ws.close();
            resolve();
          }
        } catch (err) {
          console.log('Error occurred:', err.message);
          clearTimeout(timeoutId);
          ws.close();
          reject(err);
        }
      });

      ws.on('error', (err) => {
        console.log('WebSocket error:', err.message);
        clearTimeout(timeoutId);
        ws.close();
        reject(err);
      });
    });
  });
});
