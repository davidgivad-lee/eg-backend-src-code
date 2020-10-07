import express from "express";
import User from "../models/userModel.js";
import { getToken } from "../utils.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      firstName: signinUser.firstName,
      lastName: signinUser.lastName,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: "Email o contraseña incorrecto." });
  }
});

router.post("/signup", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    telNumber: req.body.telNumber,
    password: req.body.password,
    isAdmin: false,
  });
  user
    .save()
    .then((user) =>
      res.send({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telNumber: user.telNumber,
        isAdmin: user.isAdmin,
        token: getToken(user),
      })
    )
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(401).send({
          message: "El email ya esta registrado.",
        });
      }
      return res.status(401).send({ message: "Error al registrar el usuario" });
    });
});

router.get("/createAdmin", async (req, res) => {
  const user = new User({
    firstName: "david",
    lastName: "david",
    email: "david@gmail.com",
    password: "david",
    isAdmin: true,
  });
  user
    .save()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(401).send({
          message: "El email ya esta registrado.",
        });
      }
      return res.status(401).send({ message: "Error al registrar el usuario" });
    });
});

export default router;
