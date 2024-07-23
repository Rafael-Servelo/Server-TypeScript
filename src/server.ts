import dotenv from "dotenv";
import "./db";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

const allowedDomains = [
  "https://luaminguante.onrender.com",
  "http://www.luaminguante.store/",
  "http://192.168.18.7:8080",
  "http://192.168.18.7:8080",
];

app.use(
  cors({
    origin: function (origin: any, callback) {
      const allowed = allowedDomains.includes(origin);
      callback(null, allowed);
    },
  })
);

app.use(express.json());
app.use(express.static(__dirname + '/../public'))

import router from "../routers/authRouter";

app.use("/auth", router);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(
  {
    host: "0.0.0.0",
    port: port,
  },
  () => {
    console.log(`O Servidor esta rodando na porta ${port}`);
  }
);
