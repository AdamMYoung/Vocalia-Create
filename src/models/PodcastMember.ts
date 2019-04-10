export class PodcastMember {
  uid: string;
  isAdmin: boolean;

  constructor(uid: string, isAdmin: boolean) {
    this.uid = uid;
    this.isAdmin = isAdmin;
  }
}
