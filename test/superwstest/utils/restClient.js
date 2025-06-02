import request from 'superwstest';

const BASE_URL = 'http://localhost:3100';

export const purchaseCoin = (coinId, amount) => {
  return request(BASE_URL)
    .post('/purchase-coin')
    .send({ coinId, amount });
};

export const getInventory = () => {
  return request(BASE_URL).get('/get-inventory');
};

export const getCoins = () => {
  return request(BASE_URL).get('/get-coins');
};