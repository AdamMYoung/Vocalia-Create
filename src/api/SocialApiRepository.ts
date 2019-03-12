import { User, Listen } from "../utility/types";

const API = process.env.REACT_APP_SOCIAL_API_URL;
const USER_DETAIL = "user/detail";
const USER_OVERVIEW = "user/overview";
const FEED = "feed";
const FOLLOWERS = "followers";

export default class SocialApiRepository {
  /**
   * Gets the signed in user's timeline.
   * @param accessToken Token for API access.
   */
  public async getSignedInUserInfo(accessToken: string): Promise<User | null> {
    return await this.getInjectedFetch(API + FEED, accessToken)
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

  /**
   * Gets the specified user's timeline.
   * @param userId User to fetch.
   */
  public async getUserOverviewInfo(userId: string): Promise<User | null> {
    return await fetch(API + USER_OVERVIEW + "?userId=" + userId)
      .then(response => response.json())
      .then(data => data as User)
      .catch(() => null);
  }

  /**
   * Adds the specified user to the signed-in user's follows.
   * @param accessToken Token for API access.
   * @param userId User to add.
   */
  public async addFollow(accessToken: string, userId: string) {
    await this.getInjectedFetch(
      API + FOLLOWERS + "?followId=" + userId,
      accessToken,
      "POST"
    );
  }

  /**
   * Removes the specified user from the signed-in user's follows.
   * @param accessToken Token for API access.
   * @param userId User to remove.
   */
  public async removeFollow(accessToken: string, userId: string) {
    await this.getInjectedFetch(
      API + FOLLOWERS + "?followId=" + userId,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Injects a fetch object with access token headers and returns it.
   * @param url Path to query.
   * @param accessToken Access token to verify users.
   */
  private getInjectedFetch(
    url: string,
    accessToken: string | null,
    queryType: string = "GET",
    body: {} | null = null
  ) {
    var headers = new Headers({
      "content-type": "application/json",
      Authorization: "Bearer " + accessToken
    });

    return accessToken != null
      ? fetch(url, {
          headers: headers,
          method: queryType,
          body: body != null ? JSON.stringify(body) : null
        })
      : fetch(url, {
          method: queryType,
          body: body != null ? JSON.stringify(body) : null
        });
  }
}
