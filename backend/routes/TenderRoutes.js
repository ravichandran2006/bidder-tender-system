const express = require('express');
const multer = require('multer');
const path = require('path');
const TenderUser = require('../models/TenderUser');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// @route POST /api/tender/signup
router.post('/signup', upload.single('proof'), async (req, res) => {
  const { name, email, password } = req.body;
  const proofFile = req.file ? req.file.filename : '';

  try {
    const newUser = new TenderUser({ name, email, password, proofFile });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful. Awaiting verification.' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed.' });
  }
});

// POST /api/tender/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await TenderUser.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});


// @route GET /api/tender/users
router.get('/users', async (req, res) => {
  try {
    const users = await TenderUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;

