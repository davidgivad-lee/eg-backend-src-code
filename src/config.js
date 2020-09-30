import dotenv from "dotenv";

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/lacasacoreana",
};

//mongodb+srv://davidLee:gunwoolee@cluster0.4unxm.mongodb.net/Cluster0?retryWrites=true&w=majority
