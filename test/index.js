"use strict";

var test = require("tape");
var s = require("../src/index.js");

test("OperationMessage", function(t) {
    t.plan(4);
    var m = new s.OperationMessage("test");

    t.ok(m instanceof(s.OperationMessage), "Expected inheritance");

    t.equal(m.toString(), "[object OperationMessage]", "Expected string representation");
    t.equal(JSON.stringify(m, null, 0), "{\"type\":\"test\"}", "Expected JSON representation");

    t.throws(
        function() {
            new s.InitMessage("");
        },
        TypeError,
        "Expected argument validation"
    );
});

test("OperationMessageFromClient", function(t) {
    t.plan(3);
    var m = new s.OperationMessageFromClient("test");

    t.ok(m instanceof(s.OperationMessageFromClient), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessage), "Expected inheritance");

    t.equal(m.toString(), "[object OperationMessageFromClient]", "Expected string representation");
});

test("OperationMessageFromServer", function(t) {
    t.plan(3);
    var m = new s.OperationMessageFromServer("test");

    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessage), "Expected inheritance");

    t.equal(m.toString(), "[object OperationMessageFromServer]", "Expected string representation");
});

test("InitMessage", function(t) {
    t.plan(6);
    var m = new s.InitMessage();

    t.ok(m instanceof(s.InitMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromClient), "Expected inheritance");

    t.equal(m.toString(), "[object InitMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"connection_init\",\"payload\":{}}",
        "Expected JSON representation"
    );
    var m2 = new s.InitMessage({a: 5});
    t.equal(
        JSON.stringify(m2, null, 0),
        "{\"type\":\"connection_init\",\"payload\":{\"a\":5}}",
        "Expected JSON representation"
    );

    t.throws(
        function() {
            new s.InitMessage(123);
        },
        TypeError,
        "Expected argument validation"
    );
});

test("StartMessage", function(t) {
    t.plan(9);

    var m = new s.StartMessage(
        "e4424358-b528-4d64-b32d-186de159b8a6",
        "query name() { person { name } }"
    );

    t.ok(m instanceof(s.StartMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromClient), "Expected inheritance");

    t.equal(m.toString(), "[object StartMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"start\",\"id\":\"e4424358-b528-4d64-b32d-186de159b8a6\",\"payload\":{\"query\":\"query name() { person { name } }\",\"variables\":{},\"operationName\":\"\"}}",
        "Expected JSON representation"
    );

    t.throws(
        function() {
            new s.StartMessage(
                "e4424358-b528-4d64-b32d-186de159b8a6",
                ""
            );
        },
        TypeError,
        "Expected argument validation"
    );

    t.throws(
        function() {
            new s.StartMessage(
                "",
                "query name() { person { name } }"
            );
        },
        TypeError,
        "Expected argument validation"
    );

    t.throws(
        function() {
            new s.StartMessage(
                "e4424358-b528-4d64-b32d-186de159b8a6",
                "query name() { person { name } }",
                123
            );
        },
        TypeError,
        "Expected argument validation"
    );

    t.throws(
        function() {
            new s.StartMessage(
                "e4424358-b528-4d64-b32d-186de159b8a6",
                "query name() { person { name } }",
                {},
                123
            );
        },
        TypeError,
        "Expected argument validation"
    );

    t.throws(
        function() {
            new s.StartMessage(
                "e4424358-b528-4d64-b32d-186de159b8a6",
                "query name() { person { name } }",
                {},
                123
            );
        },
        TypeError,
        "Expected argument validation"
    );
});

test("StopMessage", function(t) {
    t.plan(6);

    var m = new s.StopMessage("e4424358-b528-4d64-b32d-186de159b8a6");

    t.ok(m instanceof(s.StopMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromClient), "Expected inheritance");

    t.equal(m.toString(), "[object StopMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"stop\",\"id\":\"e4424358-b528-4d64-b32d-186de159b8a6\"}",
        "Expected JSON representation"
    );

    t.throws(
        function() {
            new s.StopMessage(123);
        },
        TypeError,
        "Expected argument validation"
    );

    t.throws(
        function() {
            new s.StopMessage("");
        },
        TypeError,
        "Expected argument validation"
    );

});

