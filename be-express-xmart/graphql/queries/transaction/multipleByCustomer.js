const { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLNonNull } = require('graphql');
const { transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient }   = require('../../../models/redis');

const DEFAULT_EXPIRATION = 3600;

const getTransactionListByCustomer = {
  type: new GraphQLList(transactionType),
  args: {
          qrCode: { type: GraphQLString }
        },
  async resolve(root, params) {
    const { qrCode } = params;
    const transaction = await TransactionModel.find({ qr_code : qrCode }).lean();
      if (!transaction) {
        throw new Error("Failed to get transaction list");
    }
    transaction.map((data) => {
      data.date = data.date.toISOString().slice(0,10).replace(/-/g,"-");
    });
    return transaction;
  },
};

module.exports = getTransactionListByCustomer;