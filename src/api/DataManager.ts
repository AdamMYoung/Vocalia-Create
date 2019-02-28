import IngestApiRepository from "./IngestApiRepository";

export default class DataManager {
  private api: IngestApiRepository = new IngestApiRepository();
  accessToken: string | null = null;
}
