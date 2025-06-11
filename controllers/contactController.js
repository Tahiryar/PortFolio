const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Email transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: "fpzfesratvcjbqhy"
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact submission error:', err.message);
    res.status(500).send('Server Error');
  }
};
