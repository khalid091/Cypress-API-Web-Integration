import { getServer } from '../../utils/wsClient.js';
import { purchaseCoin } from '../../utils/restClient.js';

// This test verifies that the inventory updates correctly after purchasing a coin
describe('WebSocket - Inventory updates correctly after purchase', () => {
  it('should reflect updated inventory for CoinB after purchase', async () => {
    console.log('Step 1: Initializing test...');
    
    // Variable to store the initial amount of CoinB
    let initialInventory = null;
    console.log('Step 2: Created variable to track inventory changes');
    
    // Get the dynamic server instance
    console.log('Step 3: Getting server instance...');
    const server = getServer();
    
    // Start listening for messages and handle inventory updates
    console.log('Step 4: Establishing WebSocket connection...');
    await server
      .ws('/')
      .expectJson((data) => {
        console.log('Step 5: Message received from server');
        
        if (!initialInventory) {
          // First message: Get the initial amount of CoinB
          console.log('Step 6: Processing first message...');
          initialInventory = data.inventory.find(c => c.coinId === 3).amountOwned;
          
          // Trigger the purchase of 1 CoinB
          console.log('Step 7: Sending purchase request for 1 CoinB...');
          return purchaseCoin(3, 1);
        }
        
        // Second message: Check if the amount increased by 1
        console.log('Step 8: Processing second message...');
        const newAmount = data.inventory.find(c => c.coinId === 3).amountOwned;
        
        console.log('Step 9: Verifying inventory update...');
        expect(newAmount).toBe(initialInventory + 1);
        
        console.log('Step 10: All verifications passed!');
        // Stop listening after we verify the update
        return false;
      })
      .close();
    
    console.log('Step 11: WebSocket connection closed');
  });
});