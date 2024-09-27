import { Request, Response } from "express";
import Store from "../models/Store";
import User from "../models/User";

// Search products
const search = async (req: Request, res: Response) => {
  const result = await Store.aggregate([
    {
      $search: {
        index: "search-text",
        phrase: {
          query: req.query.search,
          path: "product",
          // allowAnalyzedField: true
        },
      },
    },
  ]);

  try {
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Erro inesperado no servidor, tente novamente mais tarde!",
    });
  }
};

// Get products
const open = async (req: Request, res: Response) => {
  const store = await Store.find();

  res.status(200).json({ products: store });
};

// Register products
const registerProduct = async (req: Request, res: Response) => {
  const {
    product,
    images,
    description,
    price,
    width,
    height,
    length,
    weight,
    tags,
    promotion,
    amount,
    category,
    specifications,
    sizes,
    colors,
    variations,
  } = req.body;
  let { numberSold, rating, numberReview, discountPrice } = req.body;

  // validations
  if (!product) {
    return res.status(422).json({ msg: "Nome do produto obrigatório!" });
  }

  // check if product exists
  const productExists = await Store.findOne({ product });

  if (productExists) {
    return res
      .status(422)
      .json({ msg: "Este Produto já está cadastrado no sistema!" });
  }

  // check if image exists
  if (!images) {
    return res
      .status(422)
      .json({ msg: "Necessário adicionar imagem do produto!" });
  }

  // check if description exists
  if (!description) {
    return res.status(422).json({ msg: "Descrição do produto obrigatório!" });
  }

  // check if description exists
  if (!price) {
    return res.status(422).json({ msg: "Preço do produto obrigatório!" });
  }

  // check if width exists
  if (!width) {
    return res.status(422).json({ msg: "Largura do produto obrigatório!" });
  }

  // check if height exists
  if (!height) {
    return res.status(422).json({ msg: "Altura do produto obrigatório!" });
  }

  // check if length exists
  if (!length) {
    return res.status(422).json({ msg: "Comprimento do produto obrigatório!" });
  }

  // check if weight exists
  if (!weight) {
    return res.status(422).json({ msg: "Peso do produto obrigatório!" });
  }

  // check if amount exists
  if (!amount) {
    return res.status(422).json({ msg: "Necessário passar a quantidade!" });
  }

  // check if category exists
  if (!category) {
    return res
      .status(422)
      .json({ msg: "Necessário informar a categoria do produto!" });
  }

  if (promotion) {
    if (!discountPrice) {
      return res
        .status(422)
        .json({ msg: "Necessário passar o valor com desconto" });
    }
  }

  // check numberSold exists
  if (!numberSold) {
    numberSold = 0;
  }

  // check rating exists
  if (!rating) {
    rating = 0;
  }

  // check numberReview exists
  if (!numberReview) {
    numberReview = 0;
  }

  // add Date
  const date = new Date();
  const datePost = date;

  // add ID Product
  const id = date.getTime();

  // create product
  const store = new Store({
    amount,
    category,
    colors,
    datePost,
    description,
    discountPrice,
    height,
    id,
    images,
    length,
    numberSold,
    numberReview,
    price,
    product,
    promotion,
    rating,
    sizes,
    specifications,
    tags,
    variations,
    weight,
    width,
  });
  try {
    await store.save();

    res.status(201).json({ msg: "Produto adicionado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Erro inesperado no servidor, tente novamente mais tarde!",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id, email } = req.body;
  const store = await Store.deleteOne({
    id,
  });
  const adm = await User.findOne({ email });

  if (!adm) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  if (!adm.isAdm) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  if (!id) {
    return res.status(422).json({ msg: "A ID do produto é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "Necessário informar o email!" });
  }
  if (store === null) {
    return res.status(422).json({ msg: "ID inválido!" });
  }
  if (store) {
    return res.status(200).json({ msg: "Produto deletado com sucesso!" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.headers;

  // add Date
  const date = new Date();
  let update = req.body;

  update.datePost = date;

  const store = await Store.findOneAndUpdate({ id }, update);

  if (!id) {
    return res.status(422).json({ msg: "A ID do produto é obrigatório!" });
  }

  if (store === null) {
    return res.status(422).json({ msg: "ID inválido!" });
  }

  if (store) {
    return res.status(200).json({ msg: "Produto atualizado com sucesso!" });
  }
};

export default {
  open,
  registerProduct,
  search,
  deleteProduct,
  updateProduct,
};
