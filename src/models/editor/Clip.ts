import ClipEdit from "./ClipEdit";
import ClipMedia from "./ClipMedia";

export default class Clip {
  uid: string;
  date: Date;
  sessionID: number;
  name: string;
  media: ClipMedia[];
  edit: ClipEdit;

  constructor(
    uid: string,
    date: Date,
    sessionID: number,
    name: string,
    media: ClipMedia[],
    edit: ClipEdit
  ) {
    this.uid = uid;
    this.date = date;
    this.sessionID = sessionID;
    this.name = name;
    this.media = media;
    this.edit = edit;
  }
}
