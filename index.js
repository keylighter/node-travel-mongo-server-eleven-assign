const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb
//user- Travel
//pass - XI3836hkExi7DThR


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u7kce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Travel");
        const offerCollection = database.collection("offers");


        //GET API - 

        app.get('/offers', async (req, res) => {
            const cursor = offerCollection.find({});
            const offers = await cursor.toArray();
            res.send(offers);
        })





    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World !!');

});


app.listen(port, () => {
    console.log(`Running the app at port no : ${port}`);
});
