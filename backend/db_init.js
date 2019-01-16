var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));