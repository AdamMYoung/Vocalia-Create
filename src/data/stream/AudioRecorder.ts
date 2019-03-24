export class AudioRecorder {
  stream: MediaStream;

  constructor(stream: MediaStream) {
    this.stream = stream;
  }
}
