// @ts-check
const { expect } = require('@playwright/test');
const { formsTest } = require('../fixtures/formsTest');
const FormsPage = require('../pageobjects/FormsPage');

// This is a test to fill in the form on the Forms page
formsTest('Fill in the form', async ({ page, formData }) => {
  const formsPage = new FormsPage(page);
  await formsPage.navigate();

  await formsPage.fillForm(formData);
  await formsPage.submitForm();

  const headerText = await formsPage.getConfirmationHeader();
  expect(headerText).toEqual('Thanks for submitting the form');
});
