const request =require('request-promise');
const cherio = require('cheerio');

const simpleResult ={
    title:"",
    rank:1,
    imdbRating:8.4,
    descriptionUrl :"",
    psotUrl:""
}

async function scrapeImdb(){
    const requestUrl= await request.get('https://www.imdb.com/chart/top/?ref_=nv_mv_250');
    const $ = cherio.load(requestUrl);
    console.log( $('tbody > tr').length)
}
scrapeImdb();