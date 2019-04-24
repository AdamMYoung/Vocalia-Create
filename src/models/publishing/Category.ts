export class Category {
  public id: number;
  public iTunesID: number;
  public gPodderTag: string;
  public title: string;

  constructor(id: number, iTunesID: number, gPodderTag: string, title: string) {
    this.id = id;
    this.iTunesID = iTunesID;
    this.gPodderTag = gPodderTag;
    this.title = title;
  }
}
