const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.mongoClient = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.mongoClient.connect(error => {
                    if (error) {
                        reject(error);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.mongoClient.db(this.dbName));
                })
            });
        }

        return MongoLib.connection;
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne( data );
        }).then(result => result.insertedId)
    }
}

module.exports = MongoLib;