const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.mongoClient = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            w: 'majority'
            });
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
        return this.connect()
        .then(db => {
            return db.collection(collection).insertOne( data );
        })
        .then(result => {
            const answer = {
                id: result.insertedId,
                response: true
            }
            return answer
        })
        .catch( () => {
            return {response : false}
        });
    }

    async update( collection, id, data) {
        try {
            const db =  await this.connect();
            const response = await db.collection(collection).updateOne({ documento: id}, { $set: data }, { upsert: true });
            const answer = {
                                id: response.insertedId,
                                response: true
                            }
            return answer;
        } catch (error) {
            console.log(error);
            return error;
        }
       
    }
    
    getSaldo(collection, documento) {
        return this.connect()
        .then( (db) => {
            console.log(documento);
            return db.collection(collection).findOne({ documento : documento});
        })
        .then(result => {
            const answer = {
                clienteInfo: result,
                response: true
            }
            return answer
        })
        .catch( () => {
            return {response : false}
        });
    }

    generateSession(collection, documento) {
        return this.connect()
        .then( (db) => {
            console.log(documento);
            return db.collection(collection).findOne({ documento : documento});
        })
        .then(result => result._id)
    }

    giveTokenPay(collection, token) {
        return this.connect()
        .then( (db) => {
            
            return db.collection(collection).findOne({ token : token});
        })
        .then(result => {
            return {
                ...result,
                sesionUser : ObjectId(result['sesion'])
            }
        })
    }
    
}

module.exports = MongoLib;