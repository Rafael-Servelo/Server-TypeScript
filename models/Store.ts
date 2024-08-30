import mongoose from "mongoose";

const Store = mongoose.model("Store", {
  id: Number,
  product: String,
  datePost: Date,
  images: Array<string[]>
} as any);

export default Store;
