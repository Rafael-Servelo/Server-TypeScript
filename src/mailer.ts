import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from "path";

export const mailer = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { 
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

mailer.use('compile', hbs({
  viewEngine: 'handlebars' as any,
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
}));
