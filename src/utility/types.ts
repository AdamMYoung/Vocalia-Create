export interface Group {
  uid: string;
  name: string;
  description: string;
}

export interface Podcast {
  uid: string;
  name: string;
}

export interface Session {
  uid: string;
  date: Date;
}

export interface Listen {
  userUID: string;
  userName: string;
  rssUrl: string;
  episodeUrl: string;
  episodeName: string;
  date: Date;
  isCompleted: boolean;
}

export interface User {
  userUID: string;
  userTag: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  listens: Listen[];
  following: User[];
  followers: User[];
}

export interface UserDetails {
  id: string;
  tag: string;
}

export interface UserStream {
  id: string;
  tag: string;
  stream: MediaStream;
}
