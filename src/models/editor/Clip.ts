import ClipMedia from "./ClipMedia";

export default class Clip {
  uid: string;
  date: Date;
  sessionID: number;
  name: string;
  media: ClipMedia[];

  constructor(
    uid: string,
    date: Date,
    sessionID: number,
    name: string,
    media: ClipMedia[]
  ) {
    this.uid = uid;
    this.date = date;
    this.sessionID = sessionID;
    this.name = name;
    this.media = media;
  }
}
