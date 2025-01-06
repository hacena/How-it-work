const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// استخدام JSON لتحليل الطلبات
app.use(express.json());

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('مرحبًا بك في تطبيقك!');
});

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // ضع بريدك الإلكتروني
    pass: 'your-email-password'   // ضع كلمة المرور الخاصة بك أو "App Password"
  }
});

// نقطة نهاية لتسجيل المستخدمين
app.post('/register', (req, res) => {
  const { fullName, email, username, password } = req.body;

  // التحقق من البيانات المدخلة
  if (!fullName || !email || !username || !password) {
    return res.status(400).send('يرجى إدخال جميع البيانات المطلوبة!');
  }

  // إعداد البريد الإلكتروني
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'تم تسجيلك بنجاح',
    text: `مرحباً ${fullName},\n\nتم تسجيلك في التطبيق باستخدام اسم المستخدم: ${username}.\n\nكلمة المرور الخاصة بك هي: ${password}`
  };

  // إرسال البريد الإلكتروني
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('
