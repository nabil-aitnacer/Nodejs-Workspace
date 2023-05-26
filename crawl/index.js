const axios = require('axios');
const cheerio = require('cheerio');
const URL = "https://scrapeme.live/shop/?orderby=popularity";
let list = [];
const fs = require('fs');
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

mainCrawl()