import AudioEntry from "./AudioEntry";

export default class UserTrack {
  entries: AudioEntry[];
  userName: string;
  userUid: string;
  sessionUid: string;

  constructor(
    entries: AudioEntry[],
    userName: string,
    userUid: string,
    sessionUid: string
  ) {
    this.entries = entries;
    this.userName = userName;
    this.userUid = userUid;
    this.sessionUid = sessionUid;
  }
}
