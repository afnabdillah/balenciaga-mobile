const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const UserController = require("./controllers/userController");
const ProductController = require("./controllers/productController");
const CategoryController = require("./controllers/categoryController");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const adminAuth = require("./middlewares/adminAuth");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: `App service is running on PORT ${port}!`,
    database_url: process.env.DATABASE_URL,
  });
});

app.post("/register", UserController.register);

app.post("/login", UserController.login);

// Requires admin auth

app.get("/products", adminAuth, ProductController.getProducts);

app.post("/products", ProductController.insertProduct);

app.get("/products/:id", adminAuth, ProductController.getProductDetails);

app.get("/products/:id/images", adminAuth, ProductController.getProductImages);

app.put("/products/:id", ProductController.editProduct);

app.delete("/products/:id", ProductController.deleteProduct);

app.get("/categories", adminAuth, CategoryController.getCategories);

app.get("/categories/:id", adminAuth, CategoryController.getCategoryDetails);

app.post("/categories", adminAuth, CategoryController.insertCategories);

app.put("/categories/:id", adminAuth, CategoryController.editCategories);

app.delete("/categories/:id", adminAuth, CategoryController.deleteCategories);

app.get("/customers/products", ProductController.getProducts);

app.get("/customers/products/:id", ProductController.getProductDetails);

app.get("/customers/products/:id/images", ProductController.getProductImages);

app.get("/customers/categories", CategoryController.getCategories);

app.get("/customers/categories/:id", CategoryController.getCategoryDetails);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Harga gorengan satu biji sekarang ${port} gara-gara Ramadhan`);
});
