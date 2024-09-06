import mongoose from "mongoose";

const Store = mongoose.model("Store", {
  amount: Number,
  category: String,
  colors: Array<string[]>,
  datePost: Date,
  description: String,
  height: Number, // Altura (cm)
  id: Number,
  images: Array<string[]>,
  length: Number, // Comprimento (cm)
  numberSold: Number,
  numberReview: Number,
  price: String,
  product: String,
  promotion: Boolean,
  rating: Number,
  sizes: Array<string[]>,
  specifications: String,
  tags: Array<string[]>,
  weight: Number, // Peso (kg)
  width: Number,  // Largura (cm)
} as any);

export default Store;
