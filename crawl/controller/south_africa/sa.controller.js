const puppeteer = require("puppeteer");
const fs = require("fs");

const path = require("path");
const websitesNewsSouthAfrica = {
  base_url: "https://www.news24.com/",
  url: "https://www.news24.com/news24/southafrica",
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

async function scrapeNews24() {
  const browser = await puppeteer.launch({ headless: true });
  let result = [];
  const regex = /^https:\/\/www\.news24\.com\/news24\//;
  const page = await browser.newPage();
  await page.goto("https://www.news24.com/news24/southafrica", {
    waitUntil: "networkidle2",
  });

  // Wait for the article items to be loaded on the page
  await page.waitForSelector(".article-item");

  const elements = await page.$$(".article-item");
  console.log(elements.length);

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    try {
      const primeTrialText = await element.$eval(
        "div.article-item__prime-trial",
        (div) => div.textContent.trim()
      );

      continue;
    } catch (error) {}

    const date = await element.$eval(".article-item__date", (p) =>
      p.textContent.trim()
    );
    const url = await element.$eval(
      "a.article-item--url",
      (anchor) => anchor.href
    );
    if (regex.test(url)) {
    } else {
      console.log(url);
      console.log("URL does not start with https://www.news24.com/news24/");
      continue;
    }
    const title = await element.$eval(".article-item__title", (span) =>
      span.textContent.trim()
    );
    const articlePage = await browser.newPage();
    await articlePage.goto(url, { waitUntil: "networkidle2" });
    const paragraphs = await articlePage.$$eval(
      ".article__body.NewsArticle > p:nth-of-type(-n+2)",
      (paragraphs) => paragraphs.map((p) => p.textContent.trim())
    );
    let imageUrl = "";

    try {
      imageUrl = await articlePage.$eval(
        ".article__featured-image.NewsArticle img",
        (img) => img.src
      );
    } catch (error) {
      try {
        const divElement = await articlePage.$(".vjs-poster");
        const backgroundImageStyle = await divElement.evaluate(
          (el) => el.style.backgroundImage
        );
        imageUrl = backgroundImageStyle.match(/url\("(.+)"\)/)[1];
        console.log(imageUrl);
      } catch (innerError) {
        console.log(title);
        console.log(innerError.message);
      }
    }

    let article = {
      source: {
        name: "News24",
        url: "https://www.news24.com",
        icon_url: "https://scripts.24.co.za/img/sites/news24.png",
      },
      title: title,
      short_description: paragraphs,

      article_url: url,
      article_image_src: imageUrl,
      publishedAt: "2023-05-26T15:00:24Z",
    };

    result.push(article);
    console.log(index);

    await articlePage.close();
  } // end of loop

  const jsonContent = JSON.stringify(result, null, 2);
  const outputFilePath = path.join(__dirname, `news24_${Date.now()}.json`);

  fs.writeFile(outputFilePath, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
}

async function scrapeTimeslive() {
  const browser = await puppeteer.launch({ headless: true });
  let result = [];
  let uniqueUrl = new Set();

  const page = await browser.newPage();
  await page.goto("https://www.timeslive.co.za/news/south-africa/", {
    waitUntil: "networkidle2",
  });

  //TODO for this web site there is two sprite container
  //first one is row
  //.container-fluid.section
  // div:nth-child(1) this is container for article
  //.find('a.link[aria-label="article link"]').get(0)
  //second is

  // Wait for the article items to be loaded on the page

  const links = await page.evaluate(() => {
    const elements = document.querySelectorAll("a.link");
    const uniqueSet = new Set();

    elements.forEach((element) => {
      uniqueSet.add(element.href);
    });

    return Array.from(uniqueSet);
  });

  const filteredUrls = links.filter((url) =>
    url.startsWith("https://www.timeslive.co.za/news/south-africa/")
  );
  console.log(filteredUrls);
  // Output the href attributes of the selected links
  for (let index = 0; index < filteredUrls.length; index++) {
    const element = filteredUrls[index];
    const articlePage = page.goto(element);
    // Wait for the article items to be loaded on the page
    await page.waitForSelector(".row");
    await delay(5000);
    const rowElements = await page.$$(".row");
    const firstRowElement = rowElements[0]; // Select the first element
    const articleUrl = element;
    const title = await firstRowElement.$eval(
      "h1.article-title.article-title-primary",
      (span) => span.textContent.trim()
    );
    const date = await firstRowElement.$eval(".article-pub-date", (div) =>
      div.textContent.trim()
    );
    const widgetDiv = await firstRowElement.$$(".article-widget-text");
    const imageUrl = await firstRowElement.$eval("img", (img) => img.src);
    const paragraphs = await widgetDiv[0].$$eval(
      ".text > p:nth-of-type(-n+2)",
      (paragraphs) => paragraphs.map((p) => p.textContent.trim())
    );
    let article = {
      source: {
        name: "timeslive",
        url: "https://www.timeslive.co.za",
        icon_url:
          "https://www.timeslive.co.za/static/images/icons/app-icons/app-icon.120x120.png",
      },
      title: title,
      short_description: paragraphs,

      article_url: articleUrl,
      article_image_src: imageUrl,
      publishedAt: date.split("By")[0].trim(),
    };
    result.push(article);
  }

  const jsonContent = JSON.stringify(result, null, 2);
  const outputFilePath = path.join(__dirname, `timeslive_${Date.now()}.json`);

  fs.writeFile(outputFilePath, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
  await page.close();
}
async function scrapeTheSouthAfrican() {
  const browser = await puppeteer.launch({ headless: false });
  let result = [];

  const page = await browser.newPage();
  await page.goto("https://www.thesouthafrican.com/news/", {
    waitUntil: "load",
  });
  const articlesElement = await page.$$(".bwyjaB");
  console.log(articlesElement.length);
  let links = [];
  await Promise.all(
    articlesElement.map(async (element) => {
      const link = await element.$eval("a", (a) => a.href);
      links.push(link);
    })
  );
  const filteredUrls = links.filter((url) =>
    url.startsWith("https://www.thesouthafrican.com/news/")
  );
  for (let index = 0; index < filteredUrls.length; index++) {
    const element = filteredUrls[index];
    page.goto(element);
    // Wait for the article items to be loaded on the page
    const articlePage = await page.waitForSelector(
      ".uri__SiteContainer-sc-1vs1gre-0"
    );
    await delay(5000);
    const title = await articlePage.$eval(".fMTrXZ", (header) =>
      header.textContent.trim()
    );
    const date = await articlePage.$eval(".eHwBBy", (span) =>
      span.textContent.trim()
    );
    const imageUrl = await articlePage.$eval(
      ".ldaRKF > div img ",
      (img) => img.src
    );
    const paragraphs = await articlePage.$eval(".jghIUV > p", (p) =>
      p.textContent.trim()
    );
    let article = {
      source: {
        name: "the south african",
        url: "https://www.thesouthafrican.com",
        icon_url: "https://www.thesouthafrican.com/favicon.ico",
      },
      title: title,
      short_description: paragraphs,

      article_url: element,
      article_image_src: imageUrl,
      publishedAt: date,
    };
    result.push(article);
    delay(5000);
  }

  const jsonContent = JSON.stringify(result, null, 2);
  const outputFilePath = path.join(
    __dirname,
    `thesouthafrican_${Date.now()}.json`
  );

  fs.writeFile(outputFilePath, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
  await page.close();
}
async function scrapesabcnews() {
  const browser = await puppeteer.launch({ headless: false });
  let result = [];

  const page = await browser.newPage();
  await page.goto("https://www.sabcnews.com/sabcnews/category/south-africa/", {
    waitUntil: "load",
  });
  const articlesElement = await page.$$(".jeg_post.jeg_pl_lg_3");
  console.log(articlesElement.length);
  let links = [];
  await Promise.all(
    articlesElement.map(async (element) => {
      const link = await element.$eval("a", (a) => a.href);
      links.push(link);
    })
  );
  for (let index = 0; index < links.length; index++) {
    const element = links[index];
    page.goto(element);
    // Wait for the article items to be loaded on the page
    const articlePage = await page.waitForSelector(".jeg_content");
    await delay(5000);
    const title = await articlePage.$eval(".jeg_post_title", (h1) =>
      h1.textContent.trim()
    );
    const date = await articlePage.$eval(".jeg_meta_date", (div) =>
      div.textContent.trim()
    );
    const imageUrl = await articlePage.$eval(
      ".thumbnail-container > img",
      (img) => img.src
    );
    const paragraphs = await articlePage.$$eval(
      ".content-inner > p:nth-of-type(-n+2)",
      (paragraphs) => paragraphs.map((p) => p.textContent.trim())
    );
    console.log(element)

    let article = {
      source: {
        name: "the south african",
        url: "https://www.thesouthafrican.com",
        icon_url: "https://www.thesouthafrican.com/favicon.ico",
      },
      title: title,
      short_description: paragraphs,

      article_url: element,
      article_image_src: imageUrl,
      publishedAt: date,
    };
    result.push(article);
    delay(5000);
  }

  const jsonContent = JSON.stringify(result, null, 2);
  const outputFilePath = path.join(
    __dirname,
    `sabcnews_${Date.now()}.json`
  );

  fs.writeFile(outputFilePath, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
  await page.close();
}
module.exports = {
  saCrawl: async () => {
    // await scrapeNews24();
    // await scrapeTimeslive();
    //  await scrapeTheSouthAfrican();
    await scrapesabcnews();
  },
};
