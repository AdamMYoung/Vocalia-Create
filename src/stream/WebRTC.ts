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
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            urls: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        },
        {
            urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
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
    private connections: { [id: string]: RTCPeerConnection } = {};
    private peerConnection: RTCPeerConnection = new RTCPeerConnection(servers);
    private currentGroup: string | null = null;

    /**
     * Called when a new track is added.
     */
    public onTrackAdded: ((event: MediaStream) => void) = () => { };

    constructor() {
        this.peerConnection.onicecandidate = e => this.onIceCandidate(e);
        this.peerConnection.ontrack = t => this.onTrackAdded(t.streams[0]);

        hub.start();

        //Called when an offer has been recieved.
        hub.on("onOffer", (offer: string, connectionId: string) => {
            this.answer(JSON.parse(offer), connectionId);
        })

        //Called when an answer has been recieved.
        hub.on("onAnswer", (answer: string) => {
            this.peerConnection.setRemoteDescription(JSON.parse(answer));
        });

        //Called when a candidate has been recieved.
        hub.on("onCandidate", (candidate: string) => {
            console.log(candidate);
            this.peerConnection.addIceCandidate(
                new RTCIceCandidate(JSON.parse(candidate)));
        })
    }

    /**
     * Start a call to the other party.
     */
    public call = () => {
        console.log("Sending request...")
        if (this.currentGroup != null) {
            this.getMedia().then(this.buildOffer);
        }
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildOffer = (stream: MediaStream) => {
        var code = this.generateRandomCode();
        stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));

        this.peerConnection.createOffer(offerOptions)
            .then((offer) => this.sendOffer(offer));
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
     * Handles the incoming call request.
     */
    private answer = (offer: RTCSessionDescriptionInit, senderId: string) => {
        console.log("Recieved request...");
        this.peerConnection.setRemoteDescription(offer);
        this.getMedia().then((e) => this.buildAnswer(e, senderId));
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildAnswer = (stream: MediaStream, senderId: string) => {
        stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));

        this.peerConnection.createAnswer(offerOptions)
            .then((answer) => this.sendAnswer(answer, senderId))
    }

    /**
     * Sends an answer to the sender.
     */
    private sendAnswer = (answer: RTCSessionDescriptionInit, senderId: string) => {
        this.peerConnection.setLocalDescription(answer)
            .then(() => {
                hub.invoke("sendAnswer", JSON.stringify(answer), senderId);
            })
    }

    /**
    * Generates a random code for connection identification.
    */
    private generateRandomCode = () => {
        return Math.random().toString(36).substring(7);
    }

    /**
     * Sets the desired group to connect to.
     */
    public setGroup = (name: string, groupId: string) => {
        hub.invoke("joinGroup", name, groupId);
        this.currentGroup = groupId;
    }

    /**
     * Prompts the user for local device access.
     */
    private getMedia = (): Promise<MediaStream> => {
        return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }

    /**
     * Triggered when a new ICE candiate is found.
     */
    private onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate)
            hub.send("newCandidate", JSON.stringify(event.candidate));
    }
}