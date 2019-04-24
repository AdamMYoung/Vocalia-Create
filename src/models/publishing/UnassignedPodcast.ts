export class UnassignedPodcast {
  public uid: string;
  public name: string;
  public imageUrl: string;

  constructor(uid: string, name: string, imageUrl: string) {
    this.uid = uid;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
