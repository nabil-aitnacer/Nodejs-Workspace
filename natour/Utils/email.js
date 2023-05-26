const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // Create a transporter
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // define rhe email option
  const mailOptions = {
    from: "Nabil Ait Nacer <nabil@aitnacer.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // actually send the email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail