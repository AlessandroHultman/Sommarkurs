from flask import Flask, request
from chatbot import chatbot_response
import typing
import json

# initialize flask app
app = Flask(__name__)

# setup url route which will return a chat response from the chatbot module


@app.route('/chatbot', methods=['POST'])
def chat_response():
    data = request.get_json()
    print(type(data)) # todo remove

    msg = data['payload']
    res = chatbot_response(msg)

    # return serialized python object as a JSON formatted string
    return json.dumps({
        "type": "CHATBOT_MESSAGE",
        "payload": res
    })


if __name__ == "__main__":
    app.run(port=5000)
