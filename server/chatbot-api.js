import request from 'request-promise';

export async function requestResponse(message) {
  const chatMsg = {
    "type": "CHAT_MESSAGE",
    "payload": message
  }

  let options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/chatbot',
    body: chatMsg,
    json: true
  }
  
  return await request(options);
}
