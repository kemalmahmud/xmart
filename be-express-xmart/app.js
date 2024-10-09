const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./graphql/schema');
const { connectDB } = require('./database/connection');
const createError = require('http-errors');

const app = express();
app.use(express.json());

// Koneksi ke MongoDB
connectDB();

// Gunakan cors middleware
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error
  console.error(err.stack);
  res.status(err.status || 500).send({ status: "error", message: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server GraphQL running at http://localhost:${PORT}/graphql`);
});