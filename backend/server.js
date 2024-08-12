const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'bannerDB',
  authPlugins: {
    mysql_native_password: () => () => mysql.authPlugins.mysql_native_password,
  }
});


db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banners WHERE id = 1', (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.post('/api/banner', (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  db.query(
    'UPDATE banners SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1',
    [description, timer, link, isVisible],
    (err, result) => {
      if (err) throw err;
      res.send({ message: 'Banner updated' });
    }
  );
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
