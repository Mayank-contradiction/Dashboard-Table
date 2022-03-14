const mongoose = require('mongoose');

const getDatabaseConnection = ()=>{
    mongoose.connect(process.env.DB_URI, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useCreateIndex: true
}).then((con) => console.log(`Connection Established...`))
.catch((err) => console.log(err));
}

module.exports = getDatabaseConnection;