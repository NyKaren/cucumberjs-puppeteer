const { Given, When, Then, Before, After } = require("cucumber");

Before(async function() {
  return await this.launchBrowser();
});

After(async function() {
  return await this.closeBrowser();
});

Given("I navigate to “www.amazon.com”.", async function() {
  return await this.visit();
});

When(
  "I select the option “Books” in the dropdown next to the search text input criteria.",
  async function() {
    return await this.selectOption();
  }
);

Then("I search for “Test automation”.", async function() {
  return await this.searchTest();
});

When(
  "I select the cheapest book of the page without using any sorting method available.",
  async function() {
    return await this.selectBook();
  }
);

When(
  "I reach the detailed book page, I check if the name in the header is the same name of the book that I select previously.",
  async function() {
    return await this.verifyBookName();
  }
);
