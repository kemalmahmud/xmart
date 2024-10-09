const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull } = require('graphql');
const { addTransactionType, transactionType } = require('../../types/transactionType');
const TransactionModel = require('../../../models/transaction');
const { redisClient } = require('../../../models/redis');

const removeTransactionFromPostgres = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/api/transaction/" + id,
      null
    );
    if (response.status === 200) {
      console.log("Success remove from Postgre");
    }
  } catch (error) {
    console.log(
      "Something wrong",
      error
    );
  }
};

const removeTransaction = {
    type : transactionType,
    args : {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const transaction = TransactionModel.findByIdAndRemove(params.id).exec();
        if (!transaction) {
            throw new Error('Something wrong while deleting transaction');
        }
        removeTransactionFromPostgres(id);
        redisClient.del(`transaction-${params.id}`);
        return transaction;
    }
}

module.exports = removeTransaction;