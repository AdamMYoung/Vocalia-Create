import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import EditorApiRepository from "./EditorApiRepository";
import { User } from "../../models/User";
import { PodcastUpload } from "../../models/ingest/PodcastUpload";
import { Podcast } from "../../models/Podcast";
import { BlobUpload } from "../../models/ingest/BlobUpload";
import { SessionClip } from "../../models/SessionClip";

export default class DataManager {
  private ingest: IngestApiRepository = new IngestApiRepository();
  private social: SocialApiRepository = new SocialApiRepository();
  private editor: EditorApiRepository = new EditorApiRepository();
  accessToken: string | null = null;

  //  Social

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

  //  Podcast

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

  // Session

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
   * Completes the specified session.
   * @param sessionId UID of the session.
   */
  public async completeSession(sessionId: string) {
    if (this.accessToken)
      await this.ingest.completeSession(this.accessToken, sessionId);
  }

  // Clips

  /**
   * Finishes the current clip being recorded at the session.
   * @param sessionId UID of the session.
   */
  public async finishClip(sessionId: string, name: string) {
    if (this.accessToken)
      await this.ingest.finishClip(this.accessToken, sessionId, name);
  }

  /**
   * Gets all clips for the specified session.
   * @param sessionId UID of the session.
   */
  public async getClips(sessionId: string): Promise<SessionClip[] | null> {
    if (this.accessToken) {
      return await this.ingest.getClips(this.accessToken, sessionId);
    }

    return null;
  }

  /**
   * Deletes the specified clip.
   * @param clipId UID of the clip.
   */
  public async deleteClip(clipId: string) {
    if (this.accessToken)
      await this.ingest.deleteClip(this.accessToken, clipId);
  }

  // Invites

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

  /**
   * Adds the specified media data to the database.
   * @param data Data to push.
   */
  public async pushMediaData(data: BlobUpload) {
    if (this.accessToken)
      await this.ingest.pushMediaData(this.accessToken, data);
  }

  //  Editor Repo

  /**
   * Returns all edit streams of the current session.
   * @param sessionUID UID of the session.
   */
  public async getTimeline(sessionUID: string) {
    if (this.accessToken)
      return await this.editor.getTimeline(this.accessToken, sessionUID);

    return null;
  }

  /**
   * Returns all edit streams of the current session.
   * @param sessionUID UID of the session.
   */
  public async getEditorClips(sessionUID: string) {
    if (this.accessToken)
      return await this.editor.getClips(this.accessToken, sessionUID);

    return null;
  }

  /**
   * Returns all editable podcasts.
   */
  public async getEditablePodcasts() {
    if (this.accessToken)
      return await this.editor.getPodcasts(this.accessToken);

    return null;
  }

  /**
   * Returns detail about the specified podcast.
   * @param podcastUid UID of the podcast.
   */
  public async getEditorPodcastDetail(podcastUid: string) {
    if (this.accessToken)
      return await this.editor.getPodcast(this.accessToken, podcastUid);

    return null;
  }

  /**
   * Deletes the edit session from the database if authorized.
   * @param sessionUid UID of the session.
   */
  public async deleteEditSession(sessionUid: string) {
    if (this.accessToken)
      await this.editor.deleteEditSession(this.accessToken, sessionUid);
  }
}
