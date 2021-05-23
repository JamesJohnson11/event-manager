const express = require('express');
const app = express();
const port = 3000;
const dbSetup = require('./database/dbSetup');

// REQUIRE ROUTES
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');


// SEEDERS
const { seedAdmin } = require('./seeders/admin');
//console.log(seedAdmin());

require('dotenv').config();


app.use(express.json());

// SETUP DB
dbSetup();

app.use(eventRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})