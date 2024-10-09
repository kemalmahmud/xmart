const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull } = require('graphql');
const { addTransactionType, transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient } = require('../../../models/redis');
const axios = require('axios')

const storeTransactionToPostgres = async (transaction) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/transaction",
      transaction
    );
    if (response.status === 200) {
      console.log("Success stored to Postgre");
    }
  } catch (error) {
    console.log(
      "Something wrong",
      error
    );
  }
};

const storeTransaction = {
  type: transactionType,
  args: {
    data: {
      name: "transactionData",
      type: new GraphQLNonNull(addTransactionType),
    },
  },
  async resolve(root, params) {
    const transactionModel = new TransactionModel(params.data);
    transactionModel.total_price = transactionModel.unit_price * transactionModel.amount;
    const newTransaction = await transactionModel.save();

    if (!newTransaction) {
      throw new Error("Something wrong when saving transaction");
    }

    console.log("data : ", newTransaction);
    storeTransactionToPostgres(newTransaction);
    redisClient.del("list-transaction");
    return newTransaction;
  },
};

module.exports = storeTransaction;