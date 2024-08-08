import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mailer from "../src/mailer";

/**
 * Public Route
 */
const open = async (req: any, res: any) => {
  res.status(200).json({ msg: "The server is running!" });
};

/**
 * Private Route
 */
const openID = async (req: any, res: any) => {
  const id = req.params.id;

  // check if user exists
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
};

/**
 * Register User
 */
const registerUser = async (req: any, res: any) => {
  const { name, email, password, confirmPassword, isAdm } = req.body;

  // validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro email!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create usere
  const user = new User({
    name,
    email,
    password: passwordHash,
    isAdm,
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Erro inesperado no servidor, tente novamente mais tarde!",
    });
  }
};

/**
 * Login User
 */
const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET as any;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({
      msg: "Autenticação realizada com sucesso!",
      userID: user.id,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Forgot Password
 */
const forgot = async (req: any, res: any) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: "rafael.servelo@gmail.com",
        subject: "Redefinir a senha!",
        html: `<p>Você esqueceu sua senha? Não tem problema utilize esse token: ${token}</p>`,
      },
      (err) => {
        if (err) {
          console.log(err)
          return res
            .status(400)
            .send({ msg: "Cannot send forgot password email" });
        }
        return res.send();
      }
    );
  } catch (err) {
    res.status(400).send({ msg: "erro on forgot password, try again" });
  }
};

export default {
  open,
  openID,
  registerUser,
  login,
  forgot,
};
