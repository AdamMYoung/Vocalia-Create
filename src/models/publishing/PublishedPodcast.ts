export class PublishedPodcast {
  public uid: string;
  public categoryId: string;
  public languageId: string;
  public title: string;
  public description: string;
  public imageUrl: string;
  public isExplicit: boolean;
  public isActive: boolean;

  constructor(
    uid: string,
    categoryId: string,
    languageId: string,
    title: string,
    description: string,
    imageUrl: string,
    isExplicit: boolean,
    isActive: boolean
  ) {
    this.uid = uid;
    this.categoryId = categoryId;
    this.languageId = languageId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.isExplicit = isExplicit;
    this.isActive = isActive;
  }
}
