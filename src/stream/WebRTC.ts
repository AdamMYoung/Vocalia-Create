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

    hub.start();

    //Called when a new track is added to the stream.
    this.connection.ontrack = track => {
      var newAudioElement = document.createElement("audio");
      newAudioElement.srcObject = track.streams[0];

      var body = document.querySelector("body");
      if (body != null) body.appendChild(newAudioElement);
    };

    //Recieved new candidate
    hub.on("onCandidate", candidate => {
      if (JSON.parse(candidate))
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

    this.connection.onicecandidate = event => {
      if (event.candidate) {
        hub.send("newCandidate", JSON.stringify(event.candidate));
      }
    };
  }

  /**
   * Established a WebRTC connection to the provided group ID.
   */
  public connect = (groupId: string) => {
    //Join the group.
    hub.invoke("joinGroup", "tag", groupId);

    //Sends the initial offer to the group.
    this.sendOffer();
  };

  public awaitConnection = (groupId: string) => {
    //New ICE Candidate


    //Join the group.
    hub.invoke("joinGroup", "tag", groupId);
  }

  private sendOffer = () => {
    navigator.getUserMedia(
      { video: false, audio: true },
      stream => {
        stream
          .getTracks()
          .forEach(track => this.connection.addTrack(track, stream));

        this.connection
          .createOffer()
          .then(offer => {
            this.connection.setLocalDescription(offer).then(() => {
              console.log("Sent Offer...")
              hub.invoke(
                "sendOffer",
                JSON.stringify({ sdp: this.connection.localDescription })
              );
            });
          })
      },
      //On Error
      () => { }
    );
  };

  private sendResponse = (message: any) => {
    console.log("Recieved Offer...")
    navigator.getUserMedia(
      { video: false, audio: true },
      stream => {
        this.connection.setRemoteDescription(message.sdp).then(() => {
          stream
            .getTracks()
            .forEach(track => this.connection.addTrack(track, stream));

          this.connection
            .createAnswer()
            .then(desc => {
              this.connection.setLocalDescription(desc).then(() => {
                console.log("Sent Answer...")
                hub.invoke(
                  "sendAnswer",
                  JSON.stringify({ sdp: this.connection.localDescription })
                );
              });;
            })

        });
      },
      //On Error
      () => { }
    );
  };

  private handleAnswer = (answer: any) => {
    console.log("Recieved Answer...")
    this.connection.setRemoteDescription(answer.sdp);
  };
}
