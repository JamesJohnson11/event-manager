const express = require('express');
const app = express();
const port = 3000;
const dbSetup = require('./database/dbSetup');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');


require('dotenv').config();


app.use(express.json());


dbSetup();

app.use(eventRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})