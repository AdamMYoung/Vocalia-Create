import * as signalR from "@aspnet/signalr";

export default class GroupManager {
  private hub: signalR.HubConnection;
  /**
   * Called when the duration time has changed.
   */
  public onTimeChanged: (time: number) => void = () => {};

  /**
   * Called when the pause status has changed.
   */
  public onPauseChanged: (isPaused: boolean) => void = () => {};

  /**
   * Called when the recording status has changed.
   */
  public onRecordingChanged: (isRecording: boolean) => void = () => {};

  /**
   * Called when the clip should be submitted.
   */
  public onSubmitClip: (clipId: string, clipName: string) => void = () => {};

  /**
   * Called when the session has ended.
   */
  public onSessionEnd: () => void = () => {};

  constructor(hub: signalR.HubConnection) {
    this.hub = hub;
    this.hub.on("onSessionEnd", () => this.onSessionEnd());
    this.hub.on("onTimeChanged", duration => this.onTimeChanged(duration));
    this.hub.on("onPauseChanged", isPaused => this.onPauseChanged(isPaused));
    this.hub.on("onSubmitClip", (clipId, clipName) =>
      this.onSubmitClip(clipId, clipName)
    );
    this.hub.on("onRecordingChanged", isRecording =>
      this.onRecordingChanged(isRecording)
    );
  }

  /**
   * Updates the paused status.
   */
  public setPaused = (isPaused: boolean) => {
    this.hub.invoke("setPaused", isPaused);
  };

  /**
   * Updates the recording status.
   */
  public setRecording = (isRecording: boolean) => {
    this.hub.invoke("setRecording", isRecording);
  };

  /**
   * Invokes the end of the session.
   */
  public setSessionEnd = () => {
    this.hub.invoke("setSessionEnd");
  };

  /**
   * Invokes clip submission.
   */
  public submitClip = (clipId: string, clipName: string) => {
    this.hub.invoke("submitClip", clipId, clipName);
  };
}
