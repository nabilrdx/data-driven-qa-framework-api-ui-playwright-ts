# Playwright E-commerce Test Automation Framework

An end-to-end and API test automation framework built with Playwright Test and TypeScript. The project demonstrates a maintainable test architecture for an e-commerce application, including Page Object Model design, custom fixtures, data-driven testing, environment selection, API testing, HTML reporting, trace collection, and CI execution.

## What This Project Demonstrates

- Browser automation with Playwright Test
- TypeScript-based test development
- Page Object Model for reusable UI actions and locators
- Role-based and user-facing locators such as `getByRole` and `getByText`
- Custom typed fixtures for injecting page objects and API controllers
- Data-driven positive and negative test scenarios
- API testing with Playwright's `APIRequestContext`
- Environment-specific configuration through `.env.qa` and `.env.uat`
- Parallel test execution locally and controlled execution in CI
- HTML test reports and trace capture on the first retry
- Jenkins pipeline execution with a target-environment parameter
- GitHub Actions execution on pushes and pull requests

## Technology Stack

- Node.js
- TypeScript
- Playwright Test
- `dotenv` for environment configuration
- `cross-env` for setting environment variables consistently from the command line
- Jenkins and GitHub Actions for CI

## Project Structure

```text
.
├── .env.qa                         # QA environment configuration
├── .env.uat                        # UAT environment configuration
├── .github/workflows/playwright.yml
├── Jenkinsfile                     # Parameterized Jenkins pipeline
├── playwright.config.ts            # Playwright runner configuration
├── src/
│   ├── Config/environment.ts       # Loads the selected .env file
│   ├── Controllers/
│   │   └── RegistrationController.ts
│   ├── fixtures/MyFixtures.ts      # Typed custom Playwright fixtures
│   ├── pages/LoginPage.ts          # Login Page Object Model
│   └── types/Domain.ts             # Shared TypeScript domain types
└── tests/
    ├── api/RegistrationAPI.spec.ts
    ├── data-driven/
    │   ├── loginTestData.ts
    │   └── registrationTestData.ts
    └── e2e/Login.spec.ts
```

## Prerequisites

- Node.js 18 or newer
- npm
- Access to the application and API endpoints used by the test data

Check the installed versions:

```powershell
node --version
npm --version
```

## Installation

Clone the repository, then install the locked dependencies:

```powershell
npm ci
```

Install the Playwright browser binaries:

```powershell
npx playwright install
```

For a Linux CI agent, install the operating-system dependencies as well:

```bash
npx playwright install --with-deps
```

## Environment Configuration

The framework reads the `ENV` command-line variable and loads the matching file:

```text
ENV=qa   -> .env.qa
ENV=uat  -> .env.uat
```

If `ENV` is not supplied, the framework defaults to `qa`.

Each environment file currently provides:

```dotenv
BASE_URL=https://demowebshop.tricentis.com
API_TIMEOUT=10000
```

`BASE_URL` is used by Playwright as the shared `baseURL`, which allows page objects to navigate with relative paths such as `/login`. Missing required configuration produces a clear error from `Env.get`.

Do not place real credentials, tokens, or private service URLs in committed environment files. For a production-grade version of this framework, keep secrets in Jenkins or GitHub Actions secret storage and inject them at runtime.

## Running Tests

Run the complete suite using the default QA environment:

```powershell
npx playwright test
```

Run against a specific environment on Windows:

```powershell
npx cross-env ENV=qa npx playwright test
npx cross-env ENV=uat npx playwright test
```

Run only the UI tests:

```powershell
npx playwright test tests/e2e
```

Run only the API tests:

```powershell
npx playwright test tests/api
```

Run a specific test file:

```powershell
npx playwright test tests/e2e/Login.spec.ts
npx playwright test tests/api/RegistrationAPI.spec.ts
```

Run with the visible browser, useful while developing:

```powershell
npx playwright test --headed
```

Run in debug mode:

```powershell
npx playwright test --debug
```

## Current Test Coverage

### UI: Login

`tests/e2e/Login.spec.ts` uses the `LoginPage` page object and data-driven test cases to cover:

- Successful login
- Invalid password
- Login with a non-existing user
- Missing email
- Missing password

