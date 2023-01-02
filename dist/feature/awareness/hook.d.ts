import React from 'react';
import { Awareness } from 'y-protocols/awareness';
export declare const useAwareness: <T extends {} = {
    [x: string]: any;
}>(awareness: Awareness) => {
    states: Map<number, T>;
    localID: number;
    localState: T;
    setLocalState: React.Dispatch<React.SetStateAction<T>>;
};
//# sourceMappingURL=hook.d.ts.map