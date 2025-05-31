from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("./backend/model.pkl")

crop_map = {
    "BANANA": 0, "BEAN": 1, "CABBAGE": 2, "CITRUS": 3,
    "COTTON": 4, "MAIZE": 5, "MELON": 6, "MUSTARD": 7,
    "ONION": 8, "POTATO": 9, "RICE": 10, "SOYABEAN": 11,
    "SUGARCANE": 12, "TOMATO": 13, "WHEAT": 14
}

soil_map = {
    "DRY": 0, "HUMID": 1, "WET": 2
}

region_map = {
    "DESERT": 0, "HUMID": 1, "SEMI ARID": 2, "SEMI HUMID": 3
}

weather_map = {
    "NORMAL": 0, "RAINY": 1, "SUNNY": 2, "WINDY": 3
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        crop = crop_map.get(data.get("CROP TYPE", "").upper())
        soil = soil_map.get(data.get("SOIL TYPE", "").upper())
        region = region_map.get(data.get("REGION", "").upper())
        temp = float(data.get("TEMPERATURE"))
        weather = weather_map.get(data.get("WEATHER CONDITION", "").upper())

        print("Received data:", data)
        print("Mapped values:", crop, soil, region, weather)

        if None in [crop, soil, region, weather]:
            return jsonify({"error": f"Invalid categorical value: "
                            f"CROP TYPE={crop}, SOIL TYPE={soil}, "
                            f"REGION={region}, WEATHER={weather}"}), 400

        input_df = pd.DataFrame([{
            "CROP TYPE": crop,
            "SOIL TYPE": soil,
            "REGION": region,
            "TEMPERATURE": temp,
            "WEATHER CONDITION": weather
        }])

        # Prediksi menggunakan pipeline model
        prediction = model.predict(input_df)[0]

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
