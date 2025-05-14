# 🚀 Project: **cPanel E2E Automation Suite**

Automated end-to-end tests for the cPanel shopping cart flow using:  
🔹 [Playwright](https://playwright.dev/)  
🔹 [TypeScript](https://www.typescriptlang.org/)  

---

## 🛠️ **1. Framework Stack**
- **Testing Framework**: [Playwright](https://playwright.dev/) (v1.49.0+)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Test Data**: `@faker-js/faker` for dynamic IP generation  

---

## ⚙️ **2. Prerequisites**
| Requirement       | Version       | 
|-------------------|---------------|
| Node.js          | ≥ 18.18.0     | 
| npm              | ≥ 9.x         | 

---


# 1. Clone & install
git clone https://github.com/ShutkaAndrew/cPanel.git
cd cPanel
npm install

# 2. Install browsers (Critical!)
npx playwright install

# 3. Run all tests
npx playwright test

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



 
