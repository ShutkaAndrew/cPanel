# cPanel E2E Automation Suite

Automated end-to-end tests for the cPanel shopping flow using **Playwright + TypeScript**.

---

## Features

- Product + license selection
- Dynamic IP input
- Addons handling
- Order Summary verification
- Review & Checkout validation
- Edit flow support
- Currently checks only **titles**, not **prices** *(bonus logic planned)*

---

## Project Structure

├── Pages/ # Page Object classes (POM)
├── tests/ # Test specs: full flows, update flows
├── utils/ # Helpers like IpBuilder, pricing utilities
├── test-results/ # Video/screenshots on failure
├── playwright.config.ts # Playwright config
├── package.json # NPM scripts & dependencies

---

## 🛠 Technologies

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

---

## ⚙️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ShutkaAndrew/cPanel.git

Install dependencies:
npm install

Run tests:
npx playwright test

Run a single test file

 Patterns Used

    Page Object Model (POM)

    Fixtures for dependency injection (utils/fixtures.ts)

    Custom helper IpBuilder to generate IPs
