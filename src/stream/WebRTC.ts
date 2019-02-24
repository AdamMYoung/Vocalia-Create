import * as signalR from "@aspnet/signalr";
import { createConnection } from "net";

const hub = new signalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string)
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default class WebRTC {
  private connection: RTCPeerConnection;

  constructor() {
    this.connection = new RTCPeerConnection(undefined);
    hub.start().then(() => {
      console.log("SignalR Connected")
    }).catch((error) => console.log("Error"));

    //Called when a new track is added to the stream.
    this.connection.ontrack = (track) => {
      var newAudioElement = document.createElement("audio");
      newAudioElement.srcObject = track.streams[0];

      var body = document.querySelector("body");
      if (body != null)
        body.appendChild(newAudioElement);
    }

    //Recieved new candidate
    hub.on("onCandidate", message => {
      this.connection.addIceCandidate(new RTCIceCandidate(message.candidate));
    });

    //Recieved new offer
    hub.on("onOffer", message => {
      this.sendResponse(message);
    });

    //Recieved answer.
    hub.on("onAnswer", message => {
      this.handleAnswer(message);
    })
  }

  /**
   * Established a WebRTC connection to the provided group ID.
   */
  public connect = (groupId: string) => {
    //New ICE Candidate
    this.connection.onicecandidate = event => {
      if (event.candidate) {
        hub.send("newCandidate", JSON.stringify({ candidate: event.candidate }));
      }
    };

    //Sends the initial offer to the group.
    this.sendOffer(groupId);
  };

  private sendOffer = (groupId: string) => {
    //Join the group.
    hub.invoke("joinGroup", JSON.stringify({ groupId: groupId }));

    navigator.getUserMedia({ video: false, audio: true }, stream => {
      stream.getTracks().forEach(track => this.connection.addTrack(track, stream));

      this.connection.createOffer().then(offer => {
        return this.connection.setLocalDescription(offer);
      }).then(() => {
        hub.invoke("sendOffer", JSON.stringify({ sdp: this.connection.localDescription }));
      });
    },
      //On Error
      () => { })
  }

  private sendResponse = (message: any) => {
    navigator.getUserMedia({ video: false, audio: true }, stream => {
      this.connection.setRemoteDescription(message.sdp).then(() => {
        stream.getTracks().forEach(track => this.connection.addTrack(track, stream));

        this.connection.createAnswer().then(desc => {
          return this.connection.setLocalDescription(desc);
        })
          .then(() => {
            hub.invoke("sendAnswer", JSON.stringify({ sdp: this.connection.localDescription }))
          })
      })
    },
      //On Error
      () => { })
  }

  private handleAnswer = (answer: any) => {
    this.connection.setRemoteDescription(answer.sdp);
  }
}
