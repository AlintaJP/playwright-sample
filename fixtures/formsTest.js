const base = require('@playwright/test');

exports.formsTest = base.test.extend({
  formData: {
    firstName: 'Test',
    lastName: 'User',
    userEmail: 'testuser@example.com',
    gender: 'Male',
    userNumber: '1234567890',
    dateOfBirth: '02 July 1995',
    subjectsInput: 'Maths',
    hobbies: 'Sports',
    currentAddress: '123 Test Street',
    state: 'NCR',
    city: 'Delhi',
  },
});
