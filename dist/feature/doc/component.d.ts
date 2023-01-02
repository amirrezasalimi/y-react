import React from 'react';
import * as Y from 'yjs';
import { Provider } from './type';
export declare const DocumentContext: React.Context<{
    doc: Y.Doc | null;
    providers: Map<new (...args: any[]) => Provider, Map<string, Provider>> | null;
}>;
interface DocumentProviderProps {
    children: React.ReactNode;
    doc?: Y.Doc;
    folderName?: string;
    documentName?: string;
}
export declare const DocumentProvider: ({ children, doc, folderName, documentName }: DocumentProviderProps) => JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map