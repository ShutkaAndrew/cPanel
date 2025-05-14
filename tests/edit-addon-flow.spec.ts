import { test, expect } from '../utils/fixtures';
import { IpBuilder } from '../utils/ipBuilder';

test('edit addon flow after review and verify updated summary', async ({
  productBlock,
  licensePage,
  addonPage,
  summaryBlock,
  reviewPage,
  checkoutPage,
  page
}) => {
  const ip = new IpBuilder().build();

  // 1. Open product page and check not authorized
  await productBlock.openPage();
  await productBlock.openAccountDropdown();
  await expect(productBlock.loginLinkItem).toBeVisible();

  // 2. Select product and license
  await productBlock.selectProduct('cPanel Licenses');
  await licensePage.selectLicense('cPanel Solo® Cloud (1 Account)');

  // 3. Fill IP and wait for Order Summary
  await addonPage.fillIpAddress(ip);
  await expect(summaryBlock.continueButton).toBeVisible();
  await expect(summaryBlock.continueButton).toBeEnabled({timeout:5000});

  // 4. Save summary before any addons
  const summaryBefore = await summaryBlock.getItemTitles();

  // 5. Add initial addons
  const selectedAddons: { title: string }[] = [];
  await addonPage.selectAddon('WHMCS Plus', selectedAddons);

  // 6. Capture summary after addons
  await expect(summaryBlock.continueButton).toBeEnabled({timeout:5000});;
  const summaryAfter = await summaryBlock.getItemTitles();

  // 7. Assert that Order Summary was updated
  expect(summaryAfter).not.toEqual(summaryBefore);

  // 8. Go to Review page
  await summaryBlock.clickContinue();
  await expect(reviewPage.checkoutButton).toBeVisible();

  // 9. Click Edit on Review page
  await reviewPage.clickEdit();

  // 10. Fill IP again (field may reset)
  await addonPage.fillIpAddress(ip);
  await expect(summaryBlock.continueButton).toBeVisible();
  await expect(summaryBlock.continueButton).toBeEnabled({timeout:5000});

  // 11. Add another addon after Edit
  await addonPage.selectAddon('JetBackup', selectedAddons);

  // 12. Capture updated summary
  const summaryAfterEdit = await summaryBlock.getItemTitles();

  // 13. Ensure Order Summary was updated again
  expect(summaryAfterEdit).not.toEqual(summaryAfter);

  // 14. Go to Review again
  await summaryBlock.clickContinue();
  const reviewTitles = await reviewPage.getItemTitles();

  // 15. Ensure all added items are present on Review
  for (const item of selectedAddons) {
    expect(reviewTitles).toContain(item.title);
  }

  // 16. Go to Checkout
  await reviewPage.clickCheckout();
  const checkoutTitles = await checkoutPage.getCheckoutItemTitles();

  // 17. Validate that Checkout contains all selected items
  for (const item of selectedAddons) {
    expect(checkoutTitles).toContain(item.title);
  }

  // 18. Final UI validations
  await expect(checkoutPage.personalInfoBlock).toBeVisible();
  await expect(checkoutPage.accountSecurityBlock).toBeVisible();
  await expect(checkoutPage.termsAndConditionsBlock).toBeVisible();
  await expect(checkoutPage.paymentDetailsBlock).toBeVisible();
  await expect(checkoutPage.completeOrderButton).toBeDisabled();
});