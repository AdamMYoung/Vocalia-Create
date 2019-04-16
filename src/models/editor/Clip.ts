import ClipMedia from "./ClipMedia";

export default class Clip {
  uid: string;
  date: Date;
  sessionID: number;
  name: string;
  entries: ClipMedia[];

  constructor(
    uid: string,
    date: Date,
    sessionID: number,
    name: string,
    entries: ClipMedia[]
  ) {
    this.uid = uid;
    this.date = date;
    this.sessionID = sessionID;
    this.name = name;
    this.entries = entries;
  }
}
