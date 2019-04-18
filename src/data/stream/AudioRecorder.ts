import Recorder, { RecorderResult } from "recorder-js";

export class AudioRecorder {
  private recorder = new Recorder(new AudioContext());
  private isRecording = false;
  private blob: Blob | null = null;

  public onRecievedAudioData: (event: Blob) => void = () => {};

  constructor() {
    this.getMedia().then(m => {
      this.recorder.init(m);
    });
  }

  /**
   * Starts recording the mic audio.
   */
  public start = () => {
    if (this.recorder) {
      this.recorder.start();
      this.isRecording = true;
    }
  };

  /**
   * Stops recording the incoming mic audio.
   */
  public stop = () => {
    if (this.recorder && this.isRecording)
      this.recorder.stop().then(({ blob, buffer }) => {
        this.blob = blob;
        this.isRecording = false;
      });
  };

  /**
   * Gets the recent blob from the recorder, or null if not available.
   */
  public getBlob = (): Blob | null => {
    var blob = this.blob;
    this.blob = null;

    return blob;
  };

  /**
   * Prompts the user for local device access.
   */
  private getMedia = (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };
}
