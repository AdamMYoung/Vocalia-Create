export class BlobUpload {
  timestamp: number;
  sessionUid: string;
  data: Blob;

  constructor(timestamp: number, sessionUid: string, data: Blob) {
    this.timestamp = timestamp;
    this.sessionUid = sessionUid;
    this.data = data;
  }
}
