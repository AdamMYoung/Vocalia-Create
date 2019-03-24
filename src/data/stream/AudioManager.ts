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

  public webRtc: WebRTC;
  public recorder: AudioRecorder;

  constructor() {
    this.hub.start();
    this.webRtc = new WebRTC(this.hub);
    this.recorder = new AudioRecorder();
  }
}
