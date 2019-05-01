import { Category } from "../../models/publishing/Category";
import { Language } from "../../models/publishing/Language";
import { PublishedEpisode } from "../../models/publishing/PublishedEpisode";
import { PublishedPodcast } from "../../models/publishing/PublishedPodcast";
import { UnassignedEpisode } from "../../models/publishing/UnassignedEpisode";
import { UnassignedPodcast } from "../../models/publishing/UnassignedPodcast";
import { getInjectedFetch } from "./ApiUtils";

const API = process.env.REACT_APP_PUBLISHING_API_URL;
const UNASSIGNED = "podcasts/unassigned";
const ASSIGNED = "podcasts/assigned";
const EPISODES = "episodes";
const PODCAST = "podcast";
const EPISODE = "episode";
const CATEGORIES = "categories";
const LANGUAGES = "languages";

export default class PublishingApiRepository {
  /**
   * Gets all unassigned podcasts.
   */
  public async getUnassignedPodcasts(
    accessToken: string
  ): Promise<UnassignedPodcast[] | null> {
    return await getInjectedFetch(API + UNASSIGNED, accessToken)
      .then(response => response.json())
      .then(data => data as UnassignedPodcast[])
      .catch(() => null);
  }

  /**
   * Gets all unassigned episodes.
   */
  public async getUnassignedEpisodes(
    accessToken: string
  ): Promise<UnassignedEpisode[] | null> {
    return await getInjectedFetch(API + EPISODES, accessToken)
      .then(response => response.json())
      .then(data => data as UnassignedEpisode[])
      .catch(() => null);
  }

  /**
   * Gets all assigned podcasts.
   */
  public async getAssignedPodcasts(
    accessToken: string
  ): Promise<PublishedPodcast[] | null> {
    return await getInjectedFetch(API + ASSIGNED, accessToken)
      .then(response => response.json())
      .then(data => data as PublishedPodcast[])
      .catch(() => null);
  }

  /**
   * Updates the specified podcast.
   */
  public async updatePodcast(accessToken: string, podcast: PublishedPodcast) {
    await getInjectedFetch(API + PODCAST, accessToken, "POST", podcast);
  }

  /**
   * Updates the specified episode.
   */
  public async updateEpisode(accessToken: string, episode: PublishedEpisode) {
    await getInjectedFetch(API + EPISODE, accessToken, "POST", episode);
  }

  /**
   * Deletes the specified podcast.
   */
  public async deletePodcast(accessToken: string, podcastUid: string) {
    await getInjectedFetch(
      API + PODCAST + "?podcastUid=" + podcastUid,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Deletes the specified episode.
   */
  public async deleteEpisode(accessToken: string, episodeUid: string) {
    await getInjectedFetch(
      API + EPISODE + "?episodeUid=" + episodeUid,
      accessToken,
      "DELETE"
    );
  }

  /**
   * Gets all assignable languages.
   */
  public async getLanguages(): Promise<Language[]> {
    return await fetch(API + LANGUAGES)
      .then(response => response.json())
      .then(data => data as Language[])
      .catch(() => []);
  }

  /**
   * Gets all assignable categories.
   */
  public async getCategories(): Promise<Category[]> {
    return await fetch(API + CATEGORIES)
      .then(response => response.json())
      .then(data => data as Category[])
      .catch(() => []);
  }
}
