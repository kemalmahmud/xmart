const { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull } = require('graphql');
const { transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient }   = require('../../../models/redis');

const DEFAULT_EXPIRATION = 3600;

const getTransactionList = {
  type: new GraphQLList(transactionType),
  async resolve(root, params) {
  // first check in redis
    const cacheValue = await redisClient.get("list-transaction");
    if (cacheValue) {
      const dataJSON = JSON.parse(cacheValue);
      dataJSON.map((data) => {
        data.date = new Date(data.date);
      });
      return dataJSON;
  // if redis empty
    } else {
      const transaction = await TransactionModel.find().lean();
      if (!transaction) {
        throw new Error("Failed to get transaction list");
      }

      transaction.map((data) => {
              data.date = data.date.toISOString().slice(0,10).replace(/-/g,"-");
            });
      redisClient.setEx(
        "list-transaction",
        DEFAULT_EXPIRATION,
        JSON.stringify(transaction)
      );
      return transaction;
    }
  },
};

module.exports = getTransactionList;