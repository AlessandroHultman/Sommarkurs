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

  public messageSent: string = "CHAT_MESSAGE";
  
  constructor(public socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.connect();
  }

  public sendMessage(sendForm: NgForm): void {
    const chatMsgType: string = "CHAT_MESSAGE";
    const chatMsgDto = new ChatMessageDto(chatMsgType, sendForm.value.payload);
    this.socketService.sendMessage(chatMsgDto);
    sendForm.resetForm();
    document.getElementById("message-box")!.scrollTop = document.getElementById(
      "message-box"
    )!.scrollHeight;
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
