import * as signalR from "@aspnet/signalr";
import WebRTC from "./WebRTC";
import { AudioRecorder } from "./AudioRecorder";

export class AudioManager {
  /**
   * SignalR signalling server connection information.
   */
  private hub = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

  public webRtc: WebRTC | null = null;
  public recorder: AudioRecorder | null = null;

  constructor() {
    this.hub.start();
    this.getMedia().then(this.createAudioElements);
  }

  /**
   * Creates all audio elements from the provided stream.
   */
  private createAudioElements = (stream: MediaStream | null) => {
    if (stream) {
      this.webRtc = new WebRTC();
      this.recorder = new AudioRecorder(stream);
    }
  };

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
