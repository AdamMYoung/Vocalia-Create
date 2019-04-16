export default class ClipMedia {
  uid: string;
  date: Date;
  userUid: string;
  mediaUrl: string;

  constructor(uid: string, date: Date, userUid: string, mediaUrl: string) {
    this.uid = uid;
    this.date = date;
    this.userUid = userUid;
    this.mediaUrl = mediaUrl;
  }
}
