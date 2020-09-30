import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "david",
      email: "david@gmail.com",
      password: "david",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
