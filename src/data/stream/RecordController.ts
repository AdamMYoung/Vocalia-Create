export class RecordController {
  /**
   * Prompts the user for local device access.
   */
  private getMedia = (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };
}
