const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "postmaster@jgabrielf.com.br",
    pass: "a883e65a092e457cca9b83b2bfbc7e37-53ce4923-32de725a",
  },
});

module.exports = transporter;
