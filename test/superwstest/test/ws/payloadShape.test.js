import { getServer } from '../../utils/wsClient.js';
import { expectedShape } from '../../expected/shapes.js';

// This test verifies that the WebSocket server sends messages in the correct format
describe('WebSocket - Payload Shape', () => {
  it('should match expected payload shape on each message', async () => {
    // Step 1: Get the dynamic server instance
    const server = getServer();
    
    // Step 2: Create WebSocket connection and verify message format
    await server
      .ws('/')
      .expectJson((data) => {
        // Check if data has the expected structure
        expect(data).toHaveProperty('coins');
        expect(data).toHaveProperty('inventory');
        expect(data).toHaveProperty('time');
        
        // Check if coins and inventory are arrays
        expect(Array.isArray(data.coins)).toBe(true);
        expect(Array.isArray(data.inventory)).toBe(true);
        
        // Check if time is a number
        expect(typeof data.time).toBe('number');
        
        return true;
      })
      .close();
  });
});
