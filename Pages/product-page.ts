import { Page, Locator } from '@playwright/test'

export class ProductPage {
  private accountLink: Locator;
  private accountDropdown: Locator;
  readonly loginLinkItem: Locator;
  private titleBlock: Locator;

  constructor(private page: Page) {
    this.accountLink = page.locator('#Secondary_Navbar-Account');
    this.accountDropdown = page.locator('.dropdown-menu.dropdown-menu-right.show');
    this.loginLinkItem = page.getByRole('link', { name: 'Login' });
    this.titleBlock = page.locator('.card.mb-3');
  }

  // Navigates to the main page
  async openPage() {
    await this.page.goto('/');
  }

  // Finds a product block by its title
  async getBlockByTitle(title: string): Promise<Locator> {
    return this.titleBlock.filter({ hasText: title });
  }

  // Clicks the "Browse Products" button inside a block
  async clickBrowseButton(block: Locator): Promise<void> {
    await block.locator('.btn-block').click();
  }

  // Selects a product by name and clicks its "Browse" button
  async selectProduct(productName: string): Promise<void> {
    const block = await this.getBlockByTitle(productName);
    await this.clickBrowseButton(block);
  }

  // Opens the account dropdown menu
  async openAccountDropdown() {
    await this.accountLink.click();
  }

  // Checks if the user is not logged in (Login link is visible)
  async isnotAuthorized(): Promise<boolean> {
    return await this.loginLinkItem.isVisible();
  }
}