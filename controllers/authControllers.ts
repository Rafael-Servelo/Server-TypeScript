import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { mailer } from "../src/mailer";

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
        from: "No-Reply-LuaMinguante rafael.servelo@gmail.com",
        subject: "Redefinir a senha!",
        html: `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">

        <head>
          <title></title>
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }

            .ReadMsgBody {
              width: 100%;
            }

            .ExternalClass {
              width: 100%;
            }

            .ExternalClass * {
              line-height: 100%;
            }

            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }

            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }

          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
              @-ms-viewport {
                width: 320px;
              }
              @viewport {
                width: 320px;
              }
            }
          </style>
          <!--<![endif]-->
          <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
          <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
          </style>
          <!--<![endif]-->
          <style type="text/css">
            @media only screen and (max-width:595px) {
              .container {
                width: 100% !important;
              }
              .button {
                display: block !important;
                width: auto !important;
              }
            }
          </style>
        </head>

        <body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
            <tbody>
              <tr>
                <td valign="top" align="center">
                  <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                          Lua Minguante
                        </td>
                      </tr>
                      <tr>
                        <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                          <table width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;text-align: center;">
                                  Redefinir Senha
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Esqueceu a senha? Não se preocupe!
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Clique no botão abaixo para redefinir uma nova senha.
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 24px 0;">
                                  <a class="button" href="${
                                    req.protocol
                                  }://${req.get(
          "host"
        )}/?token=${token}" title="Reset Password" style="width: 100%; background: #4C83EE; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Refinir Senha</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px;">
                                  <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Atenciosamente, <br><strong>Lua Minguante</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 0 48px; font-size: 0px;">
                          <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:300px;">      <![endif]-->
                          <div class="outlook-group-fix" style="padding: 0 0 20px 0; vertical-align: top; display: inline-block; text-align: center; width:100%;">
                            <span style="padding: 0; font-size: 11px; line-height: 15px; font-weight: normal; color: #8B949F;">Lua Minguante<br/>Desenvolvido por Rafael Servelo</span>
                          </div>
                          <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>
        `,
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

const resetPassword = async (req: any, res: any) => {
  const { email, token, password, confirmPassword } = req.body;
  const now = new Date();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    if (token !== user.passwordResetToken) {
      res.status(400).send({ msg: "Token inválido!" });
    }

    if (now > user.passwordResetExpires) {
      res
        .status(400)
        .send({
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

    res.status(200).send({ msg: "Senha alterada com sucesso!"});
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
