import { test as base, expect as baseExpect } from '@playwright/test';

import { ProductPage } from '../Pages/product-page';
import { LicensePage } from '../Pages/license-selection-page';
import { AddonPage } from '../Pages/addon-page';
import { ReviewPage } from '../Pages/review-page';
import { OrderSummaryPage } from '../Pages/order-summary-page';
import { CheckoutPage } from '../Pages/checkout-page';

type MyFixtures = {
  productBlock: ProductPage;
  licensePage: LicensePage;
  addonPage: AddonPage;
  reviewPage: ReviewPage;
  summaryBlock: OrderSummaryPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  productBlock: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  licensePage: async ({ page }, use) => {
    await use(new LicensePage(page));
  },
  addonPage: async ({ page }, use) => {
    await use(new AddonPage(page));
  },
  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },
  summaryBlock: async ({ page }, use) => {
    await use(new OrderSummaryPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export const expect = baseExpect;