const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sem9k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db(`cleanCo`).collection(`service`);

    // service get api

    app.get("/get-service", async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // With try catch block

    // app.post("/add-service", async (req, res) => {
    //   try {
    //     const newService = req.body;
    //     const result = await servicesCollection.insertOne(newService);
    //     res.send({ status: true, result: result });
    //   } catch (error) {
    //     res.send({ status: false, error });
    //   }
    // });

    // Without try-catch block

    app.post("/add-service", async (req, res) => {
      const newService = req.body;
      const result = await servicesCollection.insertOne(newService);
      res.send(result);
    });

    // body
    app.get("/dummy-route/user2", async (req, res) => {
      const data = req.body;

      res.json(data);
    });

    // Query

    app.get("/dummy-route/user", async (req, res) => {
      const { name, age } = req.query;

      //   console.log(data);
      console.log(name);
      console.log(age);
      res.json(name);
    });

    // param
    app.get("/dummy-route/user/:id", async (req, res) => {
      const { id } = req.params;

      //   console.log(id);
      res.json(id);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running `Clean Co.` Server");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
