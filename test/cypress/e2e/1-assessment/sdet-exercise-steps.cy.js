// cypress/support/e2e.js
import '../../support/e2e'; // this line ensures all custom commands are registered
import SDETExercisePage from '../../pages/coin_trading_page/SDETExercisePage';

describe('Front-end Assessment', () => {
  const usdBalance = 1000;
  const initialCoinsOwned = 0;
  const buycoinAmount = 2;
  const coinsOwned = buycoinAmount;
  const sellcoinAmount = 1;
  const page = new SDETExercisePage();

  beforeEach(() => {
    page.visit();
  });

  //assert that you begin with a $1000 USD balance
  it('Check the USD Balance', () => {
    // Verify the initial USD balance: $ 1000
    page.verifyUSDBalance(usdBalance);
  });

  //assert that there are four coin options available
  it('Check the Available Coins Balance', () => {
    // Verify the all of the available coins in the inventory
    page.verifyAvailableCoins();
  });

  //assert that CoinB is incrementing by one dollar over time
  it('Check the CoinB Balance and Time increment', () => {
    // Verify the increment of 1 dollar over time for CoinB
    page.verifyCoinBBalanceAndTimeIncrement();
  });

  //assert "Coins owned" has incremented by the quantity you provided
  it('Buy 3 pcs of Coins', () => {
    // Check initial coins owned
    page.verifyAllInitialCoinsOwned(initialCoinsOwned);
    // Buy coins
    page.buyCoinA(buycoinAmount);
    page.buyCoinB(buycoinAmount);
    page.buyCoinC(buycoinAmount);
    // Verify coins owned after buying
    page.verifyAllCoinsOwned(coinsOwned);
    // Verify if the Market value equals to Calculated Market Value
    page.verifyMarketValueEqualsCoinsPrice();
  });

  //assert "Coins owned" has decremented by the quantity you provided
  it('Sell 1 pcs of Coins', () => {
    page.verifyAllInitialCoinsOwned(initialCoinsOwned);
    page.buyCoinA(buycoinAmount);
    page.getCoinsAOwned()
      .then((storedValue) => {
        cy.log(`Using stored value: ${storedValue}`);
        page.sellCoinA(sellcoinAmount);
        page.verifyCoinsOwnedAfterSell(sellcoinAmount);
      });
  });
});