import express from "express";
import bodyParser from "body-parser";

import Data from "../data/data.js";
import config from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    console.log("CONECTADO!!!")
  )
  .catch((error) => console.log(error));

const app = express();
//middleware
app.use(bodyParser.json());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("backend up!");
});

app.get("/api/products", (req, res) => {
  res.send(Data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = Data.products.find((x) => x.id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
