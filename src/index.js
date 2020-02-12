"use strict";

/**
 * Construct a generic GraphQL operation message.
 * @constructor
 * @param {string} type - Message type
 * @throws {TypeError} Throws a type error if the provided message type is invalid or empty.
 * @returns {OperationMessage}
*/
function OperationMessage(type) {
    if (typeof(type) !== "string" || type === "") {
        throw TypeError("Invalid message type");
    }
    Object.defineProperty(this, "type", {
        enumerable: true,
        configurable: false,
        value: type
    });
}

OperationMessage.prototype.toString = function() {
    return "[object OperationMessage]";
};

/**
 * Construct a GraphQL operation message to be sent from a client.
 * @constructor
 * @augments OperationMessage
 * @param {string} type - Message type
 * @throws {TypeError} Throws a type error if the provided message type is invalid or empty.
 * @returns {OperationMessageFromClient}
*/
function OperationMessageFromClient(type) {
    OperationMessage.call(this, type);
}

OperationMessageFromClient.prototype =
    Object.create(OperationMessage.prototype);

OperationMessageFromClient.prototype.toString = function() {
    return "[object OperationMessageFromClient]";
};

/**
 * Construct a GraphQL operation message to be sent from a server.
 * @constructor
 * @augments OperationMessage
 * @param {string} type - Message type
 * @throws {TypeError} Throws a type error if the provided message type is invalid or empty.
 * @returns {OperationMessageFromServer}
*/
function OperationMessageFromServer(type) {
    OperationMessage.call(this, type);
}

OperationMessageFromServer.prototype =
    Object.create(OperationMessage.prototype);

OperationMessageFromServer.prototype.toString = function() {
    return "[object OperationMessageFromServer]";
};

/**
 * Construct a GraphQL communication initialization message.
 * @constructor
 * @augments OperationMessageFromClient
 * @param {object=} payload - Connection parameters
 * @throws {TypeError} Throws a type error if the provided payload is invalid.
 * @returns {InitMessage}
*/
function InitMessage(payload) {
    if (this instanceof InitMessage) {
        if (payload !== undefined && typeof(payload) !== "object") {
            throw TypeError("Invalid payload");
        }
        OperationMessageFromClient.call(this, "connection_init");
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: false,
            value: payload || {}
        });
    } else {
        return new InitMessage(payload);
    }
}

InitMessage.prototype =
    Object.create(OperationMessageFromClient.prototype);

InitMessage.prototype.toString = function() {
    return "[object InitMessage]";
};

/**
 * Construct a GraphQL communication initialization message.
 * @constructor
 * @augments OperationMessageFromClient
 * @param {string} id - Operation identifier
 * @param {string} query - Operation
 * @param {object=} variables - Variables
 * @param {string=} operationName - Operation name
 * @throws {TypeError} Throws a type error if any of the provided arguments are invalid.
 * @returns {StartMessage}
*/
function StartMessage(id, query, variables, operationName) {
    if (this instanceof StartMessage) {
        if (typeof(id) !== "string" || id === "") {
            throw TypeError("Invalid operation identifier");
        }
        if (typeof(query) !== "string" || query === "") {
            throw TypeError("Invalid query");
        }
        if (variables !== undefined && typeof(variables) !== "object") {
            throw TypeError("Invalid payload");
        }
        if (operationName !== undefined && typeof(operationName) !== "string") {
            throw TypeError("Invalid operation name");
        }
        OperationMessageFromClient.call(this, "start");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: false,
            value: id
        });
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: false,
            value: {
                query: query,
                variables: variables || {},
                operationName: operationName || ""
            }
        });
    } else {
        return new StartMessage(id, query, variables, operationName);
    }
}

StartMessage.prototype =
    Object.create(OperationMessageFromClient.prototype);

StartMessage.prototype.toString = function() {
    return "[object StartMessage]";
};

/**
 * Construct a GraphQL operation termination message.
 * @constructor
 * @augments OperationMessageFromClient
 * @param {string} id - Operation identifier
 * @throws {TypeError} Throws a type error if the provided operation identifier is invalid or empty.
 * @returns {StopMessage}
*/
function StopMessage(id) {
    if (this instanceof StopMessage) {
        if (typeof(id) !== "string" || id === "") {
            throw TypeError("Invalid operation identifier");
        }
        OperationMessageFromClient.call(this, "stop");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: false,
            value: id
        });
    } else {
        return new StopMessage(id);
    }
}

StopMessage.prototype =
    Object.create(OperationMessageFromClient.prototype);

StopMessage.prototype.toString = function() {
    return "[object StopMessage]";
};

/**
 * Construct a GraphQL connection termination message.
 * @constructor
 * @augments OperationMessageFromClient
 * @returns {ConnectionTerminateMessage}
*/
function ConnectionTerminateMessage() {
    if (this instanceof ConnectionTerminateMessage) {
        OperationMessageFromClient.call(this, "connection_terminate");
    } else {
        return new ConnectionTerminateMessage();
    }
}

ConnectionTerminateMessage.prototype =
    Object.create(OperationMessageFromClient.prototype);

ConnectionTerminateMessage.prototype.toString = function() {
    return "[object ConnectionTerminateMessage]";
};

/**
 * Construct a GraphQL connection rejection message.
 * @constructor
 * @augments OperationMessageFromServer
 * @param {object} payload - Error
 * @returns {ConnectionErrorMessage}
*/
function ConnectionErrorMessage(payload) {
    if (this instanceof ConnectionErrorMessage) {
        OperationMessageFromServer.call(this, "connection_error");
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: false,
            value: payload
        });
    } else {
        return new ConnectionErrorMessage(payload);
    }
}

