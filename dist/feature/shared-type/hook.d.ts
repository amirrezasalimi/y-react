import * as Y from 'yjs';
export declare const useMap: <T extends unknown = any>(name: string) => {
    state: {
        [x: string]: T;
    };
    get: (name: string) => T | undefined;
    set: (name: string, value: T) => void;
};
export declare const useArray: <T extends unknown = any>(name: string) => {
    state: T[];
    get: (index: number) => T | undefined;
    insert: (index: number, content: T[]) => void;
    delete: (index: number, length: number) => void;
    push: (content: T[]) => void;
    unshift: (content: T[]) => void;
    slice: (start: number, end?: number | undefined) => void;
};
export declare const useText: (name: string) => Y.Text;
//# sourceMappingURL=hook.d.ts.map