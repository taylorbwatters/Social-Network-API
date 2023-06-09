const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/social-network')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    });