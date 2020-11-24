import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";

import config from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import productRoute from "./routes/productRoute.js";

const __dirname = path.resolve();

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
app.use("/api/uploads", uploadRoute);
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.log(err.field);
    console.log(err);
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(401).send({
        error: "Tamaño de archivo excedido. El tamaño máximo es 1MB.",
      });
    } else {
      res.status(401).send({
        error: "Tipo de archivo inválido. Deber ser de tipo PNG,JPG,JPEG",
      });
    }
  } else next();
});

app.get("/", (req, res) => {
  res.send("backend up!");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
