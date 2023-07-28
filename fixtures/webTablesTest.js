const base = require('@playwright/test');

exports.webTablesTest = base.test.extend({
  firstUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    age: '30',
    salary: '5000',
    department: 'HR',
  },

  secondUser: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    age: '32',
    salary: '6000',
    department: 'Finance',
  },
});
