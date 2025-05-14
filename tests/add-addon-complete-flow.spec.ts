import { test, expect } from '../utils/fixtures';
import { IpBuilder } from '../utils/ipBuilder';

test('full addon flow and review summary verification', async ({ productBlock, licensePage, addonPage, reviewPage, summaryBlock, checkoutPage, page }) => {
  const ip = new IpBuilder().build();

  // 1. Open product page and confirm not authorized
  await productBlock.openPage();
  await productBlock.openAccountDropdown();
  await productBlock.isnotAuthorized();

  // 2. Select product category
  await productBlock.selectProduct('cPanel Licenses');

  // 3. Select license
  await licensePage.selectLicense('cPanel Solo® Cloud (1 Account)');

  // 4. Enter IP and wait for summary to load
  await addonPage.fillIpAddress(ip);
  await expect(summaryBlock.continueButton).toBeVisible();

  // 5. Capture item titles before addons
  const summaryBefore = await summaryBlock.getItemTitles();

  // 6. Select addons
  const selectedAddons: { title: string }[] = [];
  await addonPage.selectAddon('LiteSpeed 8GB', selectedAddons);
     await addonPage.selectAddon('WHMCS Plus', selectedAddons);
        await addonPage.selectAddon(' Monthly CloudLinux for cPanel License', selectedAddons);
           await addonPage.selectAddon(' Monthly KernelCare License', selectedAddons);


  // 7. Check updated summary and button visibility
  await expect(summaryBlock.continueButton).toBeVisible();
  await expect(summaryBlock.continueButton).toBeEnabled({timeout: 5000});

  // 8. Capture item titles after addons
  const summaryAfter = await summaryBlock.getItemTitles();

  // 9. Verify that addons changed the summary
  expect(summaryAfter).not.toEqual(summaryBefore);

  // 10. Click Continue
  await summaryBlock.clickContinue();
  await expect(reviewPage.checkoutButton).toBeVisible()

  // 11. Get item titles from Review page
  const reviewTitles = await reviewPage.getItemTitles();

  // 12. Compare Review titles with updated summary titles
  expect(reviewTitles).toEqual(summaryAfter);

  // 13. Proceed to Checkout
  await reviewPage.clickCheckout();
  await expect(checkoutPage.completeOrderButton).toBeVisible()

  // 14. Get item titles from Checkout page
  const checkoutTitles = await checkoutPage.getCheckoutItemTitles();

  expect(checkoutTitles).toEqual(reviewTitles);

  // 16–20. Validate visibility of all checkout page sections
  await expect(checkoutPage.personalInfoBlock).toBeVisible();
  await expect(checkoutPage.accountSecurityBlock).toBeVisible();
  await expect(checkoutPage.termsAndConditionsBlock).toBeVisible();
  await expect(checkoutPage.paymentDetailsBlock).toBeVisible();

  // 21. Ensure "Complete Order" button is visible but disabled
  await expect(checkoutPage.completeOrderButton).toBeVisible();
  await expect(checkoutPage.completeOrderButton).toBeDisabled();
});