const puppeteer = require("puppeteer");
const fs = require("fs");

const path = require("path");
const websitesNewsSouthAfrica = {
  base_url: "https://www.news24.com/",
  url: "https://www.news24.com/news24/southafrica",
};
const article = {
  articles: [
    {
      source: {
        name: "Biztoc.com",
      },

      title:
        "Ford EVs will use Tesla charging tech in surprise partnership between rival automakers",
      short_description:
        "DETROIT — Ford Motor will partner with Tesla on charging initiatives for its current and future electric vehicles in an unusual tie-up between the two rivals, CEOs of the automakers announced Thursday. Under the agreement current Ford owners will be granted a…",
      article_url: "https://biztoc.com/x/265b8295ce76bf84",
      article_image_src: "https://c.biztoc.com/p/265b8295ce76bf84/og.webp",
      publishedAt: "2023-05-26T15:00:24Z",
    },
  ],
};



module.exports = {
  scrapeNews24: async () => {
    const browser = await puppeteer.launch({ headless: true });
    let result = [];
    const regex = /^https:\/\/www\.news24\.com\/news24\//;
    const page = await browser.newPage();
    await page.goto('https://www.news24.com/news24/southafrica', { waitUntil: 'networkidle2' });

    // Wait for the article items to be loaded on the page
    await page.waitForSelector('.article-item');

    const elements = await page.$$('.article-item');
    console.log(elements.length);

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];

      try {
        const primeTrialText = await element.$eval('div.article-item__prime-trial', (div) =>
          div.textContent.trim()
        );

        continue;
      } catch (error) {}

      const date = await element.$eval('.article-item__date', (p) => p.textContent.trim());
      const url = await element.$eval('a.article-item--url', (anchor) => anchor.href);
      if (regex.test(url)) {
        console.log('URL starts with https://www.news24.com/news24/');
      } else {
        console.log(url);
        console.log('URL does not start with https://www.news24.com/news24/');
        continue;
      }
      const title = await element.$eval('.article-item__title', (span) => span.textContent.trim());
      const articlePage = await browser.newPage();
      await articlePage.goto(url, { waitUntil: 'networkidle2' });
      const paragraphs = await articlePage.$$eval('.article__body.NewsArticle > p:nth-child(-n+2)', (paragraphs) =>
        paragraphs.map((p) => p.textContent.trim())
      );
      let imageUrl = '';

      try {
        imageUrl = await articlePage.$eval('.article__featured-image.NewsArticle img', (img) => img.src);
      } catch (error) {
        try {
          const divElement = await articlePage.$('.vjs-poster');
          const backgroundImageStyle = await divElement.evaluate((el) => el.style.backgroundImage);
          imageUrl = backgroundImageStyle.match(/url\("(.+)"\)/)[1];
          console.log(imageUrl);
        } catch (innerError) {
          console.log(title);
          console.log(innerError.message);
        }
      }

      let article = {
        source: {
          name: 'News24',
          url: 'https://www.news24.com',
          icon_url: 'https://scripts.24.co.za/img/sites/news24.png',
        },
        title: title,
        short_description: paragraphs,

        article_url: url,
        article_image_src: imageUrl,
        publishedAt: '2023-05-26T15:00:24Z',
      };

      result.push(article);
      console.log(index);

      await articlePage.close();
    } // end of loop

    const jsonContent = JSON.stringify(result, null, 2);
    const outputFilePath = path.join(__dirname, `news24_${Date.now()}.json`);

    fs.writeFile(outputFilePath, jsonContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file has been written successfully.');
      }
    });

    await browser.close();
  },
};
