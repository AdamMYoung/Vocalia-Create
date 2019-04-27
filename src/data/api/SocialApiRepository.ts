import { getInjectedFetch } from "./ApiUtils";
import { User } from "../../models/User";

const API = process.env.REACT_APP_SOCIAL_API_URL;
const USER_DETAIL = "user/detail";
const USER = "user";

export default class SocialApiRepository {
  /**
   * Gets the signed in user's timeline.
   * @param accessToken Token for API access.
   */
  public async getSignedInUserInfo(accessToken: string): Promise<User | null> {
    return await getInjectedFetch(API + USER, accessToken)
      .then(response => response.json())
      .then(data => data as User)
      .catch(() => null);
  }

  /**
   * Gets the specified user's timeline.
   * @param userId User to fetch.
   */
  public async getUserDetailInfo(userId: string): Promise<User | null> {
    return await fetch(API + USER_DETAIL + "?userId=" + userId)
      .then(response => response.json())
      .then(data => data as User)
      .catch(() => null);
  }
}
