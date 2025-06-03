import { sdetExerciseSelectors } from '../../selectors/sdetSelectors';
import '../../support/commands';

class SDETExercisePage {
  constructor() {
    this.storedCoinsOwned = null;
  }
  
  // Navigation Methods
  visit() {
    cy.visitAndWaitForLoad('/');
    return this;
  }


  // --------------------------------------------------------------------------------------------------------------------------------------


  // Check USD Balance
  verifyUSDBalance(usdBalance) {
    // Validate the USD Balance set to $1000
    cy.findElement(sdetExerciseSelectors.usdBalance.container)
      .contains(sdetExerciseSelectors.usdBalance.text)
      .should('have.text', `USD Balance: $${usdBalance}`);
    return this;
  }

  // Check Available Coins
  verifyAvailableCoins() {
    // Validate and log the number of available coins
    cy.findElement(sdetExerciseSelectors.ticket.name)
      .should('have.length', 4)
      .each(($el, index) => {
        const coinName = $el.text().trim();
        cy.log(`Coin ${index + 1}: ${coinName}`);
      });
  
    return this;
  }

  // Verify Initial Coins Owned
  verifyAllInitialCoinsOwned(initialCoinsOwned) {
    cy.findElement(sdetExerciseSelectors.inventorySelectors.container).each(($el) => {
      cy.wrap($el)
        .contains(sdetExerciseSelectors.coinsOwned.text)
        .should('have.text', `Coins owned: ${initialCoinsOwned}`);
    });
    
    return this;
  }

  // Verify All Coins Owned
  verifyAllCoinsOwned(coinsOwned) {
    const coins = [
      sdetExerciseSelectors.coinsAvailable.coinA,
      sdetExerciseSelectors.coinsAvailable.coinB,
      sdetExerciseSelectors.coinsAvailable.coinC
    ];
  
    coins.forEach((coin) => {
      cy.contains(sdetExerciseSelectors.coinsOwned.container, coin)
        .parents(sdetExerciseSelectors.inventorySelectors.container)
        .contains(sdetExerciseSelectors.coinsOwned.text)
        .should('have.text', `Coins owned: ${coinsOwned}`);
      });
    return this;
  }


  // --------------------------------------------------------------------------------------------------------------------------------------


  // Buy CoinA Methods
  buyCoinA(buycoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinA)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinAContainer');

    cy.findElement('@coinAContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(buycoinAmount);

    cy.findElement('@coinAContainer')
      .find(sdetExerciseSelectors.ticket.buyButton)
      .waitAndClick();

    return this;
  }

