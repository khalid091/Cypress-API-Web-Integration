import { connectToWS } from '../../utils/wsClient.js';
import { purchaseCoin } from '../../utils/restClient.js';

describe('WebSocket - Inventory updates correctly after purchase', () => {
  it('should reflect updated inventory for CoinB after purchase', async () => {
    const ws = await connectToWS();
    let initialInventory = null;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error('Test timed out after 10 seconds'));
      }, 10000);

      ws.on('message', async (data) => {
        try {
          const parsed = JSON.parse(data);
          console.log('Step 1: Received data from server:', parsed);

          if (!initialInventory) {
            initialInventory = parsed.inventory.find(c => c.coinId === 3).amountOwned;
            console.log('Step 2: Current CoinB amount:', initialInventory);
            await purchaseCoin(3, 1);
            console.log('Step 3: Sent purchase request for 1 CoinB');
          } else {
            const newAmount = parsed.inventory.find(c => c.coinId === 3).amountOwned;
            if (newAmount === initialInventory + 1) {
              expect(newAmount).toBe(initialInventory + 1);
              console.log('Step 4: Test passed! CoinB amount increased to:', newAmount);
              clearTimeout(timeout);
              ws.close();
              resolve();
            }
          }
        } catch (error) {
          console.log('Error occurred:', error.message);
          clearTimeout(timeout);
          ws.close();
          reject(error);
        }
      });

      ws.on('error', (error) => {
        console.log('WebSocket error:', error.message);
        clearTimeout(timeout);
        ws.close();
        reject(error);
      });
    });
  });
});