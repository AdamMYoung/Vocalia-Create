import { getInjectedFetch } from "./ApiUtils";
import { EditStream } from "../../models/editor/EditStream";
import { Podcast } from "../../models/Podcast";

const API = process.env.REACT_APP_EDITOR_API_URL;
const STREAMS = "streams";
const PODCASTS = "podcasts";
const PODCAST = "podcast";

export default class EditorApiRepository {
  /**
   * Returns all edit streams of the current session.
   * @param accessToken Access token for API access.
   * @param sessionUid UID of the session.
   */
  public async getSessionStreamsAsync(
    accessToken: string,
    sessionUid: string
  ): Promise<EditStream[] | null> {
    return await getInjectedFetch(
      API + STREAMS + "?sessionUid=" + sessionUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as EditStream[])
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
}
