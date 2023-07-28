class WebTablesPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('.rt-tr-group');
    this.cells = page.locator('.rt-td');
    this.addUserButton = page.locator('#addNewRecordButton');
    this.editUserButton = page.getByTitle('Edit');
    this.deleteUserButton = page.getByTitle('Delete');
    this.submitButton = page.locator('button#submit');
    this.firstName = page.locator('input#firstName');
    this.lastName = page.locator('input#lastName');
    this.userEmail = page.locator('input#userEmail');
    this.age = page.locator('input#age');
    this.salary = page.locator('input#salary');
    this.department = page.locator('input#department');
    this.search = page.getByPlaceholder('Type to search');
  }

  async openAddUserForm() {
    await this.addUserButton.click();
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  async goToNextPage() {
    await this.page.click('text=Next');
  }

  async goToPreviousPage() {
    await this.page.click('text=Previous');
  }

  async getCurrentPageNumber() {
    const currentPageText = await this.page
      .getByRole('spinbutton', { name: 'jump to page' })
      .inputValue();
    return Number(currentPageText);
  }

  async sortByColumn(columnName) {
    await this.page.getByRole('columnheader', { name: `${columnName}` });
  }

  async getColumnData(columnName) {
    return await this.page.$$eval(`.rt-td:has-text('${columnName}')`, (cells) =>
      cells.map((cell) => cell.textContent)
    );
  }

  async searchUser(searchText) {
    await this.search.fill(searchText);
  }

  async setNumberOfEntries(numberOfEntries) {
    await this.page.selectOption('select', String(numberOfEntries));
  }

  async getRowCount() {
    return await this.rows.count();
  }

  async fillForm(formData) {
    await this.firstName.fill(formData.firstName || '');
    await this.lastName.fill(formData.lastName || '');
    await this.userEmail.fill(formData.email || '');
    await this.age.fill(formData.age || '');
    await this.salary.fill(formData.salary || '');
    await this.department.fill(formData.department || '');
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async addUser(user, edit = false) {
    if (!edit) {
      await this.openAddUserForm();
    }
    await this.fillForm(user);
    await this.submitForm();
  }

  async deleteUser(user) {
    const userRow = this.getUserRow(user);
    await userRow.locator(this.deleteUserButton).click();
  }

  async editUser(oldUser, newUser) {
    const userRow = this.getUserRow(oldUser);
    await userRow.locator(this.editUserButton).click();
    await this.addUser(newUser, true);
  }

  getUserRow(user) {
    return this.page.getByRole('row', {
      name: `${user.firstName} ${user.lastName} ${user.age} ${user.email} ${user.salary} ${user.department} Edit Delete`,
    });
  }

  async isFirstNameFieldValid() {
    return (await this.page.$('#firstName:valid')) !== null;
  }

  async isLastNameFieldValid() {
    return (await this.page.$('#lastName:valid')) !== null;
  }

  async isEmailFieldValid() {
    return (await this.page.$('#userEmail:valid')) !== null;
  }

  async isAgeFieldValid() {
    return (await this.page.$('#age:valid')) !== null;
  }

  async isSalaryFieldValid() {
    return (await this.page.$('#salary:valid')) !== null;
  }

  async isDepartmentFieldValid() {
    return (await this.page.$('#department:valid')) !== null;
  }
}

module.exports = WebTablesPage;
