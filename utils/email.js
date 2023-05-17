const nodemailer = require('nodemailer');
module.exports.mail=async function(email,otp,name) {
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'satesh7415@gmail.com',
    pass: 'dpedwbendskfgdqw',
  }
});

let mailOptions = {
  from: "pitchgooglid@gmail.com",
  to: email,
  subject: 'This Mail Created By Satish Tiwari',
  html: ` Welcome ${name} To Our Application  <br>
        And This Is Your Code =${otp}  ` 
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});
}