##  Project: **cPanel E2E Automation Suite**

Automated end-to-end tests for the cPanel shopping cart flow using:  


---

###  **2. Prerequisites**
 Requirement       

 **Node.js**   
 

---


### Clone & install
git clone https://github.com/ShutkaAndrew/cPanel.git  
`cd cPanel_E2E_autotests`  
`npm install`  

###  Install browsers  
`npx playwright install`  

###  Run all tests  
`npx playwright test`  

Run a specific test file  
`npx playwright test tests/add-addon-complete-flow.spec.ts`  

### Project Structure
- Pages/           # Page Object Model (POM) classes for interacting with UI elements
- tests/           # Spec files: complete flow, update/edit scenarios
- utils/           # Custom helpers like IpBuilder, price utils
- playwright.config.ts  # Playwright config file
- package.json     # Scripts and dependencies
- tsconfig.json    # TypeScript config

### Patterns Used  

Page Object Model (POM): Encapsulates UI logic in reusable classes under /Pages
Custom Fixtures: Defined in utils/fixtures.ts to inject dependencies into tests

### Helper Tools:

IpBuilder.ts for generating random IP addresses

Notes

Currently, tests validate titles only.



 
