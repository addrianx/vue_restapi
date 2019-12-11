const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// instansiasi app
const app = express();

// Middleware ( panggil depedencies kedalam core)
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server starting on port ${port}`));