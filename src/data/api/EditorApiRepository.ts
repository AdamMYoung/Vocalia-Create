import Clip from "../../models/editor/Clip";
import ClipEdit from "../../models/editor/ClipEdit";
import { Podcast } from "../../models/Podcast";
import { getInjectedFetch } from "./ApiUtils";

const API = process.env.REACT_APP_EDITOR_API_URL;
const TIMELINE = "timeline";
const CLIPS = "clips";
const SESSION = "session";
const EDIT = "edit";
const PODCASTS = "podcasts";
const PODCAST = "podcast";
const SUBMIT = "submit";

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
   * Updates the timeline with the provided clips.
   */
  public async setTimeline(
    accessToken: string,
    sessionUid: string,
    clips: Clip[]
  ) {
    await getInjectedFetch(
      API + TIMELINE + "?sessionUid=" + sessionUid,
      accessToken,
      "POST",
      clips
    );
  }

  /**
   * Inserts the edit into the database.
   */
  public async setEdit(accessToken: string, edit: ClipEdit) {
    await getInjectedFetch(API + EDIT, accessToken, "POST", edit);
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

  /**
   * Finishes the edit session.
   * @param accessToken UID of the session.
   * @param sessionUid Access token for API access.
   */
  public async finishEditSession(accessToken: string, sessionUid: string) {
    await getInjectedFetch(
      API + SUBMIT + "?sessionUid=" + sessionUid,
      accessToken,
      "POST"
    );
  }
}
