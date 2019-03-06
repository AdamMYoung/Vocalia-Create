import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import { User, Group, Podcast, Session } from "../utility/types";

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
   * Gets the groups belonging to the current signed-in user.
   */
  public async getUserGroups(): Promise<Group[] | null> {
    if (this.accessToken)
      return await this.ingest.getUserGroups(this.accessToken);
    return null;
  }

  /**
   * Gets all podcasts belonging to the specified group UID.
   * @param groupUid UID of the group.
   */
  public async getGroupPodcasts(groupUid: string): Promise<Podcast[] | null> {
    if (this.accessToken)
      return await this.ingest.getGroupPodcasts(this.accessToken, groupUid);
    return null;
  }

  /**
   * Gets all sessions belonging to the specified podcast UID.
   * @param podcastUid UID of the podcast.
   */
  public async getPodcastSessions(
    podcastUid: string
  ): Promise<Session[] | null> {
    if (this.accessToken)
      return await this.ingest.getPodcastSessions(this.accessToken, podcastUid);
    return null;
  }

  /**
   * Adds a podcast to the specified group.
   * @param name Name of the group to add.
   * @param description Description of the group.
   */
  public async createNewGroup(name: string, description: string) {
    if (this.accessToken)
      await this.ingest.createUserGroup(this.accessToken, name, description);
  }

  /**
   * Adds a podcast to the specified group.
   * @param groupId UID of the group to add to.
   * @param name Name of the podcast to add.
   */
  public async createGroupPodcast(groupId: string, name: string) {
    if (this.accessToken)
      await this.ingest.createGroupPodcast(this.accessToken, groupId, name);
  }

  /**
   * Creates a new session for the specified podcast.
   * @param podcastUid UID of the podcast.
   */
  public async createPodcastSession(podcastId: string) {
    if (this.accessToken)
      await this.ingest.createPodcastSession(this.accessToken, podcastId);
  }

  /**
   * Creates an invite link to add others to a group.
   * @param groupId Group to get invite link for.
   * @param expiry Date when the link should expire (optional).
   */
  public async createInviteLink(
    groupUID: string,
    expiry: Date
  ): Promise<string | null> {
    if (this.accessToken)
      return await this.ingest.GetInviteLink(
        this.accessToken,
        groupUID,
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
      await this.ingest.AcceptInviteLink(this.accessToken, groupUID);

    return null;
  }
}
