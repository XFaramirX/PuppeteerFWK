const puppeteer = require("puppeteer");

describe("PDF", () => {
  it("Create a new pdf file", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com", {
      waitUntil: "networkidle2",
    });
    await page.pdf({ path: "./source/downloads/hn.pdf", format: "a4" });

    await browser.close();
  });
});
