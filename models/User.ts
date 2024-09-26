import mongoose from "mongoose";
import { address } from "../src/Templates/Template-User";

const User = mongoose.model("User", {
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  cpf: {
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
  address: {
    require: true,
    type: Array<typeof address>,
  },
  isAdm: Boolean,
  passwordResetToken: String,
  passwordResetExpires: Date,
} as any);

export default User;
