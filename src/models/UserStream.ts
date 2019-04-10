export class UserStream {
  id: string;
  tag: string;
  stream: MediaStream;

  constructor(id: string, tag: string, stream: MediaStream) {
    this.id = id;
    this.tag = tag;
    this.stream = stream;
  }
}
