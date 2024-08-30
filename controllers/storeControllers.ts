import Store from "../models/Store";

const open = async (req: any, res: any) => {
  const store = await Store.find();

  res.status(200).json({ products: store });
};

const registerProduct = async (req: any, res: any) => {
  const { product, images } = req.body;

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

  if(!images){
    return res.status(422).json({ msg: "Necessário adicionar imagem do produto!" });
  }

  const date = new Date();

  const datePost = date;
  const id = date.getTime();

  // create product
  const store = new Store({
    product,
    images,
    datePost,
    id,
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

export default {
  open,
  registerProduct,
};
