import { tr } from "date-fns/esm/locale";

export class AudioRecorder {
  private micStream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private parts: BlobPart[] = [];

  public onRecievedAudioData: (event: Blob) => void = () => {};

  constructor() {
    this.getRecorder().then(recorder => (this.recorder = recorder));
  }

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
    if (this.recorder && this.recorder.state != "recording") {
      this.recorder.start(1000);
    }
  };

  /**
   * Stops recording the incoming mic audio.
   */
  public stop = () => {
    if (this.recorder && this.recorder.state != "inactive")
      this.recorder.stop();
  };

  /**
   * Creates a media recorder from the provided source.
   */
  private getRecorder(): Promise<MediaRecorder> {
    return this.getMedia().then(m => {
      this.micStream = m;
      var recorder = new MediaRecorder(m);
      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          this.onRecievedAudioData(e.data);
        }
      };
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
