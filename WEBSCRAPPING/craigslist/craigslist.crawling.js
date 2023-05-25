const request = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof';



module.exports.scraperCraigslist = async ()=>{
    try {
        const htmlResult = await request.get(BASE_URL);
        const $ = await cheerio.load(htmlResult);
        console.log(htmlResult);
        console.log("Hello")

    } catch (error) {
        console.error(error);
    }
}