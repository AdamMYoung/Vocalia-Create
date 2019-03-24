export class AudioRecorder {
  constructor() {}

  /**
   * Prompts the user for local device access.
   */
  private getMedia = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
  };
}
