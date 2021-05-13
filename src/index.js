const express = require('express');
const app = express();
const port = 3000;
const dbSetup = require('./database/dbSetup');


dbSetup();

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})