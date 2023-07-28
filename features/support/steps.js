const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FormsPage = require('../../pageobjects/FormsPage');

Given(
  'I am on the Practice Form page',
  { timeout: 100 * 1000 },
  async function () {
    this.formsPage = new FormsPage(this.page);
    await this.formsPage.navigate();
  }
);

When(
  'I fill out the form with the following details:',
  { timeout: 100 * 1000 },
  async function (dataTable) {
    const data = dataTable.rowsHash();

    await this.formsPage.fillForm({
      firstName: data['firstName'],
      lastName: data['lastName'],
      userEmail: data['userEmail'],
      gender: data['gender'],
      userNumber: data['userNumber'],
      dateOfBirth: data['dateOfBirth'],
      subjectsInput: data['subjectsInput'],
      hobbies: data['hobbies'],
      currentAddress: data['currentAddress'],
      state: data['state'],
      city: data['city'],
    });
  }
);

When('I submit the form', async function () {
  await this.formsPage.submitForm();
});

Then(
  'I should see a confirmation that the form has been submitted',
  async function () {
    const headerText = await this.formsPage.getConfirmationHeader();
    expect(headerText).toEqual('Thanks for submitting the form');
  }
);
