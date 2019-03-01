import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import { User } from "../utility/types";

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
  public async getUserInfo(userId: string): Promise<User | null> {
    if (this.accessToken) return await this.social.getUserInfo(userId);
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
  public async getUserGroups() {
    if (this.accessToken)
      return await this.ingest.getUserGroups(this.accessToken);
  }

  /**
   * Gets all podcasts belonging to the specified group UID.
   * @param groupUid UID of the group.
   */
  public async getGroupPodcasts(groupUid: string) {
    if (this.accessToken)
      return await this.ingest.getGroupPodcasts(this.accessToken, groupUid);
  }

  /**
   * Gets all sessions belonging to the specified podcast UID.
   * @param podcastUid UID of the podcast.
   */
  public async getPodcastSessions(podcastUid: string) {
    if (this.accessToken)
      return await this.ingest.getPodcastSessions(this.accessToken, podcastUid);
  }
}
