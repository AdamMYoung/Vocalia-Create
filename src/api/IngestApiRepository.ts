import { Group, Podcast, Session } from "../utility/types";

const API = process.env.REACT_APP_INGEST_API_URL;
const GROUP = "group";
const PODCAST = "podcast";
const SESSION = "session";
const INVITE = "invite";

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
   * Creates a new session for the specified podcast.
   * @param accessToken Token for API access.
   * @param podcastUid UID of the podcast.
   */
  public async createPodcastSession(accessToken: string, podcastUid: string) {
    await this.getInjectedFetch(
      API + SESSION + "?podcastUid=" + podcastUid,
      accessToken,
      "POST"
    );
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
   * Adds a podcast to the specified group.
   * @param accessToken Token for API access.
   * @param groupUid UID of the group to add to.
   * @param name Name of the podcast to add.
   */
  public async createGroupPodcast(
    accessToken: string,
    groupUid: string,
    name: String
  ) {
    await this.getInjectedFetch(
      API + PODCAST + "?groupUid=" + groupUid + "&name=" + name,
      accessToken,
      "POST"
    );
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
   * Gets an invite link to add others to a group.
   * @param accessToken Token for API access.
   * @param groupId Group to get invite link for.
   * @param expiry Date when the link should expire (optional).
   */
  public async getInviteLink(
    accessToken: string,
    groupId: string,
    expiry: Date
  ): Promise<string | null> {
    var query = API + INVITE + "?groupUid=" + groupId;
    if (expiry) query = query + "&expiry=" + expiry;

    return await this.getInjectedFetch(query, accessToken)
      .then(response => response.json())
      .then(data => data as string);
  }

  /**
   * Accepts the invite link provided.
   * @param accessToken Token for API access.
   * @param inviteLink GUID for invites.
   */
  public async acceptInviteLink(accessToken: string, inviteLink: string) {
    await this.getInjectedFetch(
      API + INVITE + "?inviteLink=" + inviteLink,
      accessToken,
      "PUT"
    );
  }

  /**
   * Adds a podcast to the specified group.
   * @param accessToken Token for API access.
   * @param name Name of the group to add.
   * @param description Description of the group.
   */
  public async createUserGroup(
    accessToken: string,
    name: string,
    description: String
  ) {
    await this.getInjectedFetch(
      API + GROUP + "?name=" + name + "&description=" + description,
      accessToken,
      "POST"
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
