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
    var text;
    await this.page.waitForSelector("#twotabsearchtextbox");

    // ToDo discover how I can get the name of the book
    nameBookChose = await this.page.content(
      (".a-link-normal a-text-normal", text, { delay: 10000 })
    );

    const selectElemBook = await this.page.$$(".a-offscreen");
    // ToDo a foreach to discover what has the minor price to click

    // ToDo discover how I can click on the book price
    await selectElemBook.click(".a-price-whole");
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
