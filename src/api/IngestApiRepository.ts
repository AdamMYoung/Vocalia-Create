import { Group, Podcast, Session } from "../utility/types";

const API = process.env.REACT_APP_INGEST_API_URL;
const GROUP = "group";
const PODCAST = "podcast";
const SESSION = "session";

export default class IngestApiRepository {
  /**
   * Gets all sessions belonging to the specified podcast UID.
   * @param accessToken Token for API access.
   * @param podcastUid UID of the podcast.
   */
  public async getPodcastSessions(
    accessToken: string,
    podcastUid: string
  ): Promise<Session[] | null> {
    return await this.getInjectedFetch(
      API + SESSION + "?podcastUid=" + podcastUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Session[]);
  }

  /**
   * Gets all podcasts belonging to the specified group UID.
   * @param accessToken Token for API access.
   * @param groupUid UID of the group.
   */
  public async getGroupPodcasts(
    accessToken: string,
    groupUid: string
  ): Promise<Podcast[] | null> {
    return await this.getInjectedFetch(
      API + PODCAST + "?groupUid=" + groupUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Podcast[]);
  }

  /**
   * Gets the groups belonging to the current signed-in user.
   * @param accessToken Token for API access.
   */
  public async getUserGroups(accessToken: string): Promise<Group[] | null> {
    return await this.getInjectedFetch(API + GROUP, accessToken)
      .then(response => response.json())
      .then(data => data as Group[]);
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
