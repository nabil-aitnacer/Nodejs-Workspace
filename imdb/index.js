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
    const $ = await cherio.load(requestUrl);
   const movies = $('tr').map((i,element)=>{
    const title = $(element).find('td.titleColumn > a').text();
    const imdbRating = $(element).find('td.ratingColumn.imdbRating ').text().trim() ;

    return {
        title, imdbRating
    }
   }).get()
   console.log(movies);
   
   
}
scrapeImdb();