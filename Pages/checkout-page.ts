import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;
  public readonly tableRows: Locator;

  // Sections on the Checkout page
  readonly personalInfoBlock: Locator;
  readonly accountSecurityBlock: Locator;
  readonly termsAndConditionsBlock: Locator;
  readonly paymentDetailsBlock: Locator;
  readonly completeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    
    this.tableRows = page.locator('.table-responsive tbody tr');   
    this.personalInfoBlock = page.getByText('Personal Information');
    this.accountSecurityBlock = page.getByText('Account Security');
    this.termsAndConditionsBlock = page.getByText('Terms & Conditions');
    this.paymentDetailsBlock = page.getByText('Payment Details');
    this.completeOrderButton = page.locator('#btnCompleteOrder');
  }

  //  Click on Checkout button from Review page
  async clickCheckout(): Promise<void> {
    await this.page.locator('#checkout').click();
  }

  //  Extract only item titles from the table
  async getCheckoutItemTitles(): Promise<string[]> {
  const titles: string[] = [];
  const rows = this.page.locator('.table-responsive tbody tr');
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);

    let title = (await row.locator('td').nth(0).innerText()).trim();
    title = title.replace('Edit', '').replace(/\s+/g, ' ').trim();

    if (
      title &&
      !title.toLowerCase().includes('monthly') &&
      !title.toLowerCase().includes('remove') &&
      !title.toLowerCase().includes('edit') &&
      !title.toLowerCase().includes('total') &&
      !title.toLowerCase().includes('sub')
    ) {
      titles.push(title);
    }
  }

  return titles;
}


  //  Check if a specific section is visible by name
  async isSectionVisible(sectionName: string): Promise<boolean> {
    return this.page.locator(`text=${sectionName}`).isVisible();
  }

  //  Check if Complete Order button is disabled
  async isCompleteOrderDisabled(): Promise<boolean> {
    return !(await this.completeOrderButton.isEnabled());
  }
}