ConnectionErrorMessage.prototype =
    Object.create(OperationMessageFromServer.prototype);

ConnectionErrorMessage.prototype.toString = function() {
    return "[object ConnectionErrorMessage]";
};

/**
 * Construct a GraphQL connection acceptance message.
 * @constructor
 * @augments OperationMessageFromServer
 * @returns {ConnectionAckMessage}
*/
function ConnectionAckMessage() {
    if (this instanceof OperationMessage) {
        OperationMessageFromServer.call(this, "connection_ack");
    } else {
        return new OperationMessage();
    }
}

ConnectionAckMessage.prototype =
    Object.create(OperationMessageFromServer.prototype);

ConnectionAckMessage.prototype.toString = function() {
    return "[object ConnectionAckMessage]";
};

/**
 * Construct a GraphQL operation execution result message.
 * @constructor
 * @augments OperationMessageFromServer
 * @param {string} id - Operation identifier
 * @param {object} payload - Execution result
 * @returns {DataMessage}
*/
function DataMessage(id, payload) {
    if (this instanceof DataMessage) {
        OperationMessageFromServer.call(this, "data");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: false,
            value: id
        });
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: false,
            value: payload
        });
    } else {
        return new DataMessage(id, payload);
    }
}

DataMessage.prototype =
    Object.create(OperationMessageFromServer.prototype);

DataMessage.prototype.toString = function() {
    return "[object DataMessage]";
};

/**
 * Construct a GraphQL operation failure message.
 * @constructor
 * @augments OperationMessageFromServer
 * @param {string} id - Operation identifier
 * @param {object} payload - Error
 * @returns {ErrorMessage}
 */
function ErrorMessage(id, payload) {
    if (this instanceof ErrorMessage) {
        OperationMessageFromServer.call(this, "error");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: false,
            value: id
        });
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: false,
            value: payload
        });
    } else {
        return new ErrorMessage(id, payload);
    }
}

ErrorMessage.prototype =
    Object.create(OperationMessageFromServer.prototype);

ErrorMessage.prototype.toString = function() {
    return "[object ErrorMessage]";
};

/**
 * Construct a GraphQL operation completion message.
 * @constructor
 * @augments OperationMessageFromServer
 * @param {string} id - Operation identifier
 * @returns {CompleteMessage}
 */
function CompleteMessage(id) {
    if (this instanceof CompleteMessage) {
        OperationMessageFromServer.call(this, "complete");
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: false,
            value: id
        });
    } else {
        return new CompleteMessage(id);
    }
}

CompleteMessage.prototype =
    Object.create(OperationMessageFromServer.prototype);

CompleteMessage.prototype.toString = function() {
    return "[object CompleteMessage]";
};

/**
 * Validate WebSocket connection state
 * @param {object} webSocket - WebSocket connection
 * @throws {Error} Throws an error if the websocket connection is not open.
 * @throws {TypeError} Throws a type error if the state of the websocket is undefined or unknown.
 * @returns {object} - WebSocket
 */
function ensureOpen(webSocket) {
    switch (webSocket.readyState) {
    case 0:
        throw Error("WebSocket connection is in the process of connecting");
    case 1:
        return webSocket;
    case 2:
        throw Error("WebSocket connection is in the process of closing");
    case 3:
        throw Error("WebSocket connection is closed");
    default:
        throw TypeError("WebSocket is in unknown state");
    }
}

/**
 * Transmit a GraphQL operation message over a WebSocket.
 * @param {object} webSocket - WebSocket connection
 * @param {object} message - GraphQL operation message
 * @throws {TypeError} Throws a type error if the provided message is not a valid client-side operation message.
 * @throws {Error} Throws an error if the provided message cannot be serialized to JSON.
 * @throws {TypeError} Throws a type error if the provided WebSocket connection is not open.
 */
function send(webSocket, message) {
    if (!(message instanceof(OperationMessageFromClient))) {
        throw TypeError("Invalid message");
    }

    try {
        var serialized = JSON.stringify(message, null, 0);
    } catch (e) {
        throw Error("Unable to serialize message");
    }

    ensureOpen(webSocket).send(serialized);
}

/**
 * Derive a server-side GraphQL operation message from an object.
 * @param {object} message - Message received from server
 * @throws {TypeError} Throws a type error if the provided message is of an unknown type.
 * @returns {ConnectionErrorMessage|ConnectionAckMessage|DataMessage|ErrorMessage|CompleteMessage} GraphQL operation message
 */
function receive(message) {
    switch (message.type) {
    case "connection_error":
        return new ConnectionErrorMessage(message.payload);
    case "connection_ack":
        return new ConnectionAckMessage();
    case "data":
        return new DataMessage(message.id, message.payload);
    case "error":
        return new ErrorMessage(message.id, message.payload);
    case "complete":
        return new CompleteMessage(message.id);
    default:
        throw TypeError(
            "Received message of unknown type\n" + JSON.stringify(message, null, 2)
        );
    }
}

module.exports = {
    OperationMessage: OperationMessage,
    OperationMessageFromClient: OperationMessageFromClient,
    OperationMessageFromServer: OperationMessageFromServer,

    InitMessage: InitMessage,
    StartMessage: StartMessage,
    StopMessage: StopMessage,
    ConnectionTerminateMessage: ConnectionTerminateMessage,

    ConnectionErrorMessage: ConnectionErrorMessage,
    ConnectionAckMessage: ConnectionAckMessage,
    DataMessage: DataMessage,
    ErrorMessage: ErrorMessage,
    CompleteMessage: CompleteMessage,

    ensureOpen: ensureOpen,
    send: send,
    receive: receive
};
