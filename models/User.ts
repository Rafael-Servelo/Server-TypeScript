import mongoose from "mongoose";

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  isAdm: Boolean,
  passwordResetToken: String,
  passwordResetExpires: Date,
} as any);

export default User;
