import request from 'request-promise'

// todo add types for ts refactor
// type ChatMessage = {
//   type: string;
//   payload: string;
// }

export async function sendChatMessage(chatMsg) {

  let message = {
    "type": "CLIENT_MESSAGE",
    "payload": chatMsg
  }

  let options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/chatbot',
    body: message,
    json: true
  }

  return await request(options);
}

// example usage
// let chatMsg = 'Good day';
// var sendRequest = sendChatMessage(chatMsg);
// sendRequest.then(function (response) {
//   console.log(typeof response);
//   console.log(response);
// })
