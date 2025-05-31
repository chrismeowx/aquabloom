import React, { useState } from "react";
import Dropdown from "./components/Dropdown.jsx";
import PredictButton from "./components/PredictButton.jsx";
import "./App.css"

const questions = [
  { text: "Crop Type", options: ['BANANA', 'SOYABEAN', 'CABBAGE', 'POTATO', 'RICE', 'MELON', 'MAIZE', 'CITRUS', 'BEAN', 'WHEAT', 'MUSTARD', 'COTTON', 'SUGARCANE', 'TOMATO', 'ONION'] },
  { text: "Soil Type", options: ['DRY', 'HUMID', 'WET'] },
  { text: "Temperature", options: ['10-20', '20-30', '30-40', '40-50'] },
  { text: "Region", options: ['DESERT', 'SEMI ARID', 'SEMI HUMID', 'HUMID'] },
  { text: "Weather Condition", options: ['NORMAL', 'SUNNY', 'WINDY', 'RAINY'] }
];

export default function App() {
  const [answers, setAnswers] = useState({
    "Crop Type": null,
    "Soil Type": null,
    "Temperature": null,
    "Region": null,
    "Weather Condition": null,
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSelect = (question, option) => {
    setAnswers(prev => ({ ...prev, [question]: option }));
  };

  const handlePredict = async () => {
    if (!answers["Temperature"] || !answers["Crop Type"] || !answers["Soil Type"] || !answers["Region"] || !answers["Weather Condition"]) {
      setError("All answers must be filled!");
      setPrediction(null);
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const [minTemp, maxTemp] = answers["Temperature"].split("-").map(Number);
    const temp = (minTemp + maxTemp) / 2;

    const postData = {
      "REGION": answers["Region"],               //
      "WEATHER CONDITION": answers["Weather Condition"],
      "SOIL TYPE": answers["Soil Type"],
      "TEMPERATURE": temp,
      "CROP TYPE": answers["Crop Type"],
    };

    try {
      const res = await fetch("http://localhost:5000/predict", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "There's an error in the server.");
      }

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute">
      <div className="absolute inset-0 justify-center">
        <div className="bg-shape3 bg-teal opacity-50 bg-blur"></div>
        <div className="bg-shape2 bg-primary opacity-50 bg-blur"></div>
        <div className="bg-shape1 bg-teal opacity-50 bg-blur"></div>
        <div className="bg-shape2 bg-primary opacity-50 bg-blur"></div>
        <div className="bg-shape1 bg-green opacity-50 bg-blur"></div>
      </div>

     <div className="text">
        <h1>AquaBloom</h1>
        <p>
          Efficient water management is a critical factor in sustainable agriculture and horticulture. AquaBloom system provides advanced predictive analytics to determine the precise amount of water required for plants based on its crop type, soil type, region, temperature of the region, and the weather condition. Based on various environment factors, Aquabloom enhances irrigation strategies and optimizes plant health and resource efficiency.
        </p>
      </div>

      <div className="input">
        <h2>Water Requirement Prediction</h2>
        <div className="questions-container">
          {questions.map(({ text, options }) => (
            <div key={text} className="question-item">
              <p>{text}</p>
              <Dropdown
                buttonText={answers[text] || "None"}
                options={options}
                onSelect={(option) => handleSelect(text, option)}
              />
            </div>
          ))}
        </div>


        <PredictButton
          onClick={handlePredict}
          disabled={loading}
          text={loading ? "Analyzing..." : "Predict"}
        />
      </div>

      <div className="results">
        <div className="bg-shape4 bg-green opacity-50 bg-blur"></div>
        {error && <p style={{ color: "red", fontSize: "50px"}}>{error}</p>}
        {prediction !== null && (
          <div className="result-text">
            <div className="label">Water Requirement</div>
            <div className="value">{prediction} mm/day</div>
          </div>
        )}
      </div>

      </div>
  );
}
