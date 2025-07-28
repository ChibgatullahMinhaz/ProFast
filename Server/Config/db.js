const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URI;
let db;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    },
});
const connectingDB = async () => {
    try {
        db = client.db('proFast')
        console.log('MongoDB connected with Native driver ✅');

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1)
    }
}

const getDB = () => {
    if (!db) {
        throw new Error('Database not connected!');
    }

    return db;
}

module.exports = {
    connectingDB, getDB
}