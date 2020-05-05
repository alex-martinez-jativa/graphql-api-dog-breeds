if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process
const { GraphQLServer } = require('graphql-yoga')
const cors = require('cors')
const { mongoose } = require('data')
const typeDefs = require('./typeDefs')
const Query = require('./resolvers/Query')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {

    const options = {
        endpoint: '/graphql',
        port: port
    }

    const server = new GraphQLServer({
        typeDefs: typeDefs,
        resolvers: {
            Query
        }
    })

    server.express.use(cors())
    
    server.start(options, ({ port }) =>
  console.log(`Server started, listening on port ${port} for incoming requests.`,),)
})
.catch((err) => console.error(err))