require('dotenv').config();
const express = require('express');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { message: null });
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.render('index', { message: 'All fields are required' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    const msg = err && err.code === 'ER_DUP_ENTRY' ? 'Email already registered' : 'Database error';
    res.render('index', { message: msg });
  }
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id DESC');
    res.render('users', { users: rows });
  } catch (err) {
    console.error(err);
    res.send('Database error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
