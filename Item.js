const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: { type: String },
  rank: { type: String },
  symbol: { type: String },
  name: { type: String },
  supply: { type: String },
  maxSupply: { type: String },
  marketCapUsd: { type: String },
  volumeUsd24Hr: { type: String },
  priceUsd: { type: String },
  changePercent24Hr: { type: String },
  vwap24Hr: { type: String },
  explorer: { type: String }
});

const ItemModel = mongoose.model('finconecta', itemSchema, 'finconecta');

module.exports = ItemModel;