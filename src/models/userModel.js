import mongoose from "mongoose";

const shippingSchema = {
  address: { type: String, required: false },
  extAddress: { type: String, required: false },
  city: { type: String, required: false },
  postalCode: { type: String, required: false },
  province: { type: String, required: false },
};

const invoiceSchema = {
  companyName: { type: String, required: false },
  businessName: { type: String, required: false },
  rut: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
};

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  telNumber: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  shipping: shippingSchema,
  invoice: invoiceSchema,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
