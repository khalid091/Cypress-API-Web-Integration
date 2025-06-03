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
            //  If this is the first message, we assume it's the initial inventory
            initialInventory = parsed.inventory.find(c => c.coinId === 3).amountOwned;
            console.log('Step 2: Current CoinB amount:', initialInventory);
            await purchaseCoin(3, 1);
            console.log('Step 3: Sent purchase request for 1 CoinB');
          } else {
            //  If we have already received the initial inventory, check for updates
            const newAmount = parsed.inventory.find(c => c.coinId === 3).amountOwned;
            //  Check if the amount has increased
            if (newAmount === initialInventory + 1) {
              expect(newAmount).toBe(initialInventory + 1);
              console.log('Step 4: Test passed! CoinB amount increased to:', newAmount);
              clearTimeout(timeout);
              ws.close();
              resolve();
            }
          }
          //  If we receive a message but haven't updated the inventory yet, do nothing
        } catch (error) {
          console.log('Error occurred:', error.message);
          clearTimeout(timeout);
          ws.close();
          reject(error);
        }
      });
      // Handle WebSocket errors
      ws.on('error', (error) => {
        console.log('WebSocket error:', error.message);
        clearTimeout(timeout);
        ws.close();
        reject(error);
      });
    });
  });
});