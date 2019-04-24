export class UnassignedEpisode {
  public uid: string;
  public podcastUid: string;
  public name: string;

  constructor(uid: string, podcastUid: string, name: string) {
    this.uid = uid;
    this.podcastUid = podcastUid;
    this.name = name;
  }
}
