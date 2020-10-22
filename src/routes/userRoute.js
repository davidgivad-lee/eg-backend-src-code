import express from "express";
import User from "../models/userModel.js";
import { getToken, isAuth } from "../utils.js";

const router = express.Router();

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.telNumber = req.body.telNumber || user.telNumber;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.shipping = req.body.shipping || user.shipping;
    user.invoice = req.body.invoice || user.invoice;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      telNumber: updatedUser.telNumber,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      shipping: updatedUser.shipping,
      invoice: updatedUser.invoice,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

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
      shipping: signinUser.shipping,
      invoice: signinUser.invoice,
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
    shipping: {},
    invoice: {},
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
        shipping: user.shipping,
        invoice: user.invoice,
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
