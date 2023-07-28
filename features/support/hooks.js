const { Before, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

Before(async function () {
  browser = await chromium.launch();
  this.page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'screenshots/' });
  }
});
