export default class AudioEntry {
  uid: string;
  buffer: AudioBuffer | null = null;
  url: string;

  constructor(uid: string, url: string) {
    this.uid = uid;
    this.url = url;

    this.loadAudioBuffer(url);
  }

  private async loadAudioBuffer(url: string) {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();

    new AudioContext().decodeAudioData(audioData, audioBuffer => {
      this.buffer = audioBuffer;
    });
  }
}
