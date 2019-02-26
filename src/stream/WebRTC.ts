import * as signalR from "@aspnet/signalr";

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
    'iceServers': [
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

/**
 * SignalR signalling server connection information.
 */
const hub = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(process.env.REACT_APP_INGEST_SIGNALR_URL as string, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    }).build();

/**
 * Class to manage WebRTC connection establishment and handling.
 */
export default class WebRTC {
    private peerConnection: RTCPeerConnection = new RTCPeerConnection(servers);
    private currentGroup: string | null = null;
    private onNewMediaCallback: (stream: MediaStream) => void = () => { };

    constructor(onNewMedia: (stream: MediaStream) => void) {
        this.onNewMediaCallback = onNewMedia;
        this.initCall();
        hub.start().catch((e) => console.log());

        hub.on("onOffer", (offer: string) => {
            this.answer(JSON.parse(offer));
        })

        hub.on("onAnswer", (answer: string) => {
            this.peerConnection.setRemoteDescription(JSON.parse(answer));
        });

        hub.on("onCandidate", (candidate: string) => {
            console.log(candidate);
            this.peerConnection.addIceCandidate(
                new RTCIceCandidate(JSON.parse(candidate)))
        })
    }

    /**
     * Sets the desired group to connect to.
     */
    public setGroup = (name: string, groupId: string) => {
        hub.invoke("joinGroup", name, groupId);
        this.currentGroup = groupId;
    }

    /**
     * Start a call to the other party.
     */
    public call = () => {
        if (this.currentGroup != null) {
            this.getMedia().then(this.buildOffer);
        }
    }

    /**
     * Handles the incoming call request.
     */
    private answer = (offer: RTCSessionDescriptionInit) => {
        this.peerConnection.setRemoteDescription(offer);
        this.getMedia().then(this.buildAnswer);
    }

    /**
     * Prompts the user for local device access.
     */
    private getMedia = (): Promise<MediaStream> => {
        return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }

    /**
     * Initializes the current call.
     */
    private initCall = () => {
        this.peerConnection.onicecandidate = e => this.onIceCandidate(e);
        this.peerConnection.ontrack = t => this.onTrack(t);
    }

    /**
     * Triggered when a new ICE candiate is found.
     */
    private onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate)
            hub.send("newCandidate", JSON.stringify(event.candidate));
    }

    /**
     * Triggered when a new track is available to add.
     */
    private onTrack = (event: RTCTrackEvent) => {
        this.onNewMediaCallback(event.streams[0]);
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildOffer = (stream: MediaStream) => {
        stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));

        this.peerConnection.createOffer(offerOptions)
            .then(this.sendOffer)
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildAnswer = (stream: MediaStream) => {
        stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));

        this.peerConnection.createAnswer(offerOptions)
            .then(this.sendAnswer)
    }

    /**
     * Sends an initial offer to the other users.
     */
    private sendOffer = (description: RTCSessionDescriptionInit) => {
        this.peerConnection.setLocalDescription(description)
            .then(() => {
                hub.invoke("sendOffer", JSON.stringify(description));
            })
    }

    /**
     * Sends an answer to the sender.
     */
    private sendAnswer = (answer: RTCSessionDescriptionInit) => {
        this.peerConnection.setLocalDescription(answer)
            .then(() => {
                hub.invoke("sendAnswer", JSON.stringify(answer));
            })
    }
}