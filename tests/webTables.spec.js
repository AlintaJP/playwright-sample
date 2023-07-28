const { test, expect } = require('@playwright/test');
const { webTablesTest } = require('../fixtures/webTablesTest');
const WebTablesPage = require('../pageobjects/WebTablesPage');

test.describe('Web Tables Page Add/Edit/Remove Users', () => {
  webTablesTest('should add a user', async ({ page, firstUser }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    await webTablesPage.addUser(firstUser);

    // Verify the user was added.
    await expect(await webTablesPage.getUserRow(firstUser)).toBeVisible();
  });

  webTablesTest(
    'should edit a user',
    async ({ page, firstUser, secondUser }) => {
      const webTablesPage = new WebTablesPage(page);
      await webTablesPage.navigate();

      await webTablesPage.addUser(firstUser);
      await webTablesPage.editUser(firstUser, secondUser);

      // Verify the user was edited.
      await expect(await webTablesPage.getUserRow(secondUser)).toBeVisible();
    }
  );

  webTablesTest('should delete a user', async ({ page, firstUser }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    await webTablesPage.addUser(firstUser);
    await webTablesPage.deleteUser(firstUser);

    // Verify the user was deleted.
    await expect(await webTablesPage.getUserRow(firstUser)).not.toBeVisible();
  });

  test('should navigate between pages correctly', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    for (let i = 0; i < 10; i++) {
      await webTablesPage.addUser({
        firstName: `Test${i}`,
        lastName: 'User',
        email: `test${i}@example.com`,
        age: '30',
        salary: '5000',
        department: 'Test',
      });
    }

    await webTablesPage.goToNextPage();
    expect(await webTablesPage.getCurrentPageNumber()).toBe(2);

    await webTablesPage.goToPreviousPage();
    expect(await webTablesPage.getCurrentPageNumber()).toBe(1);
  });

  test('should sort users correctly when column header is clicked', async ({
    page,
  }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    await webTablesPage.sortByColumn('Age');
    const ages = await webTablesPage.getColumnData('Age');

    // verify that the age data is sorted in ascending order
    expect(ages).toEqual([...ages].sort());
  });

  test('should filter users correctly when search is used', async ({
    page,
  }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    const searchText = 'Kierra';
    await webTablesPage.searchUser(searchText);
    const names = await webTablesPage.getColumnData('First Name');

    // verify that all names in the first name column contain the search text
    names.forEach((name) => expect(name).toContain(searchText));
  });

  test('should show correct number of entries per page', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    const numberOfEntries = 20;
    await webTablesPage.setNumberOfEntries(numberOfEntries);
    const rows = await webTablesPage.getRowCount();

    // verify that the number of rows shown is equal to the number of entries set
    expect(rows).toBe(numberOfEntries);
  });
});

test.describe('Web Tables Page Registration Form', () => {
  let webTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();
    await webTablesPage.openAddUserForm();
  });

  test('should mark all fields as invalid when they are empty', async () => {
    await webTablesPage.submitForm();
    expect(await webTablesPage.isFirstNameFieldValid()).toBe(false);
    expect(await webTablesPage.isLastNameFieldValid()).toBe(false);
    expect(await webTablesPage.isEmailFieldValid()).toBe(false);
    expect(await webTablesPage.isAgeFieldValid()).toBe(false);
    expect(await webTablesPage.isSalaryFieldValid()).toBe(false);
    expect(await webTablesPage.isDepartmentFieldValid()).toBe(false);
  });

  test('should mark the email field as invalid when an invalid email is entered', async () => {
    await webTablesPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid_email',
    });
    expect(await webTablesPage.isEmailFieldValid()).toBe(false);
  });

  test('should mark the age field as invalid when a non-numeric age is entered', async () => {
    await webTablesPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 'thirty',
    });
    expect(await webTablesPage.isAgeFieldValid()).toBe(false);
  });

  webTablesTest(
    'should mark all fields as valid when they are filled out correctly',
    async ({ firstUser }) => {
      await webTablesPage.fillForm(firstUser);
      expect(await webTablesPage.isFirstNameFieldValid()).toBe(true);
      expect(await webTablesPage.isLastNameFieldValid()).toBe(true);
      expect(await webTablesPage.isEmailFieldValid()).toBe(true);
      expect(await webTablesPage.isAgeFieldValid()).toBe(true);
      expect(await webTablesPage.isSalaryFieldValid()).toBe(true);
      expect(await webTablesPage.isDepartmentFieldValid()).toBe(true);
    }
  );
});
