import { Injectable } from "@angular/core";
import { ChatMessageDto } from "../models/chatMessageDto";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: WebSocket | undefined;
  public chatHistory: ChatMessageDto[] = [];

  constructor() { }

  public connect() {
    this.socket = new WebSocket("ws://localhost:8080");

    this.socket.onopen = () => {
      console.log("Connected to socket server");
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type === "CHATBOT_MESSAGE") {
        const chatMsg = new ChatMessageDto(data.type, data.payload);
        this.chatHistory.push(chatMsg); // todo fixa autoscroll (low prio)
      }
    }

    this.socket.onclose = (event) => {
      console.log("Socket closed ", event);
    }

    this.socket.onerror = (err) => {
      console.log(err);
    }
  }

  public sendMessage(chatMessage: ChatMessageDto) {
    this.socket?.send(JSON.stringify(chatMessage));
    this.chatHistory.push(chatMessage);
  }
}
