import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from "path";

const { host, port, user, pass } = require("../models/Mail.json");

const mailer = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

mailer.use('compile', hbs({
  viewEngine: 'handlebars' as any,
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
}))

export default mailer;
