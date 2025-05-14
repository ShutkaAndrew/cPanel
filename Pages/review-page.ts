import { Page, Locator } from '@playwright/test';

export class ReviewPage {
  private readonly itemBlocks: Locator;
  public readonly checkoutButton: Locator;
  public editButton: Locator;

  constructor(private readonly page: Page) {
    this.itemBlocks = page.locator('.view-cart-items .item');
    this.checkoutButton = page.locator('#checkout');
    this.editButton = page.locator('.btn.btn-link.btn-xs .fa-pencil-alt');
    
  }

  // Returns a list of cleaned item titles (filters out unwanted text like "Edit", "Remove", "Monthly")
  async getItemTitles(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.itemBlocks.count();

    for (let i = 0; i < count; i++) {
      const item = this.itemBlocks.nth(i);
      const titleRaw = (await item.locator('.item-title').innerText()).trim();

      const cleanedTitle = titleRaw
        .replace('Edit', '')
        .replace(/\s+/g, ' ')
        .trim();

      if (
        cleanedTitle &&
        !cleanedTitle.toLowerCase().includes('monthly') &&
        !cleanedTitle.toLowerCase().includes('remove') &&
        !cleanedTitle.toLowerCase().includes('edit')
      ) {
        titles.push(cleanedTitle);
      }
    }

    return titles;
  }

  // Clicks the "Checkout" button to proceed to the next step
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // Clicks the "Edit" button to return to the previous configuration step
  async clickEdit(): Promise<void> {
    await this.editButton.click();
  }
}