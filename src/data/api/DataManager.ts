import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import { User, Podcast, Session, PodcastUpload } from "../../utility/types";

export default class DataManager {
  private ingest: IngestApiRepository = new IngestApiRepository();
  private social: SocialApiRepository = new SocialApiRepository();
  accessToken: string | null = null;

  /**
   * Gets the signed in user's timeline.
   */
  public async getSignedInUserInfo(): Promise<User | null> {
    if (this.accessToken)
      return await this.social.getSignedInUserInfo(this.accessToken);
    return null;
  }

  /**
   * Gets the specified user's timeline.
   * @param userId User to fetch.
   */
  public async getUserDetailInfo(userId: string): Promise<User | null> {
    if (this.accessToken) return await this.social.getUserDetailInfo(userId);
    return null;
  }

  /**
   * Gets the specified user's timeline.
   * @param userId User to fetch.
   */
  public async getUserOverviewInfo(userId: string): Promise<User | null> {
    if (this.accessToken) return await this.social.getUserOverviewInfo(userId);
    return null;
  }

  /**
   * Adds the specified user to the signed-in user's follows.
   * @param userId User to add.
   */
  public async addFollow(userId: string) {
    if (this.accessToken) await this.social.addFollow(this.accessToken, userId);
  }

  /**
   * Removes the specified user from the signed-in user's follows.
   * @param userId User to remove.
   */
  public async removeFollow(userId: string) {
    if (this.accessToken)
      await this.social.removeFollow(this.accessToken, userId);
  }

  /**
   * Gets all podcasts belonging to the specified group UID.
   */
  public async getPodcasts(): Promise<Podcast[] | null> {
    if (this.accessToken)
      return await this.ingest.getPodcasts(this.accessToken);
    return null;
  }

  /**
   * Gets specific podcast information for the provided UID.
   * @param podcastUid UID of the specified podcast.
   */
  public async getPodcastDetail(podcastUid: string): Promise<Podcast | null> {
    if (this.accessToken)
      return await this.ingest.getPodcastDetail(this.accessToken, podcastUid);
    return null;
  }

  /**
   * Adds a podcast to the specified group.
   * @param podcast Podcast to insert.
   */
  public async createPodcast(podcast: PodcastUpload) {
    console.log(podcast);
    if (this.accessToken)
      await this.ingest.createPodcast(this.accessToken, podcast);
  }

  /**
   * Updates the specfied podcast in the database.
   * @param podcast Podcast to insert.
   */
  public async editPodcast(podcast: PodcastUpload) {
    if (this.accessToken)
      await this.ingest.editPodcast(this.accessToken, podcast);
  }

  /**
   * Deletes the specified podcast from the database.
   * @param podcastUid UID of the podcast.
   */
  public async deletePodcast(podcastUid: string) {
    if (this.accessToken)
      await this.ingest.deletePodcast(this.accessToken, podcastUid);
  }

  /**
   * Creates a new session for the specified podcast.
   * @param podcastUid UID of the podcast.
   */
  public async createSession(podcastId: string) {
    if (this.accessToken)
      await this.ingest.createSession(this.accessToken, podcastId);
  }

  /**
   * Deletes the specified session.
   * @param sessionId UID of the session.
   */
  public async deleteSession(sessionId: string) {
    if (this.accessToken)
      await this.ingest.deleteSession(this.accessToken, sessionId);
  }

  /**
   * Gets the podcast attached to the invite.
   * @param inviteLink Invitation link recieved.
   */
  public async getInvitePodcastInfo(
    inviteLink: string
  ): Promise<Podcast | null> {
    if (this.accessToken)
      return await this.ingest.getInvitePodcastInfo(
        this.accessToken,
        inviteLink
      );
    return null;
  }

  /**
   * Creates an invite link to add others to a podcast.
   * @param podcastUid Podcast to get invite link for.
   * @param expiry Date when the link should expire (optional).
   */
  public async createInviteLink(
    podcastUid: string,
    expiry: Date | null
  ): Promise<string | null> {
    if (this.accessToken)
      return await this.ingest.getInviteLink(
        this.accessToken,
        podcastUid,
        expiry
      );

    return null;
  }

  /**
   * Creates an invite link to add others to a group.
   * @param groupId Group to get invite link for.
   * @param expiry Date when the link should expire (optional).
   */
  public async acceptInviteLink(groupUID: string) {
    if (this.accessToken)
      await this.ingest.acceptInviteLink(this.accessToken, groupUID);

    return null;
  }
}