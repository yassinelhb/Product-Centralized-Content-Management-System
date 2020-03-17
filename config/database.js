const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/p2cms",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
    console.log('connected to DB!')
)
