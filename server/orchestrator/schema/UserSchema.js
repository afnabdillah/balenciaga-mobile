import axios from "axios";
import redis from "../config/connectRedis.js";

const userTypeDefs = `#graphql

  type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type Query {
    findAllUsers: [User]
    findUserById(id: String!): User
  }

  type Mutation {
    createNewUser(
      username: String,
      email: String!,
      password: String!,
      address: String,
      phoneNumber: String
    ): User
    deleteUserById(id: String!): User
  }
`;

const user_base_url = process.env.USERS_SERVICE_URL || `http://localhost:4001`;

const userResolvers = {
  Query: {
    findAllUsers: async () => {
      try {
        const cache = await redis.get("users");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${user_base_url}/`,
          });
          redis.set("users", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err.response.data);
        return err.response.data;
      }
    },

    findUserById: async (parent, args) => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${user_base_url}/users/${args.id}`,
        });
        return data;
      } catch (err) {
        console.log(err, "<<< ini error");
        throw err;
      }
    },
  },

  Mutation: {
    createNewUser: async (parent, args) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${user_base_url}/register`,
          data: args,
        });
        redis.set("users", "");
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    deleteUserById: async (parent, args) => {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: `${user_base_url}/users/${args.id}`,
          data: args,
        });
        if (!data.value) {
          throw { message: "Data not found" };
        }
        redis.set("users", "");
        return data.value;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

export { userTypeDefs, userResolvers };
