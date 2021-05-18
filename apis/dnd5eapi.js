const axios = require('axios');

const dnd5api = axios.create({
  baseURL: 'https://api.open5e.com',
  timeout: 10000,
});

module.exports = dnd5api;
