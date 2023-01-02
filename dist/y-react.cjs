'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Y = require('yjs');
var yIndexeddb = require('y-indexeddb');
var yWebrtc = require('y-webrtc');
var yWebsocket = require('y-websocket');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Y__namespace = /*#__PURE__*/_interopNamespace(Y);

var useDoc = function () {
    var doc = React__default['default'].useContext(DocumentContext).doc;
    if (doc !== null) {
        return doc;
    }
    else {
        throw new Error('Could not retrieve a document. Please wrap in a DocumentProvider.');
    }
};
var useProviders = function () {
    var providers = React__default['default'].useContext(DocumentContext).providers;
    if (providers !== null) {
        return providers;
    }
    else {
        throw new Error('Could not retrieve a set of providers. Please wrap in a DocumentProvider.');
    }
};

var DocumentContext = React__default['default'].createContext({
    doc: null,
    providers: null
});
var DocumentProvider = function (_a) {
    var children = _a.children, _b = _a.doc, doc = _b === void 0 ? new Y__namespace.Doc() : _b, folderName = _a.folderName, documentName = _a.documentName;
    var superDoc = null;
    try {
        superDoc = useDoc();
    }
    catch (_c) { }
    if (superDoc !== null) {
        superDoc.getMap(folderName !== null && folderName !== void 0 ? folderName : '').set(documentName !== null && documentName !== void 0 ? documentName : doc.guid, doc);
    }
    var providers = React__default['default'].useRef(new Map());
    React__default['default'].useEffect(function () {
        return function () {
            providers.current.forEach(function (map) {
                map.forEach(function (provider) { return provider.destroy(); });
            });
        };
    }, []);
    return (React__default['default'].createElement(DocumentContext.Provider, { value: {
            doc: doc,
            providers: providers.current
        } }, children));
};

var useForceUpdate = function () {
    var _a = React__default['default'].useState(Object.create(null)), dispatch = _a[1];
    return React.useCallback(function () { return dispatch(Object.create(null)); }, [dispatch]);
};

var useSharedType = function (name, constructor) {
    var doc = useDoc();
    return doc.get(name, constructor);
};
var useMap = function (name) {
    var map = useSharedType(name, Y__namespace.Map);
    var forceUpdate = useForceUpdate();
    React__default['default'].useEffect(function () {
        map.observe(function () { return forceUpdate(); });
    }, []);
    return {
        state: map.toJSON(),
        get: React__default['default'].useCallback(function (name) { return map.get(name); }, []),
        set: React__default['default'].useCallback(function (name, value) {
            return map.set(name, value);
        }, [])
    };
};
var useArray = function (name) {
    var array = useSharedType(name, Y__namespace.Array);
    var forceUpdate = useForceUpdate();
    React__default['default'].useEffect(function () {
        array.observe(function () { return forceUpdate(); });
    }, []);
    return {
        state: array.toJSON(),
        get: React__default['default'].useCallback(function (index) { return array.get(index); }, []),
        insert: React__default['default'].useCallback(function (index, content) {
            return array.insert(index, content);
        }, []),
        delete: React__default['default'].useCallback(function (index, length) {
            return array.delete(index, length);
        }, []),
        push: React__default['default'].useCallback(function (content) {
            return array.push(content);
        }, []),
        unshift: React__default['default'].useCallback(function (content) {
            return array.unshift(content);
        }, []),
        slice: React__default['default'].useCallback(function (start, end) {
            return array.slice(start, end);
        }, [])
    };
};
var useText = function (name) {
    return useSharedType(name, Y__namespace.Text);
};

var useIndexedDb = function (name) {
    var _a, _b;
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(yIndexeddb.IndexeddbPersistence)) === null || _a === void 0 ? void 0 : _a.get(name);
    var provider = React__default['default'].useMemo(function () { return new yIndexeddb.IndexeddbPersistence(name, doc); }, [doc, name]);
    if (existingProvider !== undefined) {
        return existingProvider;
    }
    else {
        if (!(providers.has(yIndexeddb.IndexeddbPersistence))) {
            providers.set(yIndexeddb.IndexeddbPersistence, new Map());
        }
        (_b = providers.get(yIndexeddb.IndexeddbPersistence)) === null || _b === void 0 ? void 0 : _b.set(name, provider);
        return provider;
    }
};

var useWebRtc = function (room, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(yWebrtc.WebrtcProvider)) === null || _a === void 0 ? void 0 : _a.get(room);
    return React__default['default'].useMemo(function () {
        var _a;
        if (existingProvider !== undefined) {
            return existingProvider;
        }
        else {
            var provider = new yWebrtc.WebrtcProvider(room, doc, options);
            if (!(providers.has(yWebrtc.WebrtcProvider))) {
                providers.set(yWebrtc.WebrtcProvider, new Map());
            }
            (_a = providers.get(yWebrtc.WebrtcProvider)) === null || _a === void 0 ? void 0 : _a.set(room, provider);
            return provider;
        }
    }, [existingProvider]);
};

var useWebSocket = function (url, room) {
    var _a, _b;
    var doc = useDoc();
    var providers = useProviders();
    var existingProvider = (_a = providers.get(yWebsocket.WebsocketProvider)) === null || _a === void 0 ? void 0 : _a.get(room);
    var provider = React__default['default'].useMemo(function () { return new yWebsocket.WebsocketProvider(url, room, doc); }, [doc, room]);
    if (existingProvider !== undefined) {
        return existingProvider;
    }
    else {
        if (!(providers.has(yWebsocket.WebsocketProvider))) {
            providers.set(yWebsocket.WebsocketProvider, new Map());
        }
        (_b = providers.get(yWebsocket.WebsocketProvider)) === null || _b === void 0 ? void 0 : _b.set(room, provider);
        return provider;
    }
};

var useAwareness = function (awareness) {
    var forceUpdate = useForceUpdate();
    React__default['default'].useEffect(function () {
        var forceUpdateOnAwarenessChange = function () { return forceUpdate(); };
        awareness.on('change', forceUpdateOnAwarenessChange);
        return function () { return awareness.off('change', forceUpdateOnAwarenessChange); };
    }, []);
    var _a = React__default['default'].useState({}), localState = _a[0], setLocalState = _a[1];
    return ({
        states: React__default['default'].useMemo(function () { return awareness.getStates(); }, [awareness]),
        localID: awareness.clientID,
        localState: localState,
        setLocalState: React__default['default'].useCallback(function (nextState) {
            awareness.setLocalState(typeof nextState === 'function'
                ? nextState(awareness.getLocalState())
                : nextState);
            setLocalState(nextState);
        }, [awareness])
    });
};

exports.DocumentProvider = DocumentProvider;
exports.useArray = useArray;
exports.useAwareness = useAwareness;
exports.useDoc = useDoc;
exports.useIndexedDb = useIndexedDb;
exports.useMap = useMap;
exports.useProviders = useProviders;
exports.useText = useText;
exports.useWebRtc = useWebRtc;
exports.useWebSocket = useWebSocket;
//# sourceMappingURL=y-react.cjs.map
