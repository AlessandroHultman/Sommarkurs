import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from 'src/app/models/chatMessageDto';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  private running: boolean;

  constructor(public socketService: SocketService) {
    this.running = false;
  }

  ngOnInit(): void {
    this.socketService.connect();
  }
  public sendMessage(sendForm: NgForm): void {
    let chatMsgType: string = "CHAT_MESSAGE";
    const chatMessageDto = new ChatMessageDto(chatMsgType, sendForm.value.payload);
    this.socketService.chatHistory.push(chatMessageDto);
    this.socketService.sendMessage(chatMessageDto);
    sendForm.resetForm();
    this.running = true;
  }

  public toggleChatbox(): void {
    if (document.getElementById("chatbot")!.classList.contains("collapsed")) {
      document.getElementById("chatbot")!.classList.remove("collapsed");
      let toggle0: HTMLElement = <HTMLElement>document.getElementById("chatbot_toggle")!.children[0];
      toggle0.style.display = "none";
      let toggle1: HTMLElement = <HTMLElement>document.getElementById("chatbot_toggle")!.children[1];
      toggle1.style.display = "";
    }
    else {
      document.getElementById("chatbot")!.classList.add("collapsed");
      let toggle0: HTMLElement = <HTMLElement>document.getElementById("chatbot_toggle")!.children[0];
      toggle0.style.display = ""
      let toggle1: HTMLElement = <HTMLElement>document.getElementById("chatbot_toggle")!.children[1];
      toggle1.style.display = "none";
    }
  }
}