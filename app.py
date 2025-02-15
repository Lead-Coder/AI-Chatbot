from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key = api_key)

model = genai.GenerativeModel('gemini-pro')

def send_message(message, history):
    if history is None:
        history = []

    chat = model.start_chat(history=history)
    response = chat.send_message(message)

    history.append({"role": "user", "parts": message})
    history.append({"role": "model", "parts": response.text})

    return response.text, history

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    history = data.get('history', [])

    response, history = send_message(user_message, history)
    return jsonify({'message': response, 'history': history})

if __name__ == '__main__':
    app.run(debug=True)
