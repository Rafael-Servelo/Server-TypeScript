/**
 * @author Rafael Servelo
 * @description Projeto realizado para a loja Lua Minguante.
 */
import "./db";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "../routers/authRouter";
import storerouter from "../routers/storeRouter";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const app = express();
const baseDir = `${__dirname}/public/`;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  path: "/server/socket.io",
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(`${baseDir}`));
app.get("/server", (req, res) => res.sendFile("index.html", { root: baseDir }));

app.use("/server/auth", router);
app.use("/server/store", storerouter);

const port = process.env.PORT ?? 3000;

io.on("connection", (socket)=>{
  console.log(`Client connected ${socket.id}!`)

  socket.on("disconnect", ()=>{
    console.log(`Client ${socket.id} as disconnected!`)
  })
})

httpServer.listen(port, () => {
  console.log(`O Servidor esta rodando na porta ${port}`);
});
