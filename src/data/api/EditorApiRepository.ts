import { getInjectedFetch } from "./ApiUtils";
import { EditStream } from "../../models/editor/EditStream";

const API = process.env.REACT_APP_EDITOR_API_URL;
const PODCAST = "streams";

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
      API + PODCAST + "?sessionUid=" + sessionUid,
      accessToken
    )
      .then(response => response.json())
      .then(data => data as EditStream[])
      .catch(() => null);
  }
}
