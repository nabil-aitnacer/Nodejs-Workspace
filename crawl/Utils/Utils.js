async function getTrimmedTextContent(page, selector) {
    const elements = await page.$$(selector);
    const trimmedTextArray = await Promise.all(
      elements.map((element) => element.textContent.trim())
    );
    return trimmedTextArray;
  }
  
  module.exports = { getTrimmedTextContent };