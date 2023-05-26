const Express = require('express');
const app = Express();
const PORT = 3500
const cheerio = require("cheerio")
const axios = require("axios")

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})