export class SessionClip {
  uid: string;
  userUid: string;
  mediaUrl: string;
  size: number;
  time: Date;
  name: string;

  constructor(
    uid: string,
    userUid: string,
    mediaUrl: string,
    size: number,
    time: Date,
    name: string
  ) {
    this.uid = uid;
    this.userUid = userUid;
    this.mediaUrl = mediaUrl;
    this.size = size;
    this.time = time;
    this.name = name;
  }
}
