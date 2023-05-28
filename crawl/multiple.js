const axios = require("axios");
const cheerio = require("cheerio");

// Define the websites to scrape
const websitesNewsSouthAfrica = [
  {
    base_url :"https://www.news24.com/",
    url: "https://www.news24.com/news24/southafrica",
    scraper: scrapeNews24,
  }

]
// Call the scraper method for each website
websitesNewsSouthAfrica.forEach(async (website) => {

});
    
   
// Define the scraper method for example.com
async function scrapeNews24() {
    const html = await axios.get(websitesNewsSouthAfrica.url);
    const $ = await cheerio.load(html.data);
    console.log($);

  const elements = $('.article-item');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const title = $(element).find('div > a > span').text();
    const srcUrl = $(element).find('div > a').attr('href');
    console.log(title);
  
    break
  
    
  
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
