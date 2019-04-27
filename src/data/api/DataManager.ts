import IngestApiRepository from "./IngestApiRepository";
import SocialApiRepository from "./SocialApiRepository";
import EditorApiRepository from "./EditorApiRepository";
import { User } from "../../models/User";
import { PodcastUpload } from "../../models/ingest/PodcastUpload";
import { Podcast } from "../../models/Podcast";
import { BlobUpload } from "../../models/ingest/BlobUpload";
import { SessionClip } from "../../models/SessionClip";
import Clip from "../../models/editor/Clip";
import ClipEdit from "../../models/editor/ClipEdit";
import { PublishedPodcast } from "../../models/publishing/PublishedPodcast";
import { PublishedEpisode } from "../../models/publishing/PublishedEpisode";
import PublishingApiRepository from "./PublishingApiRepository";
import { UnassignedPodcast } from "../../models/publishing/UnassignedPodcast";
import { UnassignedEpisode } from "../../models/publishing/UnassignedEpisode";
import { Language } from "../../models/publishing/Language";
import { Category } from "../../models/publishing/Category";

export default class DataManager {
  private ingest: IngestApiRepository = new IngestApiRepository();
  private social: SocialApiRepository = new SocialApiRepository();
  private editor: EditorApiRepository = new EditorApiRepository();
  private publishing: PublishingApiRepository = new PublishingApiRepository();
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
  public async finishClip(
    sessionId: string,
    name: string,
    clipId: string,
    file: Blob
  ) {
    if (this.accessToken)
      await this.ingest.finishClip(
        this.accessToken,
        sessionId,
        name,
        clipId,
        file
      );
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
   * Updates the session with the provided clips.
   * @param sessionUID UID of the session.
   * @param clips Clips to set as timeline.
   */
  public async setTimeline(sessionUID: string, clips: Clip[]) {
    if (this.accessToken)
      await this.editor.setTimeline(this.accessToken, sessionUID, clips);
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
   * Adds the edit to the database.
   * @param edit Edit to upload.
   */
  public async setEdit(edit: ClipEdit) {
    if (this.accessToken) await this.editor.setEdit(this.accessToken, edit);
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

  /**
   * Finishes the edit session.
   * @param sessionUid UID of the session.
   */
  public async finishEditSession(sessionUid: string) {
    if (this.accessToken)
      await this.editor.finishEditSession(this.accessToken, sessionUid);
  }

  // Publishing Repository

  /**
   * Gets all unassigned podcasts.
   */
  public async getUnassignedPodcasts(): Promise<UnassignedPodcast[] | null> {
    if (this.accessToken)
      return await this.publishing.getUnassignedPodcasts(this.accessToken);

    return null;
  }

  /**
   * Gets all unassigned episodes.
   */
  public async getAssignedPodcasts(): Promise<PublishedPodcast[] | null> {
    if (this.accessToken)
      return await this.publishing.getAssignedPodcasts(this.accessToken);

    return null;
  }

  /**
   * Gets all assigned podcasts.
   */
  public async getUnassignedEpisodes(): Promise<UnassignedEpisode[] | null> {
    if (this.accessToken)
      return await this.publishing.getUnassignedEpisodes(this.accessToken);

    return null;
  }

  /**
   * Updates the specified podcast.
   */
  public async updatePodcast(podcast: PublishedPodcast) {
    if (this.accessToken)
      await this.publishing.updatePodcast(this.accessToken, podcast);
  }

  /**
   * Updates the specified episode.
   */
  public async updateEpisode(episode: PublishedEpisode) {
    if (this.accessToken)
      await this.publishing.updateEpisode(this.accessToken, episode);
  }

  /**
   * Deletes the specified podcast.
   */
  public async deletePublishedPodcast(podcastUid: string) {
    if (this.accessToken)
      await this.publishing.deletePodcast(this.accessToken, podcastUid);
  }

  /**
   * Deletes the specified episode.
   */
  public async deletePublishedEpisode(episodeUid: string) {
    if (this.accessToken)
      await this.publishing.deleteEpisode(this.accessToken, episodeUid);
  }

  /**
   * Gets all assignable languages.
   */
  public async getLanguages(): Promise<Language[]> {
    return await this.publishing.getLanguages();
  }

  /**
   * Gets all assignable categories.
   */
  public async getCategories(): Promise<Category[]> {
    return await this.publishing.getCategories();
  }
}
