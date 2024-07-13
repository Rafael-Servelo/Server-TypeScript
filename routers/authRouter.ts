import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import authController from "../controllers/authControllers";

router.get("/", authController.open);
router.get("/:id", checkToken, authController.openID);
router.post("/register", authController.registerUser);
router.post("/login", authController.login);

function checkToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  console.log("teste:");
  if (!token) {
    console.log("teste1:");
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    console.log("teste2:");
    const secret = process.env.SECRET as any;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    console.log("teste3:");
    console.error(error);
    res.status(400).json({ msg: "Token inválido!" });
  }
}

export default router;
