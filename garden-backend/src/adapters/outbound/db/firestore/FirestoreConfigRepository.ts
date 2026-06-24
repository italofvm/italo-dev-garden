import { getDb } from "../../../../config/firebase";
import type {
  IConfigRepository,
  SiteConfig,
} from "../../../../ports/repositories/IConfigRepository";

const DEFAULT_CONFIG: SiteConfig = {
  bioTitle: "Olá, eu sou o Italo",
  bioDescription: "Desenvolvedor focado em criar soluções robustas.",
  availableForFreela: true,
};

export class FirestoreConfigRepository implements IConfigRepository {
  private readonly collection = getDb().collection("config");
  private readonly docId = "site";

  async get(): Promise<SiteConfig> {
    const doc = await this.collection.doc(this.docId).get();

    if (!doc.exists) {
      await this.collection.doc(this.docId).set(DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }

    const data = doc.data() as Partial<SiteConfig>;
    return {
      bioTitle: data.bioTitle ?? DEFAULT_CONFIG.bioTitle,
      bioDescription: data.bioDescription ?? DEFAULT_CONFIG.bioDescription,
      availableForFreela:
        data.availableForFreela ?? DEFAULT_CONFIG.availableForFreela,
    };
  }

  async update(config: Partial<SiteConfig>): Promise<SiteConfig> {
    const ref = this.collection.doc(this.docId);
    await ref.set(config, { merge: true });
    const updated = await ref.get();

    const data = updated.data() as Partial<SiteConfig>;
    return {
      bioTitle: data.bioTitle ?? DEFAULT_CONFIG.bioTitle,
      bioDescription: data.bioDescription ?? DEFAULT_CONFIG.bioDescription,
      availableForFreela:
        data.availableForFreela ?? DEFAULT_CONFIG.availableForFreela,
    };
  }
}
