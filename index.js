const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5001;



const uri = "mongodb+srv://toyWorld:oiPfrrdspwNZ6pRk@cluster0.eepi0pq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const toyes = client.db('toyWorld').collection('gelary')
        const cars = client.db('toyWorld').collection('cars')
        const truks = client.db('toyWorld').collection('truks')
        const police = client.db('toyWorld').collection('police')
        const mytoyes = client.db('toyWorld').collection('myToyes')

        app.get('/gelary', async (req, res) => {
            const cursor = toyes.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/cars', async (req, res) => {
            const cursor = cars.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/cars/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await cars.findOne(query)
            res.send(result)
        })
        app.get('/truks', async (req, res) => {
            const cursor = truks.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/truks/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await truks.findOne(query)
            res.send(result)
        })
        app.get('/police', async (req, res) => {
            const cursor = police.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/police/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await police.findOne(query)
            res.send(result)
        })
        app.get('/mytoyes/:id'), async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            console.log(query)
            const result = await mytoyes.findOne(query)
            res.send(result)
        }
        app.get('/mytoyes', async (req, res) => {
            let query = {};
            const sort = req?.query?.sort == 'true' ? 1 : -1;
            if (req.query?.email) {
                query = { name: req.query.email }
            }
            
            const cursor = mytoyes.find(query).sort({ price: sort })
            const result = await cursor.toArray();
            res.send(result)
        }

        )





        app.post('/mytoyes', async (req, res) => {
            const addedToyes = req.body
            const newToyes = await mytoyes.insertOne(addedToyes)
            res.send(newToyes)
        })
        app.delete('/mytoyes/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await mytoyes.deleteOne(query)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('vai ami coltesi tumar pera newa lagbe na')
})
app.listen(port, () => {
    console.log(`the toy is running in port ${port}`)
})
