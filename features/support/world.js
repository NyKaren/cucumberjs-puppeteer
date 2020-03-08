const { setWorldConstructor, setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

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

  async visit() {
    await this.page.goto("www.amazon.com");
  }

  async selectOption() {
    await this.page.waitForSelector("#s");
    await this.page.click("#s", "122");
  }
  async searchTest() {
    await this.page.waitForSelector("#input");
    await this.page.type("#test", "Test automation");
  }
  async selectBook() {
    await this.page.waitForSelector("#book");
    await this.page.click("#book", "12345678901");
  }

  async verifyBookName() {
    await this.page.waitForSelector(".panel_content");

    const text = "User doesn't found.";
    const content = await this.page.content(
      (".panel_content", text, { delay: 10000 })
    );

    if (!content.includes(text))
      throw new Error(
        `Expected page to contain text: ${text}, but page contains only: ${content}`
      );
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 3000);
