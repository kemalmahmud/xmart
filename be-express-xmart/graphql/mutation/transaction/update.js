const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull } = require('graphql');
const { transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient } = require('../../../models/redis');
const axios = require('axios')

const updateTransactionToPostgres = async (transaction) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/transaction",
      transaction
    );
    if (response.status === 200) {
      console.log("Success updated to Postgre");
    }
  } catch (error) {
    console.log(
      "Something wrong",
      error
    );
  }
};

const updateTransaction = {
  type: transactionType,
  args: {
          _id: { type: GraphQLID },
          amount: { type: GraphQLInt }
        },
  async resolve(root, params) {
    const { _id, amount } = params;
    const transactionModel = await TransactionModel.findById(_id).exec();
    console.log(transactionModel);
    transactionModel.amount = amount;
    transactionModel.total_price = transactionModel.unit_price * transactionModel.amount;
    const updatedTransaction = await transactionModel.save();

    if (!updatedTransaction) {
      throw new Error("Something wrong when saving transaction");
    }

    updateTransactionToPostgres(updatedTransaction);
    redisClient.del("list-transaction");
    return updatedTransaction;
  },
};

module.exports = updateTransaction;