The test verifies successful navigation by checking that the `Log out` link is visible. Negative paths verify the expected validation or credential error messages.

### API: Registration

`tests/api/RegistrationAPI.spec.ts` uses `RegistrationController` and the Playwright request fixture to cover:

- Successful registration with a generated email
- Duplicate email registration returning HTTP `409`
- Missing required fields returning HTTP `422`

Assertions validate both HTTP status codes and response-body content, including returned user data, validation messages, and the generated user ID.

## Framework Design

### Page Object Model

`LoginPage` owns login locators and user actions. Test files describe behavior and assertions without repeating selector or navigation details. This keeps UI changes localized to the page object.

### Custom Fixtures

`src/fixtures/MyFixtures.ts` extends Playwright's base test with:

- `loginPage`, created with the built-in `page` fixture
- `registrationController`, created with the built-in `request` fixture

Tests import the extended `test` object so these dependencies are available through the test function parameters.

### Data-Driven Testing

Login and registration scenarios are stored as typed arrays in `tests/data-driven`. The specifications generate one Playwright test per data row, making positive and negative coverage easy to review and extend.

### Environment Selection

`src/Config/environment.ts` centralizes environment loading and configuration access. The selected environment is logged at startup, and missing required keys fail fast with a configuration error.

### Playwright Configuration

The current configuration provides:

- `tests` as the test directory
- Fully parallel execution locally
- Two retries in CI
- A single worker in CI for predictable execution
- HTML reporting
- Trace collection on the first retry
- Chromium/Desktop Chrome coverage

Firefox, WebKit, mobile devices, and branded browser projects are prepared in the configuration as commented project examples and can be enabled when needed.

## Reports and Debugging

The HTML report is written to `playwright-report/`. Open the latest report with:

```powershell
npx playwright show-report
```

When a test fails and is retried, Playwright collects a trace according to `trace: 'on-first-retry'`. Traces can be inspected with:

```powershell
npx playwright show-trace path\to\trace.zip
```

The `test-results/` directory contains test artifacts generated during execution.

## Continuous Integration

### GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It:

1. Checks out the repository.
2. Installs the Node.js LTS version.
3. Runs `npm ci`.
4. Installs Playwright browsers and Linux dependencies.
5. Runs the test suite.
6. Uploads the HTML report for up to 30 days.

### Jenkins

The `Jenkinsfile` defines a declarative pipeline with a `TARGET_ENV` dropdown containing `qa`, `dev`, and `uat`. The selected value is passed to Playwright as `ENV`:

```groovy
sh "ENV=${params.TARGET_ENV} npx playwright test"
```

The pipeline checks out the source, installs npm dependencies, installs Playwright with system dependencies, executes the tests, and archives the generated HTML report.

## Useful Playwright Commands

```powershell
# Run Chromium only
npx playwright test --project=chromium

# Run tests matching a title or file pattern
npx playwright test -g "Login"

# Open the interactive UI mode
npx playwright test --ui

# Generate a test with Codegen
npx playwright codegen
```

## Portfolio Talking Points

This project is designed to demonstrate understanding of the following automation concepts:

- Separating test intent from implementation details with page objects and controllers
- Reusing Playwright's built-in fixtures through typed custom fixtures
- Testing both browser behavior and backend API behavior in one framework
- Building meaningful negative-path coverage instead of testing only happy paths
- Keeping test data separate from test flow
- Supporting multiple environments without changing test code
- Producing CI-friendly reports and diagnostic traces
- Making the suite suitable for local development and automated pipelines

## Potential Next Improvements

- Move credentials and API URLs into CI secret management.
- Add npm scripts for common QA, UAT, UI, API, and report commands.
- Move the registration endpoint into environment configuration instead of hardcoding it in the controller.
- Add authentication setup with `storageState` where suitable.
- Add browser projects for Firefox, WebKit, and mobile devices.
- Add schema validation for API responses.
- Add API request timeout handling using the configured `API_TIMEOUT` value.
- Add linting, formatting, and type-check scripts to the CI pipeline.
- Remove or isolate exploratory tests such as `tests/testa.spec.ts` from the main suite.

## License

This repository is shared as a portfolio piece. Please do not reuse or redistribute this code without permission.
