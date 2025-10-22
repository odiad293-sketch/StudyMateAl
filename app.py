from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your API key here or as environment variable on Render
openai.api_key = os.getenv("OPENAI_API_KEY", "your-api-key-here")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    prompt = f"""
    You are StudyMate AI — a smart, kind and detailed personal tutor.
    You can solve and explain step-by-step any question in Mathematics, Physics, Chemistry or English.
    When the user asks, give very clear, easy-to-understand answers.
    If it's a casual question, respond friendly.
    Question: {user_message}
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": prompt}],
            temperature=0.7
        )
        reply = response.choices[0].message["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
