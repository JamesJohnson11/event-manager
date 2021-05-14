const mongoose = require('mongoose');
const connectionString = `mongodb+srv://JamesJohnson11:OneWing11@genesis.sgqmj.mongodb.net/Events?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}


module.exports = function () {
    mongoose.connect(connectionString, connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
    }