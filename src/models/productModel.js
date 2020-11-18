import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameDetail: { type: String, required: false },
  description: { type: String, required: true },
  price: { type: String, required: true },
  wholePrice: { type: String, required: false },
  rating: { type: Number, default: 0, required: false },
  colors: { type: [String], required: false },
  category: { type: String, required: true },
  length: { type: String, required: false },
  width: { type: String, required: false },
  height: { type: String, required: false },
  photos: { type: [String], required: true },
  numReviews: { type: Number, default: 0, required: false },
  // reviews: [reviewSchema],
});

const productModel = mongoose.model("Product", prodctSchema);

export default productModel;
