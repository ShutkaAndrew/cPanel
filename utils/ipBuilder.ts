import { faker } from '@faker-js/faker';

export class IpBuilder {
  private ip: string;

  constructor() {
    this.ip = faker.internet.ipv4();
  }

  withFixedIp(ip: string): this {
    this.ip = ip;
    return this;
  }

  build(): string {
    return this.ip;
  }
}