import { Page, Locator } from '@playwright/test';

export class AddonPage {
  private ipAddressField: Locator;
  private addonBlock: Locator;
  public continueButton: Locator;

  constructor(private page: Page) {
    this.ipAddressField = page.locator('#customfield11.form-control');
    this.addonBlock = page.locator('.col-sm-6');
    this.continueButton = page.locator('#btnCompleteProductConfig.btn');
  }

  //  Enter the IP address and press Enter
  async fillIpAddress(ip: string): Promise<void> {
    await this.ipAddressField.fill(ip);
    await this.ipAddressField.press('Enter');
  }

  //  Get a specific addon block by its title
  getAddonBlockByTitle(title: string): Locator {
    return this.addonBlock.filter({ hasText: title });
  }

  //  Get only addon title (no price)
  async getAddonTitle(title: string): Promise<string> {
    const block = this.getAddonBlockByTitle(title);
    const name = await block.locator('label').innerText();
    return name.trim();
  }

  //  Click the “Add to Cart” button in the addon block
  async clickAddToCart(title: string): Promise<void> {
    const block = this.getAddonBlockByTitle(title);
    await block.locator('.panel-add').click();
  }

  //  Save title and click Add to Cart
  async selectAddon(title: string, storage: { title: string }[]): Promise<void> {
    const name = await this.getAddonTitle(title);
    storage.push({ title: name });
    await this.clickAddToCart(title);
  }

  //  Click the Continue button
  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}