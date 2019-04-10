import { getInjectedFetch } from "./ApiUtils";

const API = process.env.REACT_APP_EDITOR_API_URL;
const PODCAST = "streams";

export default class EditorApiRepository {
  /**
   *
   * @param accessToken
   * @param sessionUid
   */
  public async getSessionStreamsAsync(
    accessToken: string,
    sessionUid: string
  ) {}
}
