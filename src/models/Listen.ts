export class Listen {
  userUid: string;
  userName: string;
  rssUrl: string;
  episodeUrl: string;
  episodeName: string;
  date: Date;
  isCompleted: boolean;

  constructor(
    userUid: string,
    userName: string,
    rssUrl: string,
    episodeUrl: string,
    episodeName: string,
    date: Date,
    isCompleted: boolean
  ) {
    this.userUid = userUid;
    this.userName = userName;
    this.rssUrl = rssUrl;
    this.episodeUrl = episodeUrl;
    this.episodeName = episodeName;
    this.date = date;
    this.isCompleted = isCompleted;
  }
}
