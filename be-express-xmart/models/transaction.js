const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  qr_code: String,
  rfid: String,
  product_name : String,
  unit_price: Number,
  amount: Number,
  total_price : Number,
  date: {
    type: Date,
    default: Date.now
  }
}, { collection: 'transactions' });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;