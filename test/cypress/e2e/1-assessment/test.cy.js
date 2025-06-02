import '../../support/e2e'; // this line ensures all custom commands are registered
import '../../support/commands';
import { sdetExerciseSelectors } from '../../support/selectors';

describe('Coin Trading Page', () => {
    const usdBalance = 1000;

    beforeEach(() => {
      cy.visitAndWaitForLoad('/');
    });

    // Check USD Balance test
    it('Check the USD Balance', () => {
      cy.findElement(sdetExerciseSelectors.usdBalance.container)
        .contains(sdetExerciseSelectors.usdBalance.text)
        .should('have.text', `USD Balance: $${usdBalance}`);
    });

    it('Check the Available Coins Balance', () => {
      cy.findElement(sdetExerciseSelectors.ticket.name)
        .should('have.length', 4);
    });

    it('Check the CoinB Balance and Time increment', () => {
      // Get initial values
      cy.findElement(sdetExerciseSelectors.ticket.name)
        .contains(sdetExerciseSelectors.coinB.name)
        .parents(sdetExerciseSelectors.ticket.container)
        .find(sdetExerciseSelectors.ticket.price)
        .invoke('text')
        .then(text => {
          const initialPrice = parseFloat(text.replace('$', ''));
          cy.contains(sdetExerciseSelectors.time.container, sdetExerciseSelectors.time.text)
            .invoke('text')
            .then(timeText => {
              const initialTime = parseInt(timeText.replace('Time: ', ''));
              
              // Wait and check values
              cy.wait(5000);
              
              // Check price
              cy.findElement(sdetExerciseSelectors.ticket.name)
                .contains(sdetExerciseSelectors.coinB.name)
                .parents(sdetExerciseSelectors.ticket.container)
                .find(sdetExerciseSelectors.ticket.price)
                .invoke('text')
                .then(newText => {
                  const newPrice = parseFloat(newText.replace('$', ''));
                  expect(newPrice).to.be.within(initialPrice + 4, initialPrice + 6);
                  
                  // Check time after getting new price
                  cy.contains(sdetExerciseSelectors.time.container, sdetExerciseSelectors.time.text)
                    .invoke('text')
                    .then(newTimeText => {
                      const newTime = parseInt(newTimeText.replace('Time: ', ''));
                      expect(newTime).to.be.within(initialTime + 4, initialTime + 6);
                      // Check if time matches last digit of price
                      expect(newTime).to.equal(parseInt(newPrice.toString().slice(-1)));
                    });
                });
            });
        });
    });
});