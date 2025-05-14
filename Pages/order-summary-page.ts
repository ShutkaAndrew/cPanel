import { Page, Locator } from '@playwright/test';

export class OrderSummaryPage {
  private readonly summaryBlock: Locator;
  private readonly itemBlocks: Locator;
  public readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.summaryBlock = page.locator('.order-summary');
    this.itemBlocks = this.summaryBlock.locator('.clearfix');
    this.continueButton = page.locator('#btnCompleteProductConfig');
  }

  // Extracts and returns all item titles only (no prices)
  async getItemTitles(): Promise<string[]> {
    const count = await this.itemBlocks.count();
    const titles: string[] = [];

    for (let i = 0; i < count; i++) {
      const block = this.itemBlocks.nth(i);
      const title = (await block.locator('.pull-left').innerText()).trim();

      const cleanedTitle = title
        .replace(/^\+ /, '') // remove leading +
        .replace(/Edit/i, '') // remove "Edit"
        .replace(/\s+/g, ' ') // normalize spacing
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

  // Clicks the Continue button
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
