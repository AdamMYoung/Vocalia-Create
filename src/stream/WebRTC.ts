import * as signalR from "@aspnet/signalr";
import { UserDetails, UserStream } from "../utility/types";

/**
 * Options to offer to the other client.
 */
const offerOptions: RTCOfferOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: false,
  voiceActivityDetection: false
};

/**
 * ICE servers to connect to.
 */
var servers = {
  iceServers: [
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com"
    },
    {
      urls: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808"
    },
    {
      urls: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808"
    },
    {
      urls: "turn:turn.bistri.com:80",
      credential: "homeo",
      username: "homeo"
    },
    {
      urls: "turn:turn.anyfirewall.com:443?transport=tcp",
      credential: "webrtc",
      username: "webrtc"
    },
    { urls: "stun:stun01.sipphone.com" },
    { urls: "stun:stun.ekiga.net" },
    { urls: "stun:stun.fwdnet.net" },
    { urls: "stun:stun.ideasip.com" },
    { urls: "stun:stun.iptel.org" },
    { urls: "stun:stun.rixtelecom.se" },
    { urls: "stun:stun.schlund.de" },
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stunserver.org" },
    { urls: "stun:stun.softjoys.com" },
    { urls: "stun:stun.voiparound.com" },
    { urls: "stun:stun.voipbuster.com" },
    { urls: "stun:stun.voipstunt.com" },
    { urls: "stun:stun.voxgratia.org" },
    { urls: "stun:stun.xten.com" }
  ]
};

interface UserConnection {
  info: UserDetails;
  connection: RTCPeerConnection;
}

/**
 * SignalR signalling server connection information.
 */
const hub = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Information)
  .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();

/**
 * Class to manage WebRTC connection establishment and handling.
 */
export default class WebRTC {
  private connections: { [id: string]: UserConnection } = {};

  /**
   * Fired when a new audio source track has been established.
   */
  public onTrackAdded: (stream: UserStream) => void = () => {};

  /**
   * Fired when an audio source track has ended.
   */
  public onTrackRemoved: (peerId: string) => void = () => {};

  constructor() {
    hub.start();

    //Called when group members has been recieved.
    hub.on("onMembersAcquired", (users: UserDetails[]) => {
      users.forEach(key => this.establishConnection(key));
    });

    //Called when an offer has been recieved.
    hub.on("onOffer", (offer: string, senderDetails: UserDetails) => {
      this.answer(JSON.parse(offer), senderDetails);
    });

    //Called when an answer has been recieved.
    hub.on("onAnswer", (answer: string, senderDetails: UserDetails) => {
      var user = this.connections[senderDetails.id];

      user.connection.setRemoteDescription(JSON.parse(answer));
    });

    //Called when a candidate has been recieved.
    hub.on("onCandidate", (candidate: string, senderId: string) => {
      this.connections[senderId].connection.addIceCandidate(
        new RTCIceCandidate(JSON.parse(candidate))
      );
    });
  }

  /**
   * Connects to the specified groupId.
   */
  public connect = (name: string, groupId: string) => {
    hub.invoke("joinGroup", name, groupId);
    hub.invoke("queryGroupMembers");
  };

  /**
   * Disconnects from all connected peers.
   */
  public disconnectFromPeers = () => {
    Object.values(this.connections).forEach(c => c.connection.close());
    hub.stop();
  };

  /**
   * Starts building a connection to the specified target ID.
   */
  private establishConnection = (user: UserDetails) => {
    this.getMedia().then(e => this.buildOffer(e, user));
  };

  /**
   * Called when a new stream has been acquired.
   */
  private buildOffer = (stream: MediaStream, user: UserDetails) => {
    var connection = this.createConnection(user);
    this.connections[user.id] = { connection: connection, info: user };

    stream.getTracks().forEach(track => connection.addTrack(track, stream));

    connection
      .createOffer(offerOptions)
      .then(offer => this.sendOffer(offer, user, connection));
  };

  /**
   * Sends an initial offer to the other users.
   */
  private sendOffer = (
    description: RTCSessionDescriptionInit,
    user: UserDetails,
    connection: RTCPeerConnection
  ) => {
    connection.setLocalDescription(description).then(() => {
      hub.invoke("sendOffer", JSON.stringify(description), user.id);
    });
  };

  /**
   * Handles the incoming call request.
   */
  private answer = (offer: RTCSessionDescriptionInit, sender: UserDetails) => {
    var connection = this.createConnection(sender);
    this.connections[sender.id] = { connection: connection, info: sender };

    connection.setRemoteDescription(offer);
    this.getMedia().then(e => this.buildAnswer(e, connection, sender));
  };

  /**
   * Called when a new stream has been acquired.
   */
  private buildAnswer = (
    stream: MediaStream,
    connection: RTCPeerConnection,
    sender: UserDetails
  ) => {
    stream.getTracks().forEach(track => connection.addTrack(track, stream));

    connection
      .createAnswer(offerOptions)
      .then(answer => this.sendAnswer(answer, connection, sender));
  };

  /**
   * Sends an answer to the sender.
   */
  private sendAnswer = (
    answer: RTCSessionDescriptionInit,
    connection: RTCPeerConnection,
    sender: UserDetails
  ) => {
    connection.setLocalDescription(answer).then(() => {
      hub.invoke("sendAnswer", JSON.stringify(answer), sender.id);
    });
  };

  /**
   * Prompts the user for local device access.
   */
  private getMedia = (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  };

  /**
   * Creates a new RTCPeerConnection object.
   */
  private createConnection = (user: UserDetails): RTCPeerConnection => {
    var connection = new RTCPeerConnection(servers);

    connection.onicecandidate = e => this.onIceCandidate(e, user.id);
    connection.oniceconnectionstatechange = e => {
      if (connection.iceConnectionState == "disconnected") {
        this.onTrackRemoved(user.id);
      }
    };

    connection.ontrack = t => {
      var track = t.streams[0];
      track
        .getTracks()
        .forEach(t => t.applyConstraints({ echoCancellation: true }));

      this.onTrackAdded({ id: user.id, tag: user.tag, stream: track });
    };

    return connection;
  };

  /**
   * Triggered when a new ICE candiate is found.
   */
  private onIceCandidate = (
    event: RTCPeerConnectionIceEvent,
    peerId: string
  ) => {
    if (event.candidate)
      hub.send("newCandidate", JSON.stringify(event.candidate), peerId);
  };
}
