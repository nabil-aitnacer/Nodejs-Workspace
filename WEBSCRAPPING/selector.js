const request = require('request-promise')
const cheerio = require('cheerio');
const fs = require('fs')

const BASE_URL = 'https://reactnativetutorial.net/';

async function cssSelector(){
  const endPoint ='css-selectors/'
  const html = await request.get(`${BASE_URL}${endPoint}`);
//  fs.writeFileSync("./test.html",html);
  const $ = await cheerio.load(html);
  console.log($('h1').text());
  

}


async function multipleElements(){
  const endPoint ='lesson2.html'
  const html = await request.get(`${BASE_URL}${endPoint}`);
  const $ =await cheerio.load(html);
  $('h2').each((index,element)=>{
    console.log($(element).text())
  })
}
async function selectElementById(){
  const endPoint ='lesson3.html'
  const html = await request.get(`${BASE_URL}${endPoint}`);
  const $ =await cheerio.load(html);
  console.log($('#red').text())

}
async function selectElementByClassName(){
  const endPoint ='lesson5.html'
  const html = await request.get(`${BASE_URL}${endPoint}`);
  const $ =await cheerio.load(html);
  $('.red').each((index,element)=>{
    console.log($(element).text())
  })

}
async function selectElementByAttribute(){
  const endPoint ='lesson6.html'
  const html = await request.get(`${BASE_URL}${endPoint}`);
  const $ =await cheerio.load(html);
console.log( $('[data-customer="22293"]').text())
}
selectElementByAttribute();
