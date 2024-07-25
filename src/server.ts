import dotenv from "dotenv";
import "./db";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/server", (req, res) => {
  res.status(200).json({ msg: "O servidor esta rodando!" });
});

import router from "../routers/authRouter";

app.use("/server/auth", router);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`O Servidor esta rodando na porta ${port}`);
});
