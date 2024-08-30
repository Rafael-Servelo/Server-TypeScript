import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function main() {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@authjwt.hzsrodm.mongodb.net/?retryWrites=true&w=majority&appName=AuthJWT`
  );
  console.log("Banco de dados conectado!");
}

main().catch((err) => console.log(err));

export default main;
