const { getDB } = require("../config/connection");
const { ObjectId } = require("mongodb");

class User {
  static getUsersCollection() {
    const db = getDB();
    const usersCollection = db.collection("users");
    return usersCollection;
  }

  static findAll() {
    const usersCollection = User.getUsersCollection();
    return usersCollection.find({}, { projection: { password: 0 } }).toArray();
  }

  static async createUser(body) {
    const usersCollection = User.getUsersCollection();
    const {insertedId} = await usersCollection.insertOne({...body, role : "admin"});
    return this.findById(insertedId);
  }

  static findById(id) {
    id = new ObjectId(id);
    const usersCollection = User.getUsersCollection();
    return usersCollection.findOne(
      { _id: id },
      { projection: { password: 0 } }
    );
  }

  static deleteById(id) {
    id = new ObjectId(id);
    const usersCollection = User.getUsersCollection();
    return usersCollection.findOneAndDelete(
      {_id : id},
      { projection: { password: 0 } }
    )
  }
}

module.exports = User;
