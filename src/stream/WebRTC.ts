import * as signalR from "@aspnet/signalr";

const hub = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Information)
  .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();

export default class WebRTC {
  private connection: RTCPeerConnection;

  constructor() {
    this.connection = new RTCPeerConnection(undefined);

    hub.start().then(() => {
      console.log("SignalR connected...");
    });

    //Called when a new track is added to the stream.
    this.connection.ontrack = track => {
      var newAudioElement = document.createElement("audio");
      newAudioElement.srcObject = track.streams[0];

      var body = document.querySelector("body");
      if (body != null) body.appendChild(newAudioElement);
    };

    //Recieved new candidate
    hub.on("onCandidate", candidate => {
      this.connection.addIceCandidate(
        new RTCIceCandidate(JSON.parse(candidate))
      );
    });

    //Recieved new offer
    hub.on("onOffer", message => {
      this.sendResponse(JSON.parse(message));
    });

    //Recieved answer.
    hub.on("onAnswer", message => {
      this.handleAnswer(JSON.parse(message));
    });
  }

  /**
   * Established a WebRTC connection to the provided group ID.
   */
  public connect = (groupId: string) => {
    //New ICE Candidate
    this.connection.onicecandidate = event => {
      if (event.candidate) {
        hub.send("newCandidate", JSON.stringify(event.candidate));
      }
    };

    //Sends the initial offer to the group.
    this.sendOffer(groupId);
  };

  private sendOffer = (groupId: string) => {
    //Join the group.
    hub.invoke("joinGroup", "tag", groupId);

    navigator.getUserMedia(
      { video: false, audio: true },
      stream => {
        stream
          .getTracks()
          .forEach(track => this.connection.addTrack(track, stream));

        this.connection
          .createOffer()
          .then(offer => {
            return this.connection.setLocalDescription(offer);
          })
          .then(() => {
            hub.invoke(
              "sendOffer",
              JSON.stringify({ sdp: this.connection.localDescription })
            );
          });
      },
      //On Error
      () => {}
    );
  };

  private sendResponse = (message: any) => {
    console.log(message);

    navigator.getUserMedia(
      { video: false, audio: true },
      stream => {
        this.connection.setRemoteDescription(message.sdp).then(() => {
          console.log(message.sdp);
          stream
            .getTracks()
            .forEach(track => this.connection.addTrack(track, stream));

          this.connection
            .createAnswer()
            .then(desc => {
              console.log(desc);
              return this.connection.setLocalDescription(desc);
            })
            .then(() => {
              hub.invoke(
                "sendAnswer",
                JSON.stringify({ sdp: this.connection.localDescription })
              );
            });
        });
      },
      //On Error
      () => {}
    );
  };

  private handleAnswer = (answer: any) => {
    this.connection.setRemoteDescription(answer.sdp);
  };
}
