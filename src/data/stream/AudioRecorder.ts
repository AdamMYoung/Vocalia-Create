export class AudioRecorder {
  private micStream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;

  public onRecievedAudioData: (event: BlobEvent) => void = () => {};

  /**
   * Pauses the recording session.
   */
  public pause = () => {
    if (this.recorder && this.recorder.state != "inactive")
      this.recorder.pause();
  };

  /**
   * Resumes the recording session.
   */
  public resume = () => {
    if (this.recorder && this.recorder.state != "inactive")
      this.recorder.resume();
  };

  /**
   * Starts recording the mic audio.
   */
  public start = () => {
    console.log("Starting recording");
    this.getRecorder().then(recorder => {
      this.recorder = recorder;
      recorder.start(1000);
    });
  };

  /**
   * Stops recording the incoming mic audio.
   */
  public stop = () => {
    if (this.micStream) this.micStream.getTracks().forEach(t => t.stop());
    if (this.recorder) this.recorder.stop();
    this.recorder = null;
  };

  /**
   * Creates a media recorder from the provided source.
   */
  private getRecorder(): Promise<MediaRecorder> {
    return this.getMedia().then(m => {
      this.micStream = m;
      var recorder = new MediaRecorder(m);
      recorder.ondataavailable = e => this.onRecievedAudioData(e);

      return recorder;
    });
  }

  /**
   * Prompts the user for local device access.
   */
  private getMedia = (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };
}
