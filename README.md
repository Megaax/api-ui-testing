# CircleCI Badge for Megaax/api-ui-testing on GitHub:

[![Megaax](https://circleci.com/gh/Megaax/api-ui-testing.svg?style=svg)](https://circleci.com/gh/Megaax/api-ui-testing)

# My Store NightwatchJS Tests and Mock-User-Auth API Tests with CircleCI

## Description

This project demonstrates the implementation of automated tests for the My Store website and API routes using NightwatchJS and `mock-user-auth`, with the entire process orchestrated by a CircleCI pipeline.

## Pipeline Overview

CircleCI pipelines are configured to run two stages, each containing jobs that execute the tests for the corresponding parts of the project.

### Stage  1: My Store NightwatchJS Tests

- **Job**: Automated testing of the My Store website using NightwatchJS.
- **Tasks**:
  - Identifying and testing required and optional fields on the Contact Us page.
  - Testing form submission with valid and invalid combinations of data, including file upload.
  - Searching for "dress" on the homepage and verifying the search results.
- **Tools**: NightwatchJS Page Objects for structured and maintainable tests.

### Stage  2: Mock-User-Auth API Tests

- **Job**: API testing using `mock-user-auth` and `supertest`.
- **Tasks**:
  - Testing all API routes with valid/invalid body data.
  - Validating routes with valid/invalid authorization.
- **Tools**: `jest` as the test runner.

## CircleCI Configuration

The CircleCI pipeline is defined in a `.circleci/config.yml` file at the root of the project repository. The pipeline triggers automatically on changes to the repository and consists of two stages:

- **Stage  1**: NightwatchJS tests
- **Stage  2**: API tests

Each stage contains jobs that run the tests, and the pipeline ensures that all tests pass before the changes are merged.

## Setup

- **Prerequisites**: Node.js, npm, and a CircleCI account.
- **Clone the Repository**: Follow the steps to clone the repository to your local machine.
- **Navigate inside UI-test Directory **: Run `cd UI-test` Or `cd API-test`.
- **Install Dependencies**: Run `npm install` to install the necessary dependencies.

## Running the Tests

- **NightwatchJS Tests**: Execute the NightwatchJS tests using the command provided in the CircleCI configuration `npm run test`.
- **API Tests**: Run the API tests using the command provided in the CircleCI configuration `npm run test`.

## CircleCI Pipeline Execution

- **Conditional Execution**: The pipeline is configured to execute jobs conditionally, ensuring that each stage runs only if the previous stage completes successfully.
- **Caching**: The pipeline uses caching mechanisms to reduce build times by reusing dependencies and artifacts.
