const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola mundo de apis xxd');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
