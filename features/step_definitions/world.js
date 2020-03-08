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

  async visit(string) {
    await this.page.goto("https://" + string);
  }

  async selectOption(string) {
    await this.page.waitForSelector("#searchDropdownBox");
    await this.page.click("#s", "122");
    var e = document.getElementById("searchDropdownBox");
    var strUser = e.options[e.selectedIndex].text;
    await this.page.click(strUser, string);
  }

  async searchTest(string) {
    await this.page.waitForSelector("#twotabsearchtextbox");
    await this.page.type("#twotabsearchtextbox", string);
    await this.page.click("input.nav-input");
  }

  async selectBook() {
    await this.page.waitForSelector(
      ".a-size-medium a-color-base a-text-normal"
    );
    await this.page.click(".a-size-medium a-color-base a-text-normal");
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
