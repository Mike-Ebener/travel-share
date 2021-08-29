const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer')
const router = express.Router();
const cors = require('cors')
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate our Apollo server with the Express application as middleware
// server.applyMiddleware({ app });

// integrate our Apollo server with the Express application as middleware
async function startExpressApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startExpressApolloServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router);

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nitinvemuri@gmail.com",
    pass: "Jaycritch1",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "nitinvemuri@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${username}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});