import type {
  IConfigRepository,
  SiteConfig,
} from "../../ports/repositories/IConfigRepository";

export class ConfigService {
  constructor(private readonly configRepository: IConfigRepository) {}

  async get(): Promise<SiteConfig> {
    return this.configRepository.get();
  }

  async update(data: Partial<SiteConfig>): Promise<SiteConfig> {
    return this.configRepository.update(data);
  }
}
