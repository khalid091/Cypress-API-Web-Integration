import { getServer } from '../../utils/wsClient.js';
import { purchaseCoin } from '../../utils/restClient.js';

// This test verifies that the inventory updates correctly after purchasing a coin
describe('WebSocket - Inventory updates correctly after purchase', () => {
  it('should reflect updated inventory for CoinB after purchase', async () => {
    console.log('Step 1: Initializing test...');
    
    // Variable to store the initial amount of CoinB
    let initialInventory = null;
    console.log('Step 2: Created variable to track inventory changes', initialInventory);
    
    // Get the dynamic server instance
    const server = getServer();
    
    // Start listening for messages and handle inventory updates
    await server
      .ws('/')
      .expectJson((data) => {
        // console.log('Step 2: Message received from server', data);
        
        if (!initialInventory) {
          // First message: Get the initial amount of CoinB
          initialInventory = data.inventory.find(c => c.coinId === 3).amountOwned;
          console.log('Step 3: Initial inventory', initialInventory);
          
          // Trigger the purchase of 1 CoinB
          console.log('Step 4: Sending purchase request for 1 CoinB...', purchaseCoin(3, 1));
          return purchaseCoin(3, 1);
        }
        
        // Second message: Check if the amount increased by 1
        const newAmount = data.inventory.find(c => c.coinId === 3).amountOwned;
        expect(newAmount).toBe(initialInventory + 1);
        console.log('Step 5: Verifying inventory update...', newAmount);
        // Stop listening after we verify the update
        return false;
      })
      .close();
    
    console.log('Step 6: WebSocket connection closed');
  });
});