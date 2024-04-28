const nodemailer = require("nodemailer");

const all_gmail_action_reaction = {
  reactions: {
    "send email": {
      functions: send_mail,
      description: "this reaction send email",
      name: "send email",
      parameter: [
        "receiver to send",
        "email",
        "mesage to write in email",
        "text",
        "the subject to this mail",
        "text",
      ],
    },
  },
  actions: {},
};

async function send_mail(user,to_email, data, subject) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tcheumaniyannarthur@gmail.com",
      pass: "pqldcxktmlgliaob",
    },
  });

  var mailOptions = {
    from: "tcheumaniyannarthur@gmail.com",
    to: to_email,
    subject: subject,
    text: data,
  };
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log("I can't send you an email");
      console.log("let's no go change password");
      console.log(error);
      throw 42;
    }
    console.log("Email sent to " + to_email + ": " + info.response);
  });
}

module.exports = {
  send_mail,
  all_gmail_action_reaction,
};
