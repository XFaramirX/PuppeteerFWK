const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: false,
    slowMo: 200,
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto("https://google.com");
  await page.screenshot({ path: "example.png" });
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  await page.evaluate(() => {
    console.log(`url is ${location.href}`);
  });
  await browser.close();
})();
