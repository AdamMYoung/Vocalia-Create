export default class ClipMedia {
  uid: string;
  date: Date;
  userUID: string;
  userImageUrl: string;
  userName: string;
  mediaUrl: string;

  constructor(
    uid: string,
    date: Date,
    userUID: string,
    mediaUrl: string,
    userImageUrl: string,
    userName: string
  ) {
    this.uid = uid;
    this.date = date;
    this.userUID = userUID;
    this.mediaUrl = mediaUrl;
    this.userImageUrl = userImageUrl;
    this.userName = userName;
  }
}
