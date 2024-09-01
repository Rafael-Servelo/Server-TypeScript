import mongoose from "mongoose";

const Store = mongoose.model("Store", {
  id: Number,
  product: String,
  width: Number,  // Largura (cm)
  height: Number, // Altura (cm)
  length: Number, // Comprimento (cm)
  weight: Number, // Peso (kg)
  datePost: Date,
  images: Array<string[]>,
  tags: Array<string[]>,
  price: String,
  description: String,
  numberSold: Number,
  numberReview: Number,
  promotion: Boolean,
  rating: Number,
  amount: Number,
  category: String,
  specifications: String,
  sizes: Array<string[]>,
  colors: Array<string[]>,
} as any);

export default Store;
