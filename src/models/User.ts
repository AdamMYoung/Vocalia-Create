import { Listen } from "./social/Listen";

export class User {
  userUID: string;
  userTag: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  listens: Listen[];
  following: User[];
  followers: User[];

  constructor(
    userUid: string,
    userTag: string,
    firstName: string,
    lastName: string,
    pictureUrl: string,
    listens: Listen[],
    following: User[],
    followers: User[]
  ) {
    this.userUID = userUid;
    this.userTag = userTag;
    this.firstName = firstName;
    this.lastName = lastName;
    this.pictureUrl = pictureUrl;
    this.listens = listens;
    this.following = following;
    this.followers = followers;
  }
}
