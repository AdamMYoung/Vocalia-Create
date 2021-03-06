export class PublishedEpisode {
  public uid: string;
  public title: string;
  public description: string;
  public rssUrl: string;
  public publishDate: Date;
  public podcastUID: string;
  public mediaUrl: string;
  public isActive: boolean;

  constructor(
    uid: string,
    title: string,
    description: string,
    rssUrl: string,
    publishDate: Date,
    mediaUrl: string,
    isActive: boolean,
    podcastUID: string
  ) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.rssUrl = rssUrl;
    this.publishDate = publishDate;
    this.mediaUrl = mediaUrl;
    this.isActive = isActive;
    this.podcastUID = podcastUID;
  }
}
