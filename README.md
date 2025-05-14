# Project: cPanel E2E Automation Suite

This project is focused on testing and verifying the cPanel shopping cart flow, including:
product selection, dynamic IP input, addons handling, summary updates, and review & checkout validation.

---
Framework

All tests are written in Playwright using TypeScript.

Prerequisites

Make sure the following are installed before running tests:

Node.js (>= 18.18.0)

Playwright (>= 1.49.0)

TypeScript (installed via npm)

faker.js / @faker-js/faker (used to generate dynamic IPs)

How to Setup

Clone the repository:
git clone https://github.com/ShutkaAndrew/cPanel.git
cd cPanel
Install dependencies:npm install
Install Playwright browsers: npx playwright install


How to Run Tests
Run all tests: npx playwright test

Run a specific test file: 
npx playwright test tests/add-addon-complete-flow.spec.ts

Project Structure
Pages/           # Page Object Model (POM) classes for interacting with UI elements
tests/           # Spec files: complete flow, update/edit scenarios
utils/           # Custom helpers like IpBuilder, price utils
playwright.config.ts  # Playwright config file
package.json     # Scripts and dependencies
tsconfig.json    # TypeScript config

Patterns Used

Page Object Model (POM): Encapsulates UI logic in reusable classes under /Pages

Custom Fixtures: Defined in utils/fixtures.ts to inject dependencies into tests

Helper Tools:

IpBuilder.ts for generating random IP addresses

Notes

Currently, tests validate titles only. Price validation (including prorated logic) is planned.



 
