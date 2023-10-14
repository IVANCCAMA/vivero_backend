const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Node.js Rest Apis with Express, Sequelize & PostgreSQL');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
