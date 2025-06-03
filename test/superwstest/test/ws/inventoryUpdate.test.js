import { getServer } from '../../utils/wsClient.js';
import { purchaseCoin } from '../../utils/restClient.js';

// This test verifies that the inventory updates correctly after purchasing a coin
describe('WebSocket - Inventory updates correctly after purchase', () => {
  it('should reflect updated inventory for CoinB after purchase', async () => {
    // Variable to store the initial amount of CoinB
    let initialInventory = null;
    
    // Step 1: Get the dynamic server instance
    const server = getServer();
    
    // Step 2: Start listening for messages and handle inventory updates
    await server
      .ws('/')
      .expectJson((data) => {
        if (!initialInventory) {
          // First message: Get the initial amount of CoinB
          initialInventory = data.inventory.find(c => c.coinId === 3).amountOwned;
          // Trigger the purchase of 1 CoinB
          return purchaseCoin(3, 1);
        }
        
        // Second message: Check if the amount increased by 1
        const newAmount = data.inventory.find(c => c.coinId === 3).amountOwned;
        expect(newAmount).toBe(initialInventory + 1);
        
        // Stop listening after we verify the update
        return false;
      })
      .close();
  });
});