const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLInt } = require('graphql');

const transactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    _id: { type: GraphQLString },
    qr_code: { type: GraphQLString },
    rfid: { type: GraphQLString },
    product_name: { type: GraphQLString },
    unit_price: { type: GraphQLInt },
    amount: { type: GraphQLInt },
    total_price: { type: GraphQLInt },
    date: { type: GraphQLString }
  }
});

const addTransactionType = new GraphQLInputObjectType({
  name: "AddTransaction",
  description: "Add Transaction Type",
  fields: () => ({
    qr_code: { type: GraphQLString },
    rfid: { type: GraphQLString },
    product_name: { type: GraphQLString },
    unit_price: { type: GraphQLInt },
    amount: { type: GraphQLInt },
  }),
});

module.exports = { addTransactionType, transactionType };