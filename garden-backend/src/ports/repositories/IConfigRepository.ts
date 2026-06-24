export interface SiteConfig {
  bioTitle: string;
  bioDescription: string;
  availableForFreela: boolean;
}

export interface IConfigRepository {
  get(): Promise<SiteConfig>;
  update(config: Partial<SiteConfig>): Promise<SiteConfig>;
}
