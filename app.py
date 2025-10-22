from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    try:
        user_message = request.json.get("message")

        # Use GPT-4o-mini (fast & low-cost)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": (
                    "You are StudyMate AI, a friendly tutor and study friend. "
                    "You help users learn and explain subjects like Mathematics, English, "
                    "Biology, Physics, and Chemistry. You also chat casually when asked."
                )},
                {"role": "user", "content": user_message}
            ]
        )

        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
