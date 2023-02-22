const reqp= require('request-promise')
const cheerio = require('cheerio')

const url = 'https://realpython.github.io/fake-jobs/';
reqp(url)
.then(function(html){
    const $ = cheerio.load(html);
   
    console.log($('.card-content').length);
    $('.card-content').each(function(i, element) {
      
        console.log($('h2',element).text())
      });
})
.catch(function(error){

})