const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// استخدام JSON لتحليل الطلبات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // لتقديم الملفات الثابتة (CSS, HTML)

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('مرحبًا بك في تطبيقك!');
});

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // بريدك الإلكتروني
    pass: 'your-email-password'   // كلمة المرور الخاصة بك أو "App Password"
  }
});

// نقطة نهاية لتسجيل المستخدمين
app.post('/register', (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    return res.status(400).send('يرجى إدخال جميع البيانات المطلوبة!');
  }

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'تم تسجيلك بنجاح',
    text: `مرحباً ${fullName},\n\nتم تسجيلك في التطبيق باستخدام اسم المستخدم: ${username}.\n\nكلمة المرور الخاصة بك هي: ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('خطأ أثناء إرسال البريد:', error);
      return res.status(500).send('فشل في إرسال البريد الإلكتروني. الرجاء المحاولة مرة أخرى لاحقًا.');
    }
    console.log('رسالة تم إرسالها: ' + info.response);
    res.redirect('/confirmation.html'); // توجيه المستخدم إلى صفحة التأكيد
  });
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`🚀 التطبيق يعمل على: http://localhost:${port}`);
});
