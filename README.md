##  Project: **cPanel E2E Automation Suite**

Automated end-to-end tests for the cPanel shopping cart flow using:  



### Requirement       

 **Node.js**  

### Notes

Currently, tests validate titles only. 
There is another project to check the prices,  
,namely with proportional prices,
but at the last stage of the checkout page  
I have problems with checking the prices,  
which causes the tests to fall,  
so here only checks the name of the addon and product 
 


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
- tests/           # Spec files
- utils/           # Custom helpers like IpBuilder, price utils
- playwright.config.ts  # Playwright config file
- package.json     # Scripts and dependencies
- tsconfig.json    # TypeScript config

### Patterns Used  

Page Object Model (POM): Encapsulates UI logic in reusable classes under /Pages
Custom Fixtures: Defined in utils/fixtures.ts to inject dependencies into tests

### Helper Tools:

IpBuilder.ts for generating random IP addresses





 
