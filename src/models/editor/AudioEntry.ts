export default class AudioEntry {
  uid: string;
  buffer: AudioBuffer | null = null;
  url: string;

  constructor(uid: string, url: string) {
    this.uid = uid;
    this.url = url;
  }
}
