class FormsPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('input#firstName');
    this.lastName = page.locator('input#lastName');
    this.userEmail = page.locator('input#userEmail');
    this.userNumber = page.locator('input#userNumber');
    this.dateOfBirthInput = page.locator('input#dateOfBirthInput');
    this.subjectsInput = page.locator('input#subjectsInput');
    this.currentAddress = page.locator('textarea#currentAddress');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/forms');
    await this.page.click('text=Practice Form');
  }

  async fillForm(formData) {
    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
    await this.userEmail.fill(formData.userEmail);
    await this.selectGender(formData.gender);
    await this.userNumber.fill(formData.userNumber);
    await this.dateOfBirthInput.fill(formData.dateOfBirth); // format: 'dd MMM yyyy', e.g., '02 July 1995'
    await this.enterSubjects(formData.subjectsInput);
    await this.selectHobby(formData.hobbies);
    await this.currentAddress.fill(formData.currentAddress);
    await this.selectState(formData.state);
    await this.selectCity(formData.city);
  }

  async selectGender(gender) {
    await this.page.getByText(`${gender}`, { exact: true }).click();
  }

  async selectState(state) {
    await this.page.click('div#state');
    await this.page.getByText(`${state}`, { exact: true }).click();
  }

  async selectCity(city) {
    await this.page.click('div#city');
    await this.page.getByText(`${city}`, { exact: true }).click();
  }

  async enterSubjects(subjects) {
    await this.subjectsInput.fill(subjects);
    await this.page.locator(`text=${subjects}`).nth(2).click();
  }

  async selectHobby(hobby) {
    await this.page.getByText(`${hobby}`).click();
  }

  async submitForm() {
    await this.page.click('button#submit');
  }

  async getConfirmationHeader() {
    return await this.page.$eval('div.modal-header', (element) =>
      element.textContent.trim()
    );
  }
}

module.exports = FormsPage;
