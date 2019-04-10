import { Session } from "./Session";
import { PodcastMember } from "./PodcastMember";

export class Podcast {
  uid: string;
  name: string;
  description: string;
  imageUrl: string;
  members: PodcastMember[];
  sessions: Session[];

  constructor(
    uid: string,
    name: string,
    description: string,
    imageUrl: string,
    members: PodcastMember[],
    sessions: Session[]
  ) {
    this.uid = uid;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.members = members;
    this.sessions = sessions;
  }
}
