import { connectToWS } from '../../utils/wsClient.js';
import { expectedShape } from '../../expected/shapes.js';

// test that each message received matches the expected message payload shape
describe('WebSocket - Payload Shape', () => {
  it('should match expected payload shape on each message', async () => {
    const ws = await connectToWS();
    console.log('Step 1: Connected to WebSocket server');

    return new Promise((resolve, reject) => {
      // Store timeout ID for cleanup
      const timeoutId = setTimeout(() => {
        console.log('Test timed out - no data received');
        ws.close();
        reject(new Error('Test timed out'));
      }, 5000);

      ws.on('message', (data) => {
        try {
          const parsed = JSON.parse(data);
          console.log('Step 2: Received data from server:', parsed);
          console.log('Step 3: Checking if data matches expected format...');
          
          expect(parsed).toMatchObject(expectedShape);
          console.log('Step 4: Test passed! Data format is correct');
          
          // Clear timeout before closing
          clearTimeout(timeoutId);
          ws.close();
          resolve();
        } catch (error) {
          console.log('Error occurred:', error.message);
          clearTimeout(timeoutId);
          ws.close();
          reject(error);
        }
      });

      ws.on('error', (error) => {
        console.log('WebSocket error:', error.message);
        clearTimeout(timeoutId);
        ws.close();
        reject(error);
      });
    });
  });
});
