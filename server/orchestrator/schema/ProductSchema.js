import axios from "axios";
import redis from "../config/connectRedis.js";

const product_base_url = process.env.APP_SERVICE_URL || `http://localhost:4002`;

const user_base_url = process.env.USERS_SERVICE_URL || `http://localhost:4001`;

const productTypeDefs = `#graphql

  type Product{
    id: Int
    name: String
    slug: String
    description: String
    material: String
    specifications: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    category: Category
    userMongoId: String
    author: Author
    images: [ProductImage]
  }

  type Category{
    id: Int
    name: String
    slug: String
    categoryImgUrl: String
  }

  type Author{
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type ProductImage{
    id: Int,
    productId: String
    imgUrl: String
  }

  input ProductInput{
    name: String!
    description: String!
    material: String!
    specifications: String!
    price: Int!
    mainImg: String!
    categoryId: Int!
    userMongoId: String!
    images: [String]
  }

  type ResponseMessage{
    message: String
  }

  type Query{
    findAllProducts: [Product]
    findProductById(id: Int!): Product
    searchProducts(search: String): [Product]
    filterProductsByCategory(categoryName : String): [Product]
  }

  type Mutation{
    createNewProduct(input: ProductInput!): Product
    updateProductById(id: Int!, input: ProductInput! ): ResponseMessage
    deleteProductById(id: Int!): ResponseMessage
  }
`;

const productResolvers = {
  Query: {
    findAllProducts: async () => {
      try {
        let cache = await redis.get("products");
        if (cache) {
          console.log("masuk cache");
          return JSON.parse(cache);
        } else {
          console.log("masuk axios");
          const { data } = await axios({
            method: "GET",
            url: `${product_base_url}/customers/products`,
          });
          redis.set("products", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    findProductById: async (_, args) => {
      try {
        let cache = await redis.get(`products#${args.id}`);
        if (cache) {
          console.log("masuk cache");
          return JSON.parse(cache);
        } else {
          console.log("masuk axios");
          const product = (
            await axios({
              method: "GET",
              url: `${product_base_url}/customers/products/${args.id}`,
            })
          ).data;
          const author = (
            await axios({
              method: "GET",
              url: `${user_base_url}/users/${product.userMongoId}`,
            })
          ).data;
          const images = (
            await axios({
              method: "GET",
              url: `${product_base_url}/customers/products/${args.id}/images`,
            })
          ).data;
          redis.set(
            `products#${args.id}`,
            JSON.stringify({ ...product, author, images })
          );
          return { ...product, author, images };
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    searchProducts: async (_, args) => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${product_base_url}/customers/products`,
          params: {
            search: args.search,
          },
        });
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    filterProductsByCategory: async (_, args) => {
      try {
        const cache = await redis.get(`products:${args.categoryName}`);
        if (cache) {
          console.log("masuk cache");
          return JSON.parse(cache);
        } else {
          if (args.categoryName === "ALL") {
            args.categoryName = "";
          }
          const { data } = await axios({
            method: "GET",
            url: `${product_base_url}/customers/products`,
            params: {
              categoryName: args.categoryName,
            },
          });
          redis.set(`products:${args.categoryName}`, JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    createNewProduct: async (_, args) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${product_base_url}/products`,
          data: args.input,
        });
        redis.set("products", "");
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    updateProductById: async (_, args) => {
      try {
        const { data } = await axios({
          method: "PUT",
          url: `${product_base_url}/products/${args.id}`,
          data: args.input,
        });
        redis.set(`products#${args.id}`, "");
        redis.set("products", "");
        return data;
      } catch (err) {
        console.log(err.response.data);
        throw err.response.data;
      }
    },

    deleteProductById: async (_, args) => {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: `${product_base_url}/products/${args.id}`,
        });
        console.log(data, "<<< ini response delete barang");
        redis.set(`products#${args.id}`, "");
        redis.set("products", "");
        return data;
      } catch (err) {
        console.log(err.response.data);
        throw err.response.data;
      }
    },
  },
};

export { productTypeDefs, productResolvers };