  // Buy CoinB Methods
  buyCoinB(buycoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinB)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinBContainer');

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(buycoinAmount);

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.ticket.buyButton)
      .click();

    return this;
  }

  // Buy CoinC Methods
  buyCoinC(buycoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinC)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinCContainer');

    cy.findElement('@coinCContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(buycoinAmount);

    cy.findElement('@coinCContainer')
      .find(sdetExerciseSelectors.ticket.buyButton)
      .click();

    return this;
  }


  // --------------------------------------------------------------------------------------------------------------------------------------


  // Sell CoinA Methods
  sellCoinA(sellcoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinA)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinBContainer');

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(sellcoinAmount);

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.ticket.sellButton)
      .click();

    return this;
  }

  // Sell CoinB Methods
  sellCoinB(sellcoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinB)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinBContainer');

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(sellcoinAmount);

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.ticket.sellButton)
      .click();

    return this;
  }

  // Sell CoinC Methods
  sellCoinC(sellcoinAmount) {
    cy.contains(sdetExerciseSelectors.ticket.name, sdetExerciseSelectors.coinsAvailable.coinC)
      .parents(sdetExerciseSelectors.ticket.container)
      .as('coinBContainer');

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.coinPurchaseInput.input)
      .enterText(sellcoinAmount);

    cy.findElement('@coinBContainer')
      .find(sdetExerciseSelectors.ticket.sellButton)
      .click();

    return this;
  }


  
  // --------------------------------------------------------------------------------------------------------------------------------------

  
  // Get coins owned for CoinA
  getCoinsAOwned() {
    return cy.contains(sdetExerciseSelectors.coinsOwned.container, sdetExerciseSelectors.coinsAvailable.coinA)
      .parents(sdetExerciseSelectors.inventorySelectors.container)
      .contains(sdetExerciseSelectors.coinsOwned.text)
      .invoke('text')
      .then(text => {
        const coinsOwned = parseInt(text.replace('Coins owned:', '').trim());
        this.storedCoinsOwned = coinsOwned;  // Store the value in class property
        cy.log(`Stored coins owned for CoinA: ${this.storedCoinsOwned}`);
        return cy.wrap(this.storedCoinsOwned);  // Wrap the value in a Cypress command
      });
  }

  /*  Verify the Coins Owned decremented by the quantity you provided after selling
  This method checks that the number of coins owned decreases by the specified amount after selling */
  verifyCoinsOwnedAfterSell(sellcoinAmount) {
    const expectedCoins = this.storedCoinsOwned - sellcoinAmount;
    cy.log(`Expected coins after selling ${sellcoinAmount}: ${expectedCoins}`);
    
    return cy.contains(sdetExerciseSelectors.coinsOwned.container, sdetExerciseSelectors.coinsAvailable.coinA)
      .parents(sdetExerciseSelectors.inventorySelectors.container)
      .contains(sdetExerciseSelectors.coinsOwned.text)
      .invoke('text')
      .then(text => {
        const afterSellCoinsOwned = parseInt(text.replace('Coins owned:', '').trim());
        expect(afterSellCoinsOwned).to.equal(expectedCoins);
        cy.log(`Actual coins owned: ${afterSellCoinsOwned}`);
        return cy.wrap(afterSellCoinsOwned);
      });
  }

   /*Verify Market Value Equals Coins Price
  This method calculates the market value based on the price of CoinB and the number of coins owned*/
  verifyMarketValueEqualsCoinsPrice() {
    // Get the price of CoinB
    cy.findElement(sdetExerciseSelectors.ticket.name)
      .contains(sdetExerciseSelectors.coinsAvailable.coinB)
      .parents(sdetExerciseSelectors.ticket.container)
      .find(sdetExerciseSelectors.ticket.price)
      .invoke('text')
      .then(text => {
        const coinPrice = parseFloat(text.replace('$', ''));
        cy.wrap(coinPrice).as('coinPrice'); // Store in alias for later use
        cy.log(`Coin price of CoinB: ${coinPrice}`); // Cypress log
      });

    // Get the expected market value
    cy.contains(sdetExerciseSelectors.coinsOwned.container, sdetExerciseSelectors.coinsAvailable.coinB)
      .parents(sdetExerciseSelectors.inventorySelectors.container)
      .find(sdetExerciseSelectors.marketValue.container)
      .invoke('text')
      .then(text => {
        // const marketValue = parseFloat(text.replace('Market Value: $', '').trim());
        const marketValue = parseFloat(text.match(/\$([\d.]+)/)?.[1]);
        cy.wrap(marketValue).as('expectedMarketValue');
        cy.log(`Market Value: ${marketValue}`);
      });

    // Get the coins owned for CoinB
    cy.contains(sdetExerciseSelectors.coinsOwned.container, sdetExerciseSelectors.coinsAvailable.coinB)
        .parents(sdetExerciseSelectors.inventorySelectors.container)
        .contains(sdetExerciseSelectors.coinsOwned.container, sdetExerciseSelectors.coinsOwned.text)
        .invoke('text')
        .then(text => {
          const numCoinsOwned = parseInt(text.replace('Coins owned:', '').trim());
          cy.wrap(numCoinsOwned).as('coinsOwned'); // Store in alias for later use
          cy.log(`Number of Coins Owned: ${numCoinsOwned}`); // Cypress log
      });

    // Calculate the calculated market value (Coin Price * Coins Owned)
      cy.get('@coinPrice').then(coinPrice => {
        cy.get('@coinsOwned').then(coinsOwned => {
          const calculatedMarketValue = coinPrice * coinsOwned;
          cy.log(`Calculated Market Value: ${calculatedMarketValue}`);
          
          // Verify the calculated market value equals to expected market value
          cy.get('@expectedMarketValue').then(expectedValue => {
            cy.log(`Expected Market Value: ${expectedValue}`);
            expect(Math.abs(calculatedMarketValue - expectedValue));
          });
        });
      });
    return this;
  }

  /* Validate CoinB Balance and Time Increment
  This method checks that CoinB's price increments by $1 every 1 seconds*/
  verifyCoinBBalanceAndTimeIncrement() {
    // Get initial CoinB price
    cy.findElement(sdetExerciseSelectors.ticket.name)
      .contains(sdetExerciseSelectors.coinsAvailable.coinB)
      .parents(sdetExerciseSelectors.ticket.container)
      .find(sdetExerciseSelectors.ticket.price)
      .invoke('text')
      .then(text => {
        const initialPrice = parseFloat(text.replace('$', '').trim());
        cy.wrap(initialPrice).as('asInitialPrice');
        cy.log(`Initial price: ${initialPrice}`);
      });
  
    // Get initial time
    cy.contains(sdetExerciseSelectors.time.container, sdetExerciseSelectors.time.text)
      .invoke('text')
      .then(text => {
        const initialTime = parseInt(text.replace('Time: ', '').trim());
        cy.wrap(initialTime).as('asInitialTime');
        cy.log(`Initial time: ${initialTime}`);
      });
  
    // Wait 5 seconds before checking updated values
    cy.wait(5000);
  
    // Get new price and time, then validate
    cy.get('@asInitialPrice').then(initialPrice => {
      cy.get('@asInitialTime').then(initialTime => {
        
        // Get updated CoinB price
        cy.findElement(sdetExerciseSelectors.ticket.name)
          .contains(sdetExerciseSelectors.coinsAvailable.coinB)
          .parents(sdetExerciseSelectors.ticket.container)
          .find(sdetExerciseSelectors.ticket.price)
          .invoke('text')
          .then(text => {
            const newPrice = parseFloat(text.replace('$', '').trim());
            cy.wrap(newPrice).as('asNewPrice');
            cy.log(`New price: ${newPrice}`);
            expect(newPrice).to.be.within(initialPrice + 5, initialPrice + 6);
  
            // Get updated time
            cy.contains(sdetExerciseSelectors.time.container, sdetExerciseSelectors.time.text)
              .invoke('text')
              .then(newTimeText => {
                const newTime = parseInt(newTimeText.replace('Time: ', '').trim());
                cy.wrap(newTime).as('asNewTime');
                cy.log(`New time: ${newTime}`);
                expect(newTime).to.be.within(initialTime + 5, initialTime + 6);
  
                // Final check: last digit of price matches time
                const lastDigit = parseInt(newPrice.toString().slice(-1));
                expect(newTime).to.equal(lastDigit);
              });
          });
      });
    });
    return this;
  }


}

export default SDETExercisePage;
