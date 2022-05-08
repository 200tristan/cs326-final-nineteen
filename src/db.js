import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class UserDatabase {
    constructor(dburl) {
      this.dburl = dburl;
    }
  
    async connect() {
      this.client = await MongoClient.connect(this.dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
  
      // Get the database.
      this.db = this.client.db('scribblegram');
  
      // Init the database.
      await this.init();
    }
  
    async init() {
      this.collection = this.db.collection('users');
    }
  
    // Close the pool.
    async close() {
      this.client.close();
    }
  
    // CREATE a user in the database.
    async createUser(u) {
      const res = await this.collection.insertOne({ _id: u.uid, name: u.name, password: u.password });
      // Note: the result received back from MongoDB does not contain the
      // entire document that was inserted into the database. Instead, it
      // only contains the _id of the document (and an acknowledged field).
      return res;
    }
  
    // READ a user from the database.
    async readUser(id) {
      const res = await this.collection.findOne({ _id: id });
      if(res.hasOwnProperty('name')) {
        return res;
      }
      else {
        return -1;
      }
    }

    async loginUser(name, password) {
      const res = await this.collection.findOne({ name: name, password: password });
      if(res.hasOwnProperty('name')) {
        return res;
      }
      else {
        return -1;
      }
    }
  
    // UPDATE a user in the database.
    async updateUser(id, name, password) {
      const res = await this.collection.updateOne(
        { _id: id },
        { $set: { name, password } }
      );
      if(res.acknowledged) {
        return 1;
      }
      else {
        return -1;
      }
    }
  
    // DELETE a user from the database.
    async deleteUser(id) {
      // Note: the result received back from MongoDB does not contain the
      // entire document that was deleted from the database. Instead, it
      // only contains the 'deletedCount' (and an acknowledged field).
      const res = await this.collection.deleteOne({ _id: id });
      if(res.acknowledged) {
        return 1;
      }
      else {
        return -1;
      }
    }
  
    // READ all people from the database.
    async readAllUsers() {
      const res = await this.collection.find({}).toArray();
      return res;
    }
  }

export class TotalsDatabase {
    constructor(dburl) {
      this.dburl = dburl;
    }
  
    async connect() {
      this.client = await MongoClient.connect(this.dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
  
      // Get the database.
      this.db = this.client.db('scribblegram');
  
      // Init the database.
      await this.init();
    }
  
    async init() {
      this.collection = this.db.collection('totals');
    }
  
    // Close the pool.
    async close() {
      this.client.close();
    }

    async getTotalUsers() {
      const res = await this.collection.findOne({ _id: 1 });
      console.log(res);
      return parseInt(res.totalCreatedUsers);
    }

    async setTotalUsers(n) {
      const res = await this.collection.updateOne(
        { _id: 1 },
        { $set: { totalCreatedUsers: n } }
      );
    }

    async getTotalImages() {
      const res = await this.collection.findOne({ _id: 2 });
      return parseInt(res.totalCreatedImages);
    }

    async setTotalImages(n) {
      const res = await this.collection.updateOne(
        { _id: 2 },
        { $set: { totalCreatedImages: n } }
      );
    }
  }