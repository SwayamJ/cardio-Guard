from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "GradientBoosting_pipe.pkl")
model = joblib.load(MODEL_PATH)

RAW_FEATURES = [
    "age", "gender", "height", "weight",
    "ap_hi", "ap_lo", "cholesterol", "gluc",
    "smoke", "alco", "active"
]

def engineer_features(df):
    """Replicate the feature engineering done at training time."""
    df = df.copy()
    bmi = df["weight"] / ((df["height"] / 100) ** 2)
    df["bmi_sq"] = bmi ** 2
    df["pulse_pressure"] = df["ap_hi"] - df["ap_lo"]
    df["mean_arterial_pressure"] = (df["ap_hi"] + 2 * df["ap_lo"]) / 3
    df["age_ap_hi_interaction"] = df["age"] * df["ap_hi"]
    return df

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # Validate all raw fields present
        missing = [f for f in RAW_FEATURES if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400

        # Build single-row DataFrame and engineer features
        row = {col: [float(data[col])] for col in RAW_FEATURES}
        df = pd.DataFrame(row)
        df = engineer_features(df)

        prediction = int(model.predict(df)[0])
        try:
            proba = float(model.predict_proba(df)[0][1])
        except Exception:
            proba = None

        return jsonify({"prediction": prediction, "probability": proba})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
