const { setWorldConstructor, setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

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
    await this.page.waitForSelector(
      ".a-size-base-plus a-color-base a-text-normal"
    );
    nameBookChose = await this.page.content(
      (".a-size-base-plus a-color-base a-text-normall", text, { delay: 10000 })
    );
    await this.page.click(".a-size-base-plus a-color-base a-text-normal");
  }

  async verifyBookName() {
    await this.page.waitForSelector(".panel_content");

    const content = await this.page.content(
      (".panel_content", text, { delay: 10000 })
    );

    if (!content.includes(nameBookChose))
      throw new Error(
        `Expected page to contain text: ${nameBookChose}, but page contains only: ${content}`
      );
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 3000);
