let timeout;
describe(
  "/ (Home Page)",
  () => {
    let browser;
    let page;
    beforeAll(async () => {
      const puppeteer = require("puppeteer");
      browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: false,
        slowMo: 0,
        devtools: false,
      });
    }, timeout);

    afterAll(async () => {
      await browser.close();
    });
    it(
      "should load without error",
      async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(timeout);

        const targetPage = page;
        await targetPage.setViewport({ width: 1476, height: 1041 });

        async function waitForSelectors(selectors, frame, timeout) {
          for (const selector of selectors) {
            try {
              return await waitForSelector(selector, frame, timeout);
            } catch (err) {
              console.error(err);
            }
          }
          throw new Error(
            "Could not find element for selectors: " + JSON.stringify(selectors)
          );
        }

        async function waitForSelector(selector, frame, timeout) {
          if (selector instanceof Array) {
            let element = null;
            for (const part of selector) {
              if (!element) {
                element = await frame.waitForSelector(part, { timeout });
              } else {
                element = await element.$(part);
              }
              if (!element) {
                throw new Error("Could not find element: " + part);
              }
              element = (
                await element.evaluateHandle((el) =>
                  el.shadowRoot ? el.shadowRoot : el
                )
              ).asElement();
            }
            if (!element) {
              throw new Error("Could not find element: " + selector.join("|"));
            }
            return element;
          }
          const element = await frame.waitForSelector(selector, { timeout });
          if (!element) {
            throw new Error("Could not find element: " + selector);
          }
          return element;
        }

        async function waitForElement(step, frame, timeout) {
          const count = step.count || 1;
          const operator = step.operator || ">=";
          const comp = {
            "==": (a, b) => a === b,
            ">=": (a, b) => a >= b,
            "<=": (a, b) => a <= b,
          };
          const compFn = comp[operator];
          await waitForFunction(async () => {
            const elements = await querySelectorsAll(step.selectors, frame);
            return compFn(elements.length, count);
          }, timeout);
        }

        async function querySelectorsAll(selectors, frame) {
          for (const selector of selectors) {
            const result = await querySelectorAll(selector, frame);
            if (result.length) {
              return result;
            }
          }
          return [];
        }

        async function querySelectorAll(selector, frame) {
          if (selector instanceof Array) {
            let elements = [];
            let i = 0;
            for (const part of selector) {
              if (i === 0) {
                elements = await frame.$$(part);
              } else {
                const tmpElements = elements;
                elements = [];
                for (const el of tmpElements) {
                  elements.push(...(await el.$$(part)));
                }
              }
              if (elements.length === 0) {
                return [];
              }
              const tmpElements = [];
              for (const el of elements) {
                const newEl = (
                  await el.evaluateHandle((el) =>
                    el.shadowRoot ? el.shadowRoot : el
                  )
                ).asElement();
                if (newEl) {
                  tmpElements.push(newEl);
                }
              }
              elements = tmpElements;
              i++;
            }
            return elements;
          }
          const element = await frame.$$(selector);
          if (!element) {
            throw new Error("Could not find element: " + selector);
          }
          return element;
        }

        async function waitForFunction(fn, timeout) {
          let isActive = true;
          setTimeout(() => {
            isActive = false;
          }, timeout);
          while (isActive) {
            const result = await fn();
            if (result) {
              return;
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          throw new Error("Timed out");
        }
        {
          const targetPage = page;
          await targetPage.setViewport({ width: 1476, height: 1041 });
        }
        {
          const targetPage = page;
          const promises = [];
          promises.push(targetPage.waitForNavigation());
          await targetPage.goto("https://www.sothebysrealty.com/eng");
          await Promise.all(promises);
        }
        {
          const targetPage = page;
          const element = await waitForSelectors(
            [
              ["aria/Entity search"],
              [
                "#__layout > div > main > section.Homepage__search > div > div > div:nth-child(2) > div > div > div.Entity-search__container.Entity-search__container--absolute.Entity-search--dark > div.el-autocomplete.Entity-search__input.Entity-search__input--has-icon > div.el-input > input",
              ],
            ],
            targetPage,
            timeout
          );
          await element.click({
            offset: { x: 158.5999755859375, y: 16.050003051757812 },
          });
        }
        {
          const targetPage = page;
          const element = await waitForSelectors(
            [
              ["aria/Entity search"],
              [
                "#__layout > div > main > section.Homepage__search > div > div > div:nth-child(2) > div > div > div.Entity-search__container.Entity-search__container--absolute.Entity-search--dark > div.el-autocomplete.Entity-search__input.Entity-search__input--has-value.Entity-search__input--has-icon > div.el-input > input",
              ],
            ],
            targetPage,
            timeout
          );
          const type = await element.evaluate((el) => el.type);
          if (
            [
              "textarea",
              "select-one",
              "text",
              "url",
              "tel",
              "search",
              "password",
              "number",
              "email",
            ].includes(type)
          ) {
            await element.type("miami");
          } else {
            await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("change", { bubbles: true }));
            }, "miami");
          }
        }
        {
          const targetPage = page;
          await targetPage.keyboard.down("Enter");
        }
        {
          const targetPage = page;
          await targetPage.keyboard.up("Enter");
        }
        {
          const targetPage = page;
          const element = await waitForSelectors(
            [[".el-dropdown span[role='button']"]],
            targetPage,
            timeout
          );
          await element.click({ offset: { x: 207, y: 3.79998779296875 } });
        }
        {
          const targetPage = page;
          const element = await waitForSelectors(
            [
              ['aria/Price Low-High[role="heading"]'],
              ["#dropdown-menu-9910 > li:nth-child(3) > h6"],
            ],
            targetPage,
            timeout
          );
          await element.click({ offset: { x: 80, y: 17 } });
        }
      },
      timeout
    );
  },
  timeout
);
