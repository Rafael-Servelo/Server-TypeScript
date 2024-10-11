import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import storeControllers from "../controllers/storeControllers";
import User from "../models/User";

router.get("/", storeControllers.search);
router.get("/products", storeControllers.open);
router.post("/set_product", checkUser, storeControllers.registerProduct);
router.post("/add_favorites", storeControllers.addFavorites);
router.delete("/delete_product", storeControllers.deleteProduct);
router.delete("/remove_favorites", storeControllers.removeFavorites);
router.put("/update_product", checkUser, storeControllers.updateProduct);

async function checkUser(req: Request, res: Response, next: NextFunction) {
  const { email } = req.headers;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  if (!user.isAdm) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Token inválido!" });
  }
}

export default router;
