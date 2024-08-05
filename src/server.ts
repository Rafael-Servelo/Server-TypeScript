import dotenv from "dotenv";
import "./db";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const baseDir = `${__dirname}/public/`

app.use(cors());
app.use(express.json());
app.use(express.static(`${baseDir}`))
app.get('/server', (req, res) => res.sendFile('index.html' , { root : baseDir } ))

import router from "../routers/authRouter";

app.use("/server/auth", router);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`O Servidor esta rodando na porta ${port}`);
});
