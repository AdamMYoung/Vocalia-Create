export default class ClipEdit {
  clipUID: string;
  startTrim: number;
  endTrim: number;
  gain: number;

  constructor(
    clipUID: string,
    startTrim: number,
    endTrim: number,
    gain: number
  ) {
    this.clipUID = clipUID;
    this.startTrim = startTrim;
    this.endTrim = endTrim;
    this.gain = gain;
  }
}
