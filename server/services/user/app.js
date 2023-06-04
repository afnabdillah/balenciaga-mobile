const express = require("express");
const app = express();
const port = 4001;
const {connectToMongoDB} = require("./config/connection");
const UserController = require("./controllers/userController");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/", UserController.findAll);

app.post("/register", UserController.createUser);

app.get("/users/:id", UserController.findById);

app.delete("/users/:id", UserController.deleteById);

app.use(errorHandler);

connectToMongoDB().then(db => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(err => console.log(err));

