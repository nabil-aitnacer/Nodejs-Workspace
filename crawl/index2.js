const axios = require('axios');
const cheerio = require('cheerio');
const URL = "https://scrapeme.live/shop/?orderby=popularity";
let list = [];
const fs = require('fs');
const ts = require('./controller/south_africa/sa.controller')
const path = require('path');

const outputFilePath = path.join(__dirname, 'output.json');
async function mainCrawl() {
  const html = await axios.get(URL);
  const $ = await cheerio.load(html.data);

  const elements = $('ul > li.product');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const title = $(element).find('h2').text();
    const price = $(element).find('.woocommerce-Price-amount.amount').text();
    const imageUrl = $(element).find('img').attr('src').replace("-350x350.png",".png");
    const url = $(element).find('a:first-child').attr('href');
    
    const html2 = await axios.get(url);
    const $2 = await cheerio.load(html2.data);
    const description = $2('div.woocommerce-product-details__short-description > p').text();
    
    let product = {
      title,
      price,
      imageUrl,
      url,
      description
    };
    
  
    list.push(product);
  }
  const jsonContent = JSON.stringify(list, null, 2);


  console.log("List length:", list.length);
  fs.writeFile(outputFilePath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been written successfully.');
    }
  });
}


// Define the websites to scrape
const websitesNewsSouthAfrica = [
  {
    base_url :"https://www.news24.com/",
    url: "https://www.news24.com/news24/southafrica",
    scraper: scrapeNews24,
  }

];
// Call the scraper method for each website
websitesNewsSouthAfrica.forEach(async (website) => {

});
    
   
// Define the scraper method for example.com
async function scrapeNews24() {
    let html = await axios.get(websitesNewsSouthAfrica[0].url);
    let $ = await cheerio.load(html.data);
    console.log($);

  const elements = $('.article-item');
  let haveBase = true;
  

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const title = $(element).find('div > a > span').text();
    const article_image_src_url =$(element).find('.featured__content > a > img').attr('src');
    const article_url =(element).find('.featured__content > a').attr('href')
    console.log(article_url);
  
    
    
  
  }
  
}
scrapeNews24()
const article = {
  status: "ok",
  totalResults: 7858,
  articles: [
    {
      source: {
        id: null,
        name: "Biztoc.com",
      },
      author: "nbcnews.com",
      title:
        "Ford EVs will use Tesla charging tech in surprise partnership between rival automakers",
      description:
        "DETROIT — Ford Motor will partner with Tesla on charging initiatives for its current and future electric vehicles in an unusual tie-up between the two rivals, CEOs of the automakers announced Thursday. Under the agreement current Ford owners will be granted a…",
      url: "https://biztoc.com/x/265b8295ce76bf84",
      urlToImage: "https://c.biztoc.com/p/265b8295ce76bf84/og.webp",
      publishedAt: "2023-05-26T15:00:24Z",
      content:
        "DETROIT Ford Motor will partner with Tesla on charging initiatives for its current and future electric vehicles in an unusual tie-up between the two rivals, CEOs of the automakers announced Thursday.… [+307 chars]",
    },
  ],
};
