// cypress/support/e2e.js
import '../../support/e2e'; // this line ensures all custom commands are registered
import SDETExercisePage from '../../pages/coin_trading_page/SDETExercisePage';

describe('Front-end Assessment', () => {
  const usdBalance = 1000;
  const initialCoinsOwned = 0;
  const buycoinAmount = 1;
  const coinsOwned = buycoinAmount;
  const sellcoinAmount = 1;
  const page = new SDETExercisePage();

  beforeEach(() => {
    page.visit();
  });

  //assert that you begin with a $1000 USD balance
  it('Check the USD Balance', () => {
    page.validateUSDBalance(usdBalance);
  });

  //assert that there are four coin options available
  it('Check the Available Coins Balance', () => {
    page.validateAvailableCoins();
  });

  //assert that CoinB is incrementing by one dollar over time
  it('Check the CoinB Balance and Time increment', () => {
    page.validateCoinBBalanceAndTimeIncrement();
  });

  //assert "Coins owned" has incremented by the quantity you provided
  it('Buy 3 pcs of Coins', () => {
    page.verifyAllInitialCoinsOwned(initialCoinsOwned);
    page.buyCoinA(buycoinAmount);
    page.buyCoinB(buycoinAmount);
    page.buyCoinC(buycoinAmount);
    page.verifyAllCoinsOwned(coinsOwned);
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