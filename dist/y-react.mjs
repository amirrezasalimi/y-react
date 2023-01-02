import React, { useCallback } from 'react';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';

var useDoc = function () {
    var doc = React.useContext(DocumentContext).doc;
    if (doc !== null) {
        return doc;
    }
    else {
        throw new Error('Could not retrieve a document. Please wrap in a DocumentProvider.');
    }
};
var useProviders = function () {
    var providers = React.useContext(DocumentContext).providers;
    if (providers !== null) {
        return providers;
    }
    else {
        throw new Error('Could not retrieve a set of providers. Please wrap in a DocumentProvider.');
    }
};

var DocumentContext = React.createContext({
    doc: null,
    providers: null
});
var DocumentProvider = function (_a) {
    var children = _a.children, _b = _a.doc, doc = _b === void 0 ? new Y.Doc() : _b, folderName = _a.folderName, documentName = _a.documentName;
    var superDoc = null;
    try {
        superDoc = useDoc();
    }
    catch (_c) { }
    if (superDoc !== null) {
        superDoc.getMap(folderName !== null && folderName !== void 0 ? folderName : '').set(documentName !== null && documentName !== void 0 ? documentName : doc.guid, doc);
    }
    var providers = React.useRef(new Map());
    React.useEffect(function () {
        return function () {
            providers.current.forEach(function (map) {
                map.forEach(function (provider) { return provider.destroy(); });
            });
        };
    }, []);
    return (React.createElement(DocumentContext.Provider, { value: {
            doc: doc,
            providers: providers.current
        } }, children));
};

var useForceUpdate = function () {
    var _a = React.useState(Object.create(null)), dispatch = _a[1];
    return useCallback(function () { return dispatch(Object.create(null)); }, [dispatch]);
};

var useSharedType = function (name, constructor) {
    var doc = useDoc();
    return doc.get(name, constructor);
};
var useMap = function (name) {
    var map = useSharedType(name, Y.Map);
    var forceUpdate = useForceUpdate();
    React.useEffect(function () {
        map.observe(function () { return forceUpdate(); });
    }, []);
    return {
        state: map.toJSON(),
        get: React.useCallback(function (name) { return map.get(name); }, []),
        set: React.useCallback(function (name, value) {
            return map.set(name, value);
        }, [])
    };
};
var useArray = function (name) {
    var array = useSharedType(name, Y.Array);
    var forceUpdate = useForceUpdate();
    React.useEffect(function () {
        array.observe(function () { return forceUpdate(); });
    }, []);
    return {
        state: array.toJSON(),
        get: React.useCallback(function (index) { return array.get(index); }, []),
        insert: React.useCallback(function (index, content) {
            return array.insert(index, content);
        }, []),
        delete: React.useCallback(function (index, length) {
            return array.delete(index, length);
        }, []),
        push: React.useCallback(function (content) {
            return array.push(content);
        }, []),
        unshift: React.useCallback(function (content) {
            return array.unshift(content);
        }, []),
        slice: React.useCallback(function (start, end) {
            return array.slice(start, end);
        }, [])
    };
};
var useText = function (name) {
    return useSharedType(name, Y.Text);
};

var useIndexedDb = function (name) {
    var _a, _b;
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(IndexeddbPersistence)) === null || _a === void 0 ? void 0 : _a.get(name);
    var provider = React.useMemo(function () { return new IndexeddbPersistence(name, doc); }, [doc, name]);
    if (existingProvider !== undefined) {
        return existingProvider;
    }
    else {
        if (!(providers.has(IndexeddbPersistence))) {
            providers.set(IndexeddbPersistence, new Map());
        }
        (_b = providers.get(IndexeddbPersistence)) === null || _b === void 0 ? void 0 : _b.set(name, provider);
        return provider;
    }
};

var useWebRtc = function (room, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(WebrtcProvider)) === null || _a === void 0 ? void 0 : _a.get(room);
    return React.useMemo(function () {
        var _a;
        if (existingProvider !== undefined) {
            return existingProvider;
        }
        else {
            var provider = new WebrtcProvider(room, doc, options);
            if (!(providers.has(WebrtcProvider))) {
                providers.set(WebrtcProvider, new Map());
            }
            (_a = providers.get(WebrtcProvider)) === null || _a === void 0 ? void 0 : _a.set(room, provider);
            return provider;
        }
    }, [existingProvider]);
};

var useWebSocket = function (url, room) {
    var _a, _b;
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(WebsocketProvider)) === null || _a === void 0 ? void 0 : _a.get(room);
    var provider = React.useMemo(function () { return new WebsocketProvider(url, room, doc); }, [doc, room]);
    if (existingProvider !== undefined) {
        return existingProvider;
    }
    else {
        if (!(providers.has(WebsocketProvider))) {
            providers.set(WebsocketProvider, new Map());
        }
        (_b = providers.get(WebsocketProvider)) === null || _b === void 0 ? void 0 : _b.set(room, provider);
        return provider;
    }
};

var useAwareness = function (awareness) {
    var forceUpdate = useForceUpdate();
    React.useEffect(function () {
        var forceUpdateOnAwarenessChange = function () { return forceUpdate(); };
        awareness.on('change', forceUpdateOnAwarenessChange);
        return function () { return awareness.off('change', forceUpdateOnAwarenessChange); };
    }, []);
    var _a = React.useState({}), localState = _a[0], setLocalState = _a[1];
    return ({
        states: React.useMemo(function () { return awareness.getStates(); }, [awareness]),
        localID: awareness.clientID,
        localState: localState,
        setLocalState: React.useCallback(function (nextState) {
            awareness.setLocalState(typeof nextState === 'function'
                ? nextState(awareness.getLocalState())
                : nextState);
            setLocalState(nextState);
        }, [awareness])
    });
};

export { DocumentProvider, useArray, useAwareness, useDoc, useIndexedDb, useMap, useProviders, useText, useWebRtc, useWebSocket };
//# sourceMappingURL=y-react.mjs.map
