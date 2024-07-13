import mongoose from "mongoose";


const User = mongoose.model("User", {
    name: String,
    email: String,
    password: String
} as any)

export default User