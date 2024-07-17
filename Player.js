const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./util/database');
const routes = require('./routes/playerRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/player.html');
});

console.log('Loading player routes...');
app.use('/players', routes);

sequelize.sync()
.then(() => {
    console.log('Database schema synchronized');
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    }).on('error', (error) => {
      console.error('Error starting server:', error);
    });
  })
.catch((error) => {
    console.error('Error synchronizing database schema:', error);
  });
