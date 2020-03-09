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
      console.log(text);
      const res = text.replace("$", "");
      let numero;
      numero = Number(res);
      prices[i] = numero;
      console.log("/n" + "Price in list: " + prices[i] + "/n");
    }
    await delay(10000);
    // ToDo discover how I can click on the book price
    await selectElemBook.click();
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
