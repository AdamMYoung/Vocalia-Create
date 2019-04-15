import { getInjectedFetch } from "./ApiUtils";
import { Podcast } from "../../models/Podcast";
import { PodcastUpload } from "../../models/ingest/PodcastUpload";
import { BlobUpload } from "../../models/ingest/BlobUpload";
import { SessionClip } from "../../models/SessionClip";

const API = process.env.REACT_APP_INGEST_API_URL;
const PODCAST = "podcast";
const PODCASTS = "podcasts";
const SESSION = "session";
const SESSION_COMPLETE = "session/complete";
const CLIP = "clip";
const INVITE = "invite";
const RECORD = "record";
const INVITE_INFO = "invite/info";

export default class IngestApiRepository {
  // Sessions

  /**
   * Creates a new session for the specified podcast.
   * @param accessToken Token for API access.
   * @param podcastUid UID of the podcast.
   */
  public async createSession(accessToken: string, podcastUid: string) {
    await getInjectedFetch(
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
    await getInjectedFetch(
      API + SESSION + "?sessionUid=" + sessionUid,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Completes the specified session.
   * @param accessToken Token for API access.
   * @param sessionUid UID of the session.
   */
  public async completeSession(accessToken: string, sessionUid: string) {
    await getInjectedFetch(
      API + SESSION_COMPLETE + "?sessionUid=" + sessionUid,
      accessToken,
      "PUT"
    );
  }

  // Clips

  /**
   * Gets all clips belonging to the specified sessionUid.
   * @param accessToken Token for API access.
   * @param sessionUid UID of the session.
   */
  public async getClips(
    accessToken: string,
    sessionUid: string
  ): Promise<SessionClip[] | null> {
    return await getInjectedFetch(
      API + CLIP + "?sessionUid=" + sessionUid,
      accessToken,
      "GET"
    )
      .then(response => response.json())
      .then(data => data as SessionClip[])
      .catch(() => null);
  }

  /**
   * Finishes the specified clip.
   * @param accessToken Token for API access.
   * @param sessionUid UID of the session.
   */
  public async finishClip(accessToken: string, sessionUid: string) {
    await getInjectedFetch(
      API + CLIP + "?sessionUid=" + sessionUid,
      accessToken,
      "PUT"
    );
  }

  /**
   * Deletes the specified clip.
   * @param accessToken Token for API access.
   * @param clipUid UID of the clip.
   */
  public async deleteClip(accessToken: string, clipUid: string) {
    await getInjectedFetch(
      API + CLIP + "?clipUid=" + clipUid,
      accessToken,
      "DELETE"
    );
  }

  // Podcasts

  /**
   * Gets all podcasts belonging to the specified group UID.
   * @param accessToken Token for API access.
   */
  public async getPodcasts(accessToken: string): Promise<Podcast[] | null> {
    return await getInjectedFetch(API + PODCASTS, accessToken)
      .then(response => response.json())
      .then(data => data as Podcast[])
      .catch(() => null);
  }

  /**
   * Gets specific podcast information for the provided UID.
   * @param accessToken Token for API access.
   * @param podcastUid UID of the specified podcast.
   */
  public async getPodcastDetail(
    accessToken: string,
    podcastUid: string
  ): Promise<Podcast | null> {
    return await getInjectedFetch(
      API + PODCAST + "?podcastUid=" + podcastUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Podcast)
      .catch(() => null);
  }

  /**
   * Adds a podcast to the database.
   * @param accessToken Token for API access.
   * @param podcast Podcast to add.
   */
  public async createPodcast(accessToken: string, podcast: PodcastUpload) {
    await getInjectedFetch(API + PODCAST, accessToken, "POST", podcast);
  }

  /**
   * Updates the provided podcast.
   * @param accessToken Token for API access.
   * @param podcast Podcast to update.
   */
  public async editPodcast(accessToken: string, podcast: PodcastUpload) {
    await getInjectedFetch(API + PODCAST, accessToken, "PUT", podcast);
  }

  /**
   * Deletes the podcast with the specified UID.
   * @param accessToken Token for API access.
   * @param podcastUid Podcast to delete.
   */
  public async deletePodcast(accessToken: string, podcastUid: string) {
    await getInjectedFetch(
      API + PODCAST + "?podcastUid=" + podcastUid,
      accessToken,
      "DELETE"
    );
  }

  // Invite

  /**
   * Gets the podcast attached to the invite.
   * @param accessToken Token for API access.
   * @param inviteLink Invitation link recieved.
   */
  async getInvitePodcastInfo(
    accessToken: string,
    inviteLink: string
  ): Promise<Podcast | null> {
    return await getInjectedFetch(
      API + INVITE_INFO + "?inviteLink=" + inviteLink,
      accessToken
    )
      .then(x => x.json())
      .then(data => data as Podcast)
      .catch(() => null);
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
    expiry: Date | null
  ): Promise<string | null> {
    var query = API + INVITE + "?podcastUid=" + podcastUid;
    if (expiry) query = query + "&expiry=" + expiry;

    return await getInjectedFetch(query, accessToken)
      .then(response => response.json())
      .then(data => data as string);
  }

  /**
   * Accepts the invite link provided.
   * @param accessToken Token for API access.
   * @param inviteLink GUID for invites.
   */
  public async acceptInviteLink(accessToken: string, inviteLink: string) {
    await getInjectedFetch(
      API + INVITE + "?inviteLink=" + inviteLink,
      accessToken,
      "PUT"
    );
  }

  // Media

  /**
   * Adds the specified media data to the database.
   * @param accessToken Access token for API access.
   * @param data Data to push.
   */
  public async pushMediaData(accessToken: string, data: BlobUpload) {
    var headers = new Headers({
      Authorization: "Bearer " + accessToken
    });
    var formData = new FormData();
    formData.append("timestamp", Math.round(data.timestamp).toString());
    formData.append("sessionUid", data.sessionUid);
    formData.append("data", data.data);

    await fetch(API + RECORD, {
      headers: headers,
      method: "POST",
      body: formData
    });
  }
}
