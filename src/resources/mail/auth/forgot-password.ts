export const forgotPasswordHTML = (req: any, token: string) => {
  let logo = `${req.protocol}://${req.get("host")}/assets/logo-claro-BMZ44_8o.png`;
  let url = `${req.protocol}://${req.get("host")}/esqueci-a-senha?token=${token}`;
  return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      @media only screen and (max-width: 480px) {
        @-ms-viewport {
          width: 320px;
        }
        @viewport {
          width: 320px;
        }
      }
    </style>

    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
    </style>
    <!--<![endif]-->
    <style type="text/css">
      @media only screen and (max-width: 595px) {
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

  <body style="font-family: 'Inter', sans-serif; background: #590232">
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      align="center"
      bgcolor="#590232"
    >
      <tbody>
        <tr>
          <td valign="top" align="center">
            <table
              class="container"
              width="600"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      padding: 48px 0 30px 0;
                      text-align: center;
                      font-size: 14px;
                      color: #f4f4f4;
                    "
                  >
                    <img
                      src="${logo}"
                      width="200"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    class="main-content"
                    style="
                      padding: 48px 30px 40px;
                      color: #000000;
                      border-radius: 30px;
                    "
                    bgcolor="#ffffff"
                  >
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding: 0 0 24px 0;
                              font-size: 18px;
                              line-height: 150%;
                              font-weight: bold;
                              color: #000000;
                              letter-spacing: 0.01em;
                              text-align: center;
                            "
                          >
                            Redefinir Senha
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 0 0 10px 0;
                              font-size: 14px;
                              line-height: 150%;
                              font-weight: 400;
                              color: #000000;
                              letter-spacing: 0.01em;
                            "
                          >
                            Esqueceu a senha? Não se preocupe!
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 0 0 16px 0;
                              font-size: 14px;
                              line-height: 150%;
                              font-weight: 400;
                              color: #000000;
                              letter-spacing: 0.01em;
                            "
                          >
                            Clique no botão abaixo para redefinir uma nova
                            senha.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0 0 24px 0">
                            <a
                              class="button"
                              href="${url}"
                              title="Reset Password"
                              style="
                                width: 100%;
                                background: #005349;
                                text-decoration: none;
                                display: inline-block;
                                padding: 10px 0;
                                color: #fff;
                                font-size: 14px;
                                line-height: 21px;
                                text-align: center;
                                font-weight: bold;
                                border-radius: 50px;
                              "
                              >Refinir Senha</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0 0 16px">
                            <span
                              style="
                                display: block;
                                width: 117px;
                                border-bottom: 1px solid #8b949f;
                              "
                            ></span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 14px;
                              line-height: 170%;
                              font-weight: 400;
                              color: #000000;
                              letter-spacing: 0.01em;
                            "
                          >
                            Atenciosamente, <br /><strong>Lua Minguante</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 0 48px; font-size: 0px">
                    <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:300px;">      <![endif]-->
                    <div
                      class="outlook-group-fix"
                      style="
                        padding: 0 0 20px 0;
                        vertical-align: top;
                        display: inline-block;
                        text-align: center;
                        width: 100%;
                      "
                    >
                      <span
                        style="
                          padding: 0;
                          font-size: 11px;
                          line-height: 15px;
                          font-weight: normal;
                          color: #f4f4f4;
                        "
                        >Lua Minguante<br />Desenvolvido por Rafael
                        Servelo</span
                      >
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
        `;
};
