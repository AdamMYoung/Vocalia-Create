import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import { User } from "../utility/types";

export default class DataManager {
  private ingest: IngestApiRepository = new IngestApiRepository();
  private social: SocialApiRepository = new SocialApiRepository();
  accessToken: string | null = null;

  updateUserInfo = async (userInfo: User) => {
    if (this.accessToken)
      await this.social.updateUserInfo(this.accessToken, userInfo);
  };
}
