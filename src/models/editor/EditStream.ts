export class EditStream {
  userUID: string;
  sessionUID: string;
  mediaUrl: string;
  userName: string;

  constructor(
    userUID: string,
    sessionUID: string,
    mediaUrl: string,
    userName: string
  ) {
    this.userUID = userUID;
    this.sessionUID = sessionUID;
    this.mediaUrl = mediaUrl;
    this.userName = userName;
  }
}
