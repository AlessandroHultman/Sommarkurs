import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { requestResponse } from "./chatbot-api";

const PORT = 8080;

export let connect = () => {
  const server = http.createServer(express);
  const wss = new WebSocketServer({ server: server });

  wss.on("connection", (webSocketClient) => {
    webSocketClient.send("Connected to websocket");

    webSocketClient.on("message", (message) => {
      console.log(message);
      let sendRequest = requestResponse(JSON.stringify(message));
      sendRequest.then((response) => {
        webSocketClient.send(response);
      });
      sendRequest.catch((err) => {
        console.log(err);
      });
    });
  })

  server.listen(PORT, () => {
    console.log(`Socket server started on port ${PORT}`)
  });
}
