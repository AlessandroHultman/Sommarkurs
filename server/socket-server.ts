import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { requestResponse } from "./chatbot-api";

const PORT = 8080;
const server = http.createServer(express);
const wss = new WebSocketServer({ server: server });

// todo make this script a function called initializeSocketServer() and call in in server.ts

wss.on("connection", (webSocketClient) => {
  webSocketClient.on("message", (message) => {
    const chatMsg = JSON.parse(message.toString());
    console.log(chatMsg); // todo check msg type before proceeding
    let sendRequest = requestResponse(chatMsg.payload.toString());
    sendRequest.then((response) => {
      webSocketClient.send(JSON.stringify(response));
    });
    sendRequest.catch((err) => {
      console.log(err);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Socket server started on port ${PORT}`);
});
