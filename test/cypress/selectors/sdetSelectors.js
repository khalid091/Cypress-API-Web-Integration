// Selectors for SDET Exercise Page
const sdetExerciseSelectors = {
    // Balance related selectors
    usdBalance: {
        container: 'div',
        text: 'USD Balance:'
    },
    
    // Ticket related selectors
    ticket: {
        name: '.ticket-name',
        price: '.ticket-price',
        container: '.ticket.bordered',
        buyButton: '.action-button:first-of-type',
        sellButton: '.action-button:last-of-type'
    },
    
    // Time related selectors
    time: {
        container: 'div',
        text: 'Time:'
    },
    
    // Coin specific selectors
    coinsAvailable: {
        coinA: 'CoinA',
        coinB: 'CoinB',
        coinC: 'CoinC',
        coinD: 'CoinD',
    },

    // Coin Purchase Input Selectors
    coinPurchaseInput: {
        container: '.purchase-input.mt',           // Targets the input with both classes
        input: 'input.purchase-input.mt',          // Directly targets the input element
    },

    // Coins owned Selectors
    coinsOwned: {
        container: 'div',
        text: 'Coins owned:',
    },

    // Inventory Selectors
    inventorySelectors: {
        container: '.inventory-item', // can be use to target each inventory item specially in CoinsOwned
    },

    // Market Value Selectors
    marketValue: {
        container: '.amount-owned',
        text: 'Market Value:'
    }

};

export { sdetExerciseSelectors }; 