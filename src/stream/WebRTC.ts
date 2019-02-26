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
    private currentGroup: string | null = null;

    public onTrackAdded: ((event: MediaStream) => void) = () => { };

    constructor() {
        hub.start();

        hub.on("onMembersAcquired", (memberIds: string[]) => {
            memberIds.forEach((key) => this.establishConnection(key))
        })

        //Called when an offer has been recieved.
        hub.on("onOffer", (offer: string, senderId: string) => {
            this.answer(JSON.parse(offer), senderId);
        })

        //Called when an answer has been recieved.
        hub.on("onAnswer", (answer: string, senderId: string) => {
            var connection = this.connections[senderId];
            connection.setRemoteDescription(JSON.parse(answer));
        });

        //Called when a candidate has been recieved.
        hub.on("onCandidate", (candidate: string, connectionKey: string) => {
            this.connections[connectionKey]
                .addIceCandidate(
                    new RTCIceCandidate(JSON.parse(candidate)));
        })
    }

    /**
     * Connects to the specified groupId.
     */
    public connect = (name: string, groupId: string) => {
        hub.invoke("joinGroup", name, groupId);
        this.currentGroup = groupId;
        hub.invoke("queryGroupMembers");
    }

    /**
     * Starts building a connection to the specified target ID.
     */
    private establishConnection = (targetId: string) => {
        this.getMedia().then((e) => this.buildOffer(e, targetId));
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildOffer = (stream: MediaStream, targetId: string) => {
        var connection = this.createConnection(targetId);
        this.connections[targetId] = connection;

        stream.getTracks().forEach(track => connection.addTrack(track, stream));

        connection.createOffer(offerOptions)
            .then((offer) => this.sendOffer(offer, targetId, connection));
    }

    /**
     * Sends an initial offer to the other users.
     */
    private sendOffer = (description: RTCSessionDescriptionInit, targetId: string, connection: RTCPeerConnection) => {
        connection.setLocalDescription(description)
            .then(() => {
                hub.invoke("sendOffer", JSON.stringify(description), targetId);
            })
    }

    /**
     * Handles the incoming call request.
     */
    private answer = (offer: RTCSessionDescriptionInit, senderId: string) => {
        var connection = this.createConnection(senderId);
        this.connections[senderId] = connection;

        connection.setRemoteDescription(offer);
        this.getMedia().then((e) => this.buildAnswer(e, connection, senderId));
    }

    /**
     * Called when a new stream has been acquired.
     */
    private buildAnswer = (stream: MediaStream, connection: RTCPeerConnection,
        senderId: string) => {
        stream.getTracks().forEach(track => connection.addTrack(track, stream));

        connection.createAnswer(offerOptions)
            .then((answer) => this.sendAnswer(answer, connection, senderId));
    }

    /**
     * Sends an answer to the sender.
     */
    private sendAnswer = (answer: RTCSessionDescriptionInit, connection: RTCPeerConnection,
        senderId: string) => {
        connection.setLocalDescription(answer)
            .then(() => {
                hub.invoke("sendAnswer", JSON.stringify(answer), senderId);
            })
    }

    /**
     * Prompts the user for local device access.
     */
    private getMedia = (): Promise<MediaStream> => {
        return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }

    /**
     * Creates a new RTCPeerConnection object.
     */
    private createConnection = (connectionKey: string): RTCPeerConnection => {
        var connection = new RTCPeerConnection(servers);

        connection.onicecandidate = e => this.onIceCandidate(e, connectionKey);
        connection.ontrack = t => this.onTrackAdded(t.streams[0]);

        return connection;
    }

    /**
     * Triggered when a new ICE candiate is found.
     */
    private onIceCandidate = (event: RTCPeerConnectionIceEvent, connectionKey: string) => {
        if (event.candidate)
            hub.send("newCandidate", JSON.stringify(event.candidate), connectionKey);
    }
}