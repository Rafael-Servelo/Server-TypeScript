import mongoose from "mongoose";

const Store = mongoose.model("Store", {
  amount: Number,
  category: String,
  colors: Array<string[]>,
  datePost: Date,
  description: String,
  discountPrice: Number,
  height: Number, // Altura (cm)
  id: Number,
  images: Array<string[]>,
  length: Number, // Comprimento (cm)
  numberSold: Number,
  numberReview: Number,
  price: Number,
  product: String,
  promotion: Boolean,
  rating: Number,
  sizes: Array<string[]>,
  specifications: String,
  tags: Array<string[]>,
  variations: Array<string>,
  weight: Number, // Peso (kg)
  width: Number,  // Largura (cm)
} as any);

export default Store;
