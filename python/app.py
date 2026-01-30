from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model & scaler
model = joblib.load("house_price_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    df = pd.DataFrame([data])
    df_scaled = scaler.transform(df)

    price = model.predict(df_scaled)

    return jsonify({
        "predicted_price": int(price[0])
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
