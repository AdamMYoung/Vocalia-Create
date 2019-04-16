import { getInjectedFetch } from "./ApiUtils";
import { Podcast } from "../../models/Podcast";
import Clip from "../../models/editor/Clip";
import ClipMedia from "../../models/editor/ClipMedia";

const API = process.env.REACT_APP_EDITOR_API_URL;
const TIMELINE = "timeline";
const CLIPS = "clips";
const SESSION = "session";
const PODCASTS = "podcasts";
const PODCAST = "podcast";

export default class EditorApiRepository {
  /**
   * Returns all edit streams of the current session.
   * @param accessToken Access token for API access.
   * @param sessionUid UID of the session.
   */
  public async getTimeline(
    accessToken: string,
    sessionUid: string
  ): Promise<Clip[] | null> {
    return await getInjectedFetch(
      API + TIMELINE + "?sessionUid=" + sessionUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Clip[])
      .catch(() => null);
  }

  /**
   * Returns all edit streams of the current session.
   * @param accessToken Access token for API access.
   * @param sessionUid UID of the session.
   */
  public async getClips(
    accessToken: string,
    sessionUid: string
  ): Promise<Clip[] | null> {
    return await getInjectedFetch(
      API + CLIPS + "?sessionUid=" + sessionUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Clip[])
      .catch(() => null);
  }

  /**
   * Gets all podcasts with pending edits.
   * @param accessToken Access token for API access.
   */
  public async getPodcasts(accessToken: string): Promise<Podcast[] | null> {
    return await getInjectedFetch(API + PODCASTS, accessToken)
      .then(response => response.json())
      .then(data => data as Podcast[])
      .catch(() => null);
  }

  /**
   * Gets info about the specified podcast.
   * @param accessToken Access token for API access.
   * @param podcastUID UID of the podcast.
   */
  public async getPodcast(
    accessToken: string,
    podcastUID: string
  ): Promise<Podcast | null> {
    return await getInjectedFetch(
      API + PODCAST + "?podcastUid=" + podcastUID,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as Podcast)
      .catch(() => null);
  }

  /**
   * Deletes the edit session from the database if authorized.
   * @param sessionUid UID of the session.
   * @param accesToken Access token for API access.
   */
  public async deleteEditSession(accessToken: string, sessionUid: string) {
    await getInjectedFetch(
      API + SESSION + "?sessionUid=" + sessionUid,
      accessToken,
      "DELETE"
    );
  }
}