test("ConnectionTerminateMessage", function(t) {
    t.plan(4);

    var m = new s.ConnectionTerminateMessage();

    t.ok(m instanceof(s.ConnectionTerminateMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromClient), "Expected inheritance");

    t.equal(m.toString(), "[object ConnectionTerminateMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"connection_terminate\"}",
        "Expected JSON representation"
    );
});

test("ConnectionErrorMessage", function(t) {
    t.plan(4);

    var m = new s.ConnectionErrorMessage({});

    t.ok(m instanceof(s.ConnectionErrorMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");

    t.equal(m.toString(), "[object ConnectionErrorMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"connection_error\",\"payload\":{}}",
        "Expected JSON representation"
    );
});

test("ConnectionAckMessage", function(t) {
    t.plan(4);

    var m = new s.ConnectionAckMessage({});

    t.ok(m instanceof(s.ConnectionAckMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");

    t.equal(m.toString(), "[object ConnectionAckMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"connection_ack\"}",
        "Expected JSON representation"
    );
});

test("DataMessage", function(t) {
    t.plan(4);

    var m = new s.DataMessage("e4424358-b528-4d64-b32d-186de159b8a6", {});

    t.ok(m instanceof(s.DataMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");

    t.equal(m.toString(), "[object DataMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"data\",\"id\":\"e4424358-b528-4d64-b32d-186de159b8a6\",\"payload\":{}}",
        "Expected JSON representation"
    );
});

test("ErrorMessage", function(t) {
    t.plan(4);

    var m = new s.ErrorMessage("e4424358-b528-4d64-b32d-186de159b8a6", {});

    t.ok(m instanceof(s.ErrorMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");

    t.equal(m.toString(), "[object ErrorMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"error\",\"id\":\"e4424358-b528-4d64-b32d-186de159b8a6\",\"payload\":{}}",
        "Expected JSON representation"
    );
});

test("CompleteMessage", function(t) {
    t.plan(4);

    var m = new s.CompleteMessage("e4424358-b528-4d64-b32d-186de159b8a6");

    t.ok(m instanceof(s.CompleteMessage), "Expected inheritance");
    t.ok(m instanceof(s.OperationMessageFromServer), "Expected inheritance");

    t.equal(m.toString(), "[object CompleteMessage]", "Expected string representation");
    t.equal(
        JSON.stringify(m, null, 0),
        "{\"type\":\"complete\",\"id\":\"e4424358-b528-4d64-b32d-186de159b8a6\"}",
        "Expected JSON representation"
    );
});

test("ensureOpen", function(t) {
    t.plan(5);

    var ws = { readyState: 1 };
    t.equal(ws, s.ensureOpen(ws));

    t.throws(
        function() {
            s.ensureOpen({ readyState: 0 });
        },
        "Websocket connection is in the process of connecting",
        "Expected readyState validation"
    );

    t.throws(
        function() {
            s.ensureOpen({ readyState: 2 });
        },
        "Websocket connection is in the process of closing",
        "Expected readyState validation"
    );

    t.throws(
        function() {
            s.ensureOpen({ readyState: 3 });
        },
        "Websocket connection is closed",
        "Expected readyState validation"
    );

    t.throws(
        function() {
            s.ensureOpen({ readyState: 404 });
        },
        TypeError,
        "Expected readyState validation"
    );
});

test("send", function(t) {
    t.plan(2);

    t.throws(
        function() { s.send({ readyState: 1 }, {}); },
        TypeError,
        "Expected message validation"
    );

    t.throws(
        function() {
            s.send(undefined, s.ConnectionTerminateMessage());
        },
        TypeError,
        "Expected websocket validation"
    );
});

test("receive", function(t) {
    t.plan(6);
    t.ok(
        s.receive({ type: "connection_error" }) instanceof(s.ConnectionErrorMessage),
        "Expected construction"
    );
    t.ok(
        s.receive({ type: "connection_ack" }) instanceof(s.ConnectionAckMessage),
        "Expected construction"
    );
    t.ok(
        s.receive({ type: "data" }) instanceof(s.DataMessage),
        "Expected construction"
    );
    t.ok(
        s.receive({ type: "error" }) instanceof(s.ErrorMessage),
        "Expected construction"
    );
    t.ok(
        s.receive({ type: "complete" }) instanceof(s.CompleteMessage),
        "Expected construction"
    );
    t.throws(
        function() {
            s.receive({ type: "unknown" });
        },
        TypeError,
        "Expected message validation"
    );
});
