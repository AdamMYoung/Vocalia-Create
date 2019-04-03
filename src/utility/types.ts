export interface Podcast {
  uid: string;
  name: string;
  description: string;
  imageUrl: string;
  members: PodcastMember[];
  sessions: Session[];
}

export interface PodcastUpload {
  uid?: string;
  name: string;
  description: string;
  imageData: string;
  fileType: string;
}

export interface PodcastMember {
  uid: string;
  isAdmin: boolean;
}

export interface Session {
  uid: string;
  date: Date;
}

export interface BlobUpload {
  timestamp: number;
  sessionUid: string;
  data: Blob;
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
