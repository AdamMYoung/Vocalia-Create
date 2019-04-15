export class SessionClip {
  uid: string;
  userUid: string;
  mediaUrl: string;
  size: number;
  time: Date;

  constructor(
    uid: string,
    userUid: string,
    mediaUrl: string,
    size: number,
    time: Date
  ) {
    this.uid = uid;
    this.userUid = userUid;
    this.mediaUrl = mediaUrl;
    this.size = size;
    this.time = time;
  }
}
