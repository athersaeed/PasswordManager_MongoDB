import express from 'express'
const app = express()
import { MongoClient, ObjectId } from 'mongodb';import dotenv from 'dotenv'
import bodyParser from 'body-parser'
dotenv.config()
import cors from 'cors'

app.use(cors());

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// Database Name
const dbName = 'passguard';
const dbCollection = 'passwords';

await client.connect();

console.log('Connected successfully to MongoDB server');
const port = 3000
app.use(bodyParser.json());



// Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

// Add a new password or Update existing one
app.post('/', async (req, res) => {
    const passwordData = req.body;
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);

    if (passwordData._id) {
        const id = new ObjectId(passwordData._id);
        delete passwordData._id;
        const updateResult = await collection.updateOne({ _id: id }, { $set: passwordData });
        res.send({ success: true, result: updateResult });
    } else {
        const insertResult = await collection.insertOne(passwordData);
        res.send({ success: true, result: insertResult });
    }
})

// Delete a password by id
app.delete('/', async (req, res) => {
    const passwordData = req.body;
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(passwordData._id) });
    res.send({ success: true, result: deleteResult });
})



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})