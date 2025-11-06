// Import different library
import http, { Server } from "http";
import app from "./index";

// the different types
type Port = number | string | false;
type ServerError = NodeJS.ErrnoException;


const normalizePort = (val: string): Port => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port: Port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

// Error handling
const errorHandler = (error: ServerError): void => {
  if (error.syscall !== "listen") throw error;

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
const server: Server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  console.log("✅ Listening on " + bind);
});

server.listen(port);