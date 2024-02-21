# CircleCI Badge for Megaax/api-ui-testing on GitHub:

[![Megaax](https://circleci.com/gh/Megaax/api-ui-testing.svg?style=svg)](https://circleci.com/gh/Megaax/api-ui-testing)

# My Store NightwatchJS Tests and Mock-User-Auth API Tests

## Description

This project contains two main tasks:

1. Automated testing of the My Store website using NightwatchJS.
2. API testing using `mock-user-auth` and `supertest`.

## Task  1: My Store NightwatchJS Tests

### Subtask  1.1: Contact Us Page Tests

- Identifying optional and required fields on the form.
- Testing form submission with valid and invalid combinations of data.
- A test case for file upload.

### Subtask  1.2: Homepage Search Test

- Search for the term "dress" on the homepage and verify the search results.

### Subtask  1.3: Using Nightwatch Page Objects

- All tests are implemented using Nightwatch Page Objects to avoid hardcoded selectors.

## Task  2: Mock-User-Auth API Tests

- Testing all API routes found on the `mock-user-auth` npm page using `supertest`.
- Validating hitting the routes with valid/invalid body data.
- Validating hitting the routes with valid/invalid authorization.

### Test Runner

- The project uses `jest` as the test runner.

## Setup

- Prerequisites (e.g., Node.js version, npm version, etc.)
- Steps to clone the repository
- Steps to install dependencies (`npm install`)

## Running the Tests

- Command to run the NightwatchJS tests
- Command to run the API tests

## Contribution Guidelines

- How to submit a pull request
- Code style guidelines
- Any other contribution rules

## License

- Include the license for your project.

## Contact Information

- Provide your contact information for any questions or feedback.

