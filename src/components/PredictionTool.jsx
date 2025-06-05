import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


const API_BASE_URL = "http://localhost:5001";

const MLPredictor = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    // Diabetes Inputs
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",

    // Heart Disease Inputs
    heartAge: "",
    sex: "0",
    chestPain: "0",
    restingBP: "",
    cholesterol: "",
    fastingBS: "0",
    restingECG: "0",
    maxHeartRate: "",
    exerciseAngina: "0",
    oldpeak: "",
    stSlope: "0",
    ca: "0",
    thal: "1",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predictDisease = async () => {
    setIsLoading(true);
    let requestData = {};
    const fields =
      type === "diabetes"
        ? ["pregnancies", "glucose", "bloodPressure", "skinThickness", "insulin", "bmi", "diabetesPedigree", "age"]
        : ["heartAge", "sex", "chestPain", "restingBP", "cholesterol", "fastingBS", "restingECG", "maxHeartRate", "exerciseAngina", "oldpeak", "stSlope", "ca", "thal"];

    fields.forEach((field) => {
      requestData[field] = formData[field] === "" ? "" : Number(formData[field]);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/predict/${type}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
      setPredictionResult(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking outside
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {type === "diabetes" ? "Diabetes Prediction" : "Heart Disease Prediction"}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {(type === "diabetes"
            ? [
                { name: "pregnancies", placeholder: "Pregnancies" },
                { name: "glucose", placeholder: "Glucose Level (mg/dL)" },
                { name: "bloodPressure", placeholder: "Blood Pressure (mm Hg)" },
                { name: "skinThickness", placeholder: "Skin Thickness (mm)" },
                { name: "insulin", placeholder: "Insulin Level (μU/mL)" },
                { name: "bmi", placeholder: "BMI (kg/m²)", step: "0.1" },
                { name: "diabetesPedigree", placeholder: "Diabetes Pedigree Function", step: "0.001" },
                { name: "age", placeholder: "Age (years)" },
              ]
            : [
                { name: "age", placeholder: "Age (years)" },
                { name: "restingBP", placeholder: "Resting BP (mm Hg)" },
                { name: "cholesterol", placeholder: "Cholesterol (mg/dL)" },
                { name: "maxHeartRate", placeholder: "Max Heart Rate" },
                { name: "oldpeak", placeholder: "Oldpeak (ST depression)", step: "0.1" },
                { name: "sex", placeholder: "Sex", type: "select", options: ["Male", "Female"] },
                { name: "chestPain", placeholder: "Chest Pain Type", type: "select", options: ["Typical Angina", "Atypical Angina", "Non-Anginal Pain", "Asymptomatic"] },
                { name: "fastingBS", placeholder: "Fasting Blood Sugar", type: "select", options: ["< 120 mg/dL", "≥ 120 mg/dL"] },
                { name: "restingECG", placeholder: "Resting ECG", type: "select", options: ["Normal", "ST-T Wave Abnormality", "Left Ventricular Hypertrophy"] },
                { name: "exerciseAngina", placeholder: "Exercise-Induced Angina", type: "select", options: ["No", "Yes"] },
                { name: "stSlope", placeholder: "ST Slope", type: "select", options: ["Upsloping", "Flat", "Downsloping"] },
                { name: "ca", placeholder: "Number of Major Vessels", type: "select", options: ["0", "1", "2", "3", "4"] },
                { name: "thal", placeholder: "Thalassemia", type: "select", options: ["Normal", "Fixed Defect", "Reversible Defect"] },
              ]
          ).map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.placeholder}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={idx}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  step={field.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={predictDisease}
          disabled={isLoading}
          className={`w-full py-2 rounded-md text-white font-medium ${isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} transition-all duration-300`}
        >
          {isLoading ? "Predicting..." : `Predict ${type === "diabetes" ? "Diabetes" : "Heart Disease"}`}
        </button>

        {predictionResult !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 text-center rounded-md ${predictionResult === 1 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
          >
            Prediction: {predictionResult === 1 ? "Positive" : "Negative"}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MLPredictor;
