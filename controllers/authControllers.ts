import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { mailer } from "../src/mailer";
import { forgotPasswordHTML } from "../src/resources/mail/auth/forgot-password";
import { Request, Response } from "express";

/**
 * Public Route
 */
const open = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "The server is running!" });
};

/**
 * Private Route
 */
const openID = async (req: Request, res: Response) => {
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
const registerUser = async (req: Request, res: Response) => {
  const {
    address,
    avatar,
    cpf,
    confirmPassword,
    email,
    isAdm,
    name,
    phone,
    password,
  } = req.body;

  // validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!cpf) {
    return res.status(422).json({ msg: "O cpf é obrigatório!" });
  }
  if (!phone) {
    return res.status(422).json({ msg: "O número de telefone é obrigatório!" });
  }
  if (!address) {
    return res.status(422).json({ msg: "Necessário informar o endereço!" });
  }
  if (password.length < 8) {
    return res
      .status(422)
      .json({ msg: "A senha deve conter no mínimo 8 caracteres!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // check if user exists
  const userExists = await User.findOne({ cpf });
  const emailExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ msg: "Este usuário ja existe no sistema!" });
  }
  if (emailExists) {
    return res.status(422).json({ msg: "Este usuário ja existe no sistema!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create usere
  const user = new User({
    avatar,
    name,
    email,
    cpf,
    phone,
    address,
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
const login = async (req: Request, res: Response) => {
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
const forgot = async (req: Request, res: Response) => {
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
        from: "Lua-Minguante-No-Reply mailtrap@luaminguante.store",
        subject: "Redefinir a senha!",
        html: forgotPasswordHTML(req, token),
      },
      (err: any) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ msg: "Não é possível enviar e-mail com senha esquecida!" });
        }
        return res.status(200).send({ msg: "Email enviado com sucesso!" });
      }
    );
  } catch (err) {
    res.status(400).send({ msg: "Erro em esqueci a senha, tente novamente!" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, token, password, confirmPassword } = req.body;
  const now = new Date();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({ msg: "Token inválido!" });
    }

    if (now > user.passwordResetExpires) {
      return res.status(400).send({
        msg: "Token expirado, gere uma nova solicitação de resetar a senha!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ msg: "As senhas não conferem!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;

    await user.save();

    res.status(200).send({ msg: "Senha alterada com sucesso!" });
  } catch (err) {
    res.status(400).send({ msg: "Erro em resetar a senha, tente novamente!" });
  }
};

export default {
  open,
  openID,
  registerUser,
  login,
  forgot,
  resetPassword,
};
