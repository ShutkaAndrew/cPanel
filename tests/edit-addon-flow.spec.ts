import { test, expect } from '../utils/fixtures';
import { IpBuilder } from '../utils/ipBuilder';

test('full addon flow and review summary verification with edit flow', async ({
  productBlock,
  licensePage,
  addonPage,
  reviewPage,
  summaryBlock,
  checkoutPage,
  page
}) => {
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
  await addonPage.selectAddon('Monthly CloudLinux for cPanel License', selectedAddons);
  await addonPage.selectAddon('Monthly KernelCare License', selectedAddons);

  // 7. Wait and verify summary
  await expect(summaryBlock.continueButton).toBeVisible();
  await expect(summaryBlock.continueButton).toBeEnabled({ timeout: 5000 });

  // 8. Capture item titles after addons
  const summaryAfter = await summaryBlock.getItemTitles();

  // 9. Verify that addons changed the summary
  expect(summaryAfter).not.toEqual(summaryBefore);

  // 10. Click Continue to go to Review page
  await summaryBlock.clickContinue();
  await expect(reviewPage.checkoutButton).toBeVisible();

  // 11. Get and verify review page titles match summary
  const reviewTitles = await reviewPage.getItemTitles();
  expect(reviewTitles).toEqual(summaryAfter);

  // 12. Click Edit to return to addon page
  await reviewPage.clickEdit();

  // 13. Re-enter IP address
  await addonPage.fillIpAddress(ip);

  // 14. Add different addons
  const updatedAddons: { title: string }[] = [];
  await addonPage.selectAddon('JetBackup', updatedAddons);
  await addonPage.selectAddon('ImunifyAV+', updatedAddons);

  // 15. Wait and capture new summary
  await expect(summaryBlock.continueButton).toBeVisible();
  await expect(summaryBlock.continueButton).toBeEnabled({ timeout: 5000 });
  const summaryUpdated = await summaryBlock.getItemTitles();

  // 16. Ensure updated summary differs from the previous one
  expect(summaryUpdated).not.toEqual(summaryAfter);

  // 17. Proceed again to Review
  await summaryBlock.clickContinue();
  await expect(reviewPage.checkoutButton).toBeVisible();

  // 18. Compare new review with new summary
  const reviewUpdatedTitles = await reviewPage.getItemTitles();
  expect(reviewUpdatedTitles).toEqual(summaryUpdated);

  // 19. Proceed to Checkout
  await reviewPage.clickCheckout();
  await expect(checkoutPage.completeOrderButton).toBeVisible();

  // 20. Final verification on Checkout
  const checkoutTitles = await checkoutPage.getCheckoutItemTitles();
  expect(checkoutTitles).toEqual(reviewUpdatedTitles);

  // 21. Ensure sections are visible
  await expect(checkoutPage.personalInfoBlock).toBeVisible();
  await expect(checkoutPage.accountSecurityBlock).toBeVisible();
  await expect(checkoutPage.termsAndConditionsBlock).toBeVisible();
  await expect(checkoutPage.paymentDetailsBlock).toBeVisible();

  // 22. Ensure 'Complete Order' is disabled
  await expect(checkoutPage.completeOrderButton).toBeDisabled();
});