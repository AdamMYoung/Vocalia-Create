import { PublishedEpisode } from "./PublishedEpisode";

export class PublishedPodcast {
  public uid: string;
  public categoryID: number;
  public languageID: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public isExplicit: boolean;
  public isActive: boolean;
  public episodes: PublishedEpisode[];

  constructor(
    uid: string,
    categoryId: number,
    languageId: number,
    title: string,
    description: string,
    imageUrl: string,
    isExplicit: boolean,
    isActive: boolean,
    episodes: PublishedEpisode[]
  ) {
    this.uid = uid;
    this.categoryID = categoryId;
    this.languageID = languageId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.isExplicit = isExplicit;
    this.isActive = isActive;
    this.episodes = episodes;
  }
}
