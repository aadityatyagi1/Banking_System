
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking System" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
   
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
}
};

// module.exports = sendEmail;


async function sendRegistrationEmail(userEmail,name){
    const subject='Welcome to Banking System';
    const text=`Hello ${name},\n\nThank you for registering at Banking System. We are excited to have you on board. Your account has been successfully created, and you can now access our banking services.`
   const html = `
    <h2>Welcome to Banking System!</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering at Banking System.</p>
    <p>Your account has been successfully created.</p>
    <p>We are excited to have you on board!</p>
    <p>Best Regards,<br>Banking System Team</p>
`;




    await sendEmail(userEmail,subject,text,html);
}


module.exports={
    sendRegistrationEmail
}


