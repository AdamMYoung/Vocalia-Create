import { Podcast, Session, PodcastUpload } from "../utility/types";

const API = process.env.REACT_APP_INGEST_API_URL;
const PODCAST = "podcast";
const SESSION = "session";
const INVITE = "invite";

export default class IngestApiRepository {
  /**
   * Creates a new session for the specified podcast.
   * @param accessToken Token for API access.
   * @param podcastUid UID of the podcast.
   */
  public async createSession(accessToken: string, podcastUid: string) {
    await this.getInjectedFetch(
      API + SESSION + "?podcastUid=" + podcastUid,
      accessToken,
      "POST"
    );
  }

  /**
   * Deletes a session from the specified podcast.
   * @param accessToken Token for API access.
   * @param sessionUid UID of the session.
   */
  public async deleteSession(accessToken: string, sessionUid: string) {
    await this.getInjectedFetch(
      API + SESSION + "?sessionUid=" + sessionUid,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Gets all podcasts belonging to the specified group UID.
   * @param accessToken Token for API access.
   */
  public async getPodcasts(accessToken: string): Promise<Podcast[] | null> {
    return await this.getInjectedFetch(API + PODCAST, accessToken)
      .then(response => response.json())
      .then(data => data as Podcast[]);
  }

  /**
   * Adds a podcast to the database.
   * @param accessToken Token for API access.
   * @param podcast Podcast to add.
   */
  public async createPodcast(accessToken: string, podcast: PodcastUpload) {
    await this.getInjectedFetch(API + PODCAST, accessToken, "POST", podcast);
  }

  /**
   * Updates the provided podcast.
   * @param accessToken Token for API access.
   * @param podcast Podcast to update.
   */
  public async editPodcast(accessToken: string, podcast: PodcastUpload) {
    await this.getInjectedFetch(API + PODCAST, accessToken, "PUT", podcast);
  }

  /**
   * Deletes the podcast with the specified UID.
   * @param accessToken Token for API access.
   * @param podcastUid Podcast to delete.
   */
  public async deletePodcast(accessToken: string, podcastUid: string) {
    await this.getInjectedFetch(
      API + PODCAST + "?podcastUid=" + podcastUid,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Gets an invite link to add others to a group.
   * @param accessToken Token for API access.
   * @param groupId Group to get invite link for.
   * @param expiry Date when the link should expire (optional).
   */
  public async getInviteLink(
    accessToken: string,
    podcastUid: string,
    expiry: Date
  ): Promise<string | null> {
    var query = API + INVITE + "?podcastUid=" + podcastUid;
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
