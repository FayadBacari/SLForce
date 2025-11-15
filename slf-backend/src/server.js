"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import different library
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./index"));
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
};
const port = normalizePort(process.env.PORT || "7000");
index_1.default.set("port", port);
// Error handling
const errorHandler = (error) => {
    if (error.syscall !== "listen")
        throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
        default:
            throw error;
    }
};
// server creat with import http
const server = http_1.default.createServer(index_1.default);
server.on("error", errorHandler);
server.on("listening", () => {
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    console.log("✅ Listening on " + bind);
});
server.listen(port);
//# sourceMappingURL=server.js.map