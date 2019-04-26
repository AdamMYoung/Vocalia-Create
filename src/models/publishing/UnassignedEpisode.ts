export class UnassignedEpisode {
  public uid: string;
  public podcastUID: string;
  public name: string;
  public date: Date;
  public imageUrl: string;

  constructor(
    uid: string,
    podcastUID: string,
    name: string,
    date: Date,
    imageUrl: string
  ) {
    this.uid = uid;
    this.podcastUID = podcastUID;
    this.name = name;
    this.date = date;
    this.imageUrl = imageUrl;
  }
}
