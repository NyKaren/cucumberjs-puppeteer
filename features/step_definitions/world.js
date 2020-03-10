const { setWorldConstructor, setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

var nameBookChose = "";

class CustomWorld {
  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 15,
      defaultViewport: null,
      args: ["--start-maximized"],
      ignoreHTTPSErrors: true
    });

    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async visit(string) {
    await this.page.goto("https://" + string);
  }

  async selectOption(string) {
    await this.page.waitForSelector("#searchDropdownBox");
    const selectElem = await this.page.$('select[id="searchDropdownBox"]');
    await selectElem.type(string);
  }

  async searchTest(string) {
    await this.page.waitForSelector("#twotabsearchtextbox");
    await this.page.type("#twotabsearchtextbox", string);
    await this.page.click("input.nav-input");
  }

  async selectBook() {
    await this.page.waitForSelector("#twotabsearchtextbox");
    var size = (await this.page.$x('//*[@class="a-offscreen"]')).length;
    console.log(size);
    var prices = [];

    for (var i = 0; i < (await this.page.$x('//*[@class="a-offscreen"]')).length; i++) {
      const selectElemBook = (await this.page.$x('//*[@class="a-offscreen"]'))[i];

      const text = await this.page.evaluate(el => {
        return el.textContent;
      }, selectElemBook);

      const res = text.replace("$", "");
      let to_number;
      to_number = Number(res);
      prices[i] = to_number;
      console.log("/n" + "Price in list: " + prices[i] + "/n");
    }
    var minor_price = prices[0];
    var number_minor_price = 0;
    for (var i = 0; i < prices.length; i++) {
      if(prices[i] < minor_price) {
        minor_price = prices[i];
        number_minor_price = i;
      }
    }

    console.log("/n" + "Minor price: " + minor_price + "/n");
    const selectElemBookPriceMinor = (await this.page.$x('//*[@class="a-offscreen"]'))[number_minor_price];

    await selectElemBookPriceMinor.click();
  }

  async verifyBookName() {
    var text;
    await this.page.waitForSelector("#productTitle");

    const content = await this.page.content(
      ("#productTitle", text, { delay: 10000 })
    );

    if (!content.includes(text))
      throw new Error(
        `Expected page to contain text: ${nameBookChose}, but page contains only: ${content}`
      );
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 3000);
