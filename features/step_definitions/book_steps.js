const { Given, When, And, Then, Before, After } = require("cucumber");

Before(async function() {
  return await this.launchBrowser();
});

After(async function() {
  return await this.closeBrowser();
});

Given("I navigate to {string}.", async function(string) {
  return await this.visit(string);
});

When(
  "​I select the option {string} in the dropdown next to the search text input criteria.",
  async function(string) {
    return await this.selectOption(string);
  }
);

Then("​I search for {string}.", async function(string) {
  return await this.searchTest(string);
});

When(
  "​I select the cheapest book of the page without using any sorting method available.",
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
