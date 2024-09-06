import express from "express";
const router = express.Router();

import storeControllers from "../controllers/storeControllers";
import User from "../models/User";

router.get("/", storeControllers.search);
router.get("/products", storeControllers.open);
router.post("/set_product", checkUser, storeControllers.registerProduct);
router.delete('/delete_product', storeControllers.deleteProduct)


async function checkUser(req: any, res: any, next: any) {
  const authHeader = req.headers;
  const user = await User.findOne({ email: authHeader.email });

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
