import { Page, Locator } from '@playwright/test';

export class LicensePage {
  private licenseBlock: Locator;

  constructor(page: Page) {
    this.licenseBlock = page.locator('.col-md-6');
  }

  //  Finds a license block by its name
  getLicenseBlockByTitle(title: string): Locator {
    return this.licenseBlock.filter({ hasText: title });
  }

  //  Gets the license title only (no price)
  async getLicenseTitle(title: string): Promise<string> {
    const block = this.getLicenseBlockByTitle(title);
    const name = await block.locator('header').innerText();
    return name.trim();
  }

  //  Clicks on the Order Now button in the block
  async clickOrderNow(title: string): Promise<void> {
    const block = this.getLicenseBlockByTitle(title);
    await block.locator('.btn-order-now').click();
  }

  // Combines getting the title and clicking Order Now
  async selectLicense(title: string): Promise<{ title: string }> {
    const name = await this.getLicenseTitle(title);
    await this.clickOrderNow(title);
    return { title: name };
  }
}