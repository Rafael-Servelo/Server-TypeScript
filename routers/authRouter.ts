import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

import authController from "../controllers/authControllers";

router.get("/", authController.open);
router.get("/:id", checkToken, authController.openID);
router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/forgot_password", authController.forgot);
router.post("/reset_password", authController.resetPassword);
router.put("/update_user", authController.updateUser);

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET as any;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}

export default router;
