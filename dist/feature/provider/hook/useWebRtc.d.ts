import { WebrtcProvider } from 'y-webrtc';
import { Awareness } from 'y-protocols/awareness';
export declare const useWebRtc: (room: string, options?: {
    signaling?: string[];
    password?: string;
    awareness?: Awareness;
    maxConns?: number;
    filterBcConns?: boolean;
    peerOpts?: any;
}) => WebrtcProvider;
//# sourceMappingURL=useWebRtc.d.ts.map