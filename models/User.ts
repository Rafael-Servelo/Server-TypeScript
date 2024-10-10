import mongoose from "mongoose";
import { address } from "../src/Templates/Template-User";

const User = mongoose.model("User", {
  address: {
    require: true,
    type: Array<typeof address>,
  },
  avatar: String,
  cpf: {
    require: true,
    type: String,
  },
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  isAdm: Boolean,
  favorites: Array<object>,
  shoppingCart: Array<object>,
  passwordResetToken: String,
  passwordResetExpires: Date,
} as any);

export default User;
