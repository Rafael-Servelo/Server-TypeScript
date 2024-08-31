/**
 * @author Rafael Servelo
 * @description Projeto realizado para a loja Lua Minguante, onde eu mesmo fiz o front-end e o back-end.
 */

import dotenv from "dotenv";
import "./db";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const baseDir = `${__dirname}/public/`;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(`${baseDir}`));
app.get("/server", (req, res) => res.sendFile("index.html", { root: baseDir }));

import router from "../routers/authRouter";
import storerouter from "../routers/storeRouter";

app.use("/server/auth", router);
app.use("/server/store", storerouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`O Servidor esta rodando na porta ${port}`);
});
