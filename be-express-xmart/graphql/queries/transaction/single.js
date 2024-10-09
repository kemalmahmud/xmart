const { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull } = require('graphql');
const { transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient }   = require('../../../models/redis');

const DEFAULT_EXPIRATION = 3600;

const getTransaction = {
  type: transactionType,
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  async resolve(root, params) {
    const cacheValue = await redisClient.get("transaction-" + params.id);
    if (cacheValue) {
      const dataJSON = JSON.parse(cacheValue);
      dataJSON.date = new Date(dataJSON.date);
      return dataJSON;
    } else {
      const transaction = await TransactionModel.findById(params.id).lean();
      if (!transaction) {
        throw new Error("Failed to get transaction with id: " + params.id);
      }
      redisClient.setEx(
        `transaction-${params.id}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(transaction)
      );
      return transaction;
    }
  },
};

module.exports = getTransaction;