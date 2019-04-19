export default class ClipEdit {
  clipUID: string;
  startTrim: number;
  endTrim: number;

  constructor(clipUID: string, startTrim: number, endTrim: number) {
    this.clipUID = clipUID;
    this.startTrim = startTrim;
    this.endTrim = endTrim;
  }
}
