const puppeteer = require("puppeteer");

describe("", () => {
  let browser;
  afterAll(async () => {
    await browser.close();
  });

  it("", async () => {
    browser = await puppeteer.launch({
      headless: false,
      product: "firefox",
      //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
      //executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'
      executablePath: "C:/Program Files/Firefox Nightly/firefox.exe",
      dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto("https://duckduckgo.com/");
    await page.type("#search_form_input_homepage", "Puppeteer");
    console.log("test");
  }, 50000);
});
