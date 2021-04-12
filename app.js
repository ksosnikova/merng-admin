const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');
const schema = require('./graphql/schema/index')
const graphQlSchema = require('./graphql/schema/TypeDefs');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

const PORT = process.env.PORT || config.get('port') || 8005;

app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);


async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
