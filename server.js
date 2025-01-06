const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json()); // لتحليل JSON من الطلبات

app.get('/', (req, res) => {
  res.send('مرحبًا بك في تطبيقك!');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // ضع هنا بريدك الإلكتروني
    pass: 'your-email-password'   // ضع هنا كلمة المرور
  }
});

app.post('/register', (req, res) => {
  const { fullName, email, username, password } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'تم تسجيلك بنجاح',
    text: `مرحباً ${fullName},\n\nتم تسجيلك في التطبيق باستخدام اسم المستخدم: ${username}.\n\nكلمة المرور الخاصة بك هي: ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('رسالة تم إرسالها: ' + info.response);
    res.send('تم تسجيلك بنجاح! تحقق من بريدك الإلكتروني.');
  });
});

app.listen(port, () => {
  console.log(`التطبيق يعمل على http://localhost:${port}`);
});
