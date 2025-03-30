import React, { useState } from "react";
import axios from "axios";

const MLPredictor = () => {
  const [formData, setFormData] = useState({
    // Diabetes Inputs (all numeric)
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
    sex: "0", // Default to female
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

  const [diabetesResult, setDiabetesResult] = useState(null);
  const [heartResult, setHeartResult] = useState(null);
  const [isLoading, setIsLoading] = useState({
    diabetes: false,
    heart: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const predictDisease = async (type) => {
    setIsLoading({ ...isLoading, [type]: true });
    
    let requestData = {};
    const fields = type === "diabetes" ? [
      "pregnancies", "glucose", "bloodPressure", "skinThickness", 
      "insulin", "bmi", "diabetesPedigree", "age"
    ] : [
      "heartAge", "sex", "chestPain", "restingBP", "cholesterol", 
      "fastingBS", "restingECG", "maxHeartRate", "exerciseAngina", 
      "oldpeak", "stSlope", "ca", "thal"
    ];

    fields.forEach(field => {
      // Convert string numbers to actual numbers
      requestData[field] = formData[field] === "" ? "" : Number(formData[field]);
    });

    try {
      const response = await axios.post(
        `http://localhost:5001/predict/${type}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (type === "diabetes") setDiabetesResult(response.data.prediction);
      if (type === "heart") setHeartResult(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error);
    } finally {
      setIsLoading({ ...isLoading, [type]: false });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Medical Prediction System</h2>

        {/* Diabetes Prediction Section */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Diabetes Prediction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { name: "pregnancies", placeholder: "Pregnancies", type: "number", min: 0 },
              { name: "glucose", placeholder: "Glucose Level (mg/dL)", type: "number", min: 0 },
              { name: "bloodPressure", placeholder: "Blood Pressure (mm Hg)", type: "number", min: 0 },
              { name: "skinThickness", placeholder: "Skin Thickness (mm)", type: "number", min: 0 },
              { name: "insulin", placeholder: "Insulin Level (μU/mL)", type: "number", min: 0 },
              { name: "bmi", placeholder: "BMI (kg/m²)", type: "number", step: "0.1", min: 0 },
              { name: "diabetesPedigree", placeholder: "Diabetes Pedigree Function", type: "number", step: "0.001", min: 0 },
              { name: "age", placeholder: "Age (years)", type: "number", min: 0 }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.placeholder}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  step={field.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => predictDisease("diabetes")}
            disabled={isLoading.diabetes}
            className={`w-full md:w-auto px-4 py-2 rounded-md text-white font-medium ${isLoading.diabetes ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading.diabetes ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </span>
            ) : "Predict Diabetes"}
          </button>
          {diabetesResult !== null && (
            <div className={`mt-4 p-3 rounded-md ${diabetesResult === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <p className="font-medium">Diabetes Prediction: {diabetesResult === 1 ? "Positive" : "Negative"}</p>
            </div>
          )}
        </div>

        {/* Heart Disease Prediction Section */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Heart Disease Prediction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Numeric Inputs */}
            {[
              { name: "heartAge", placeholder: "Age (years)", type: "number", min: 0 },
              { name: "restingBP", placeholder: "Resting BP (mm Hg)", type: "number", min: 0 },
              { name: "cholesterol", placeholder: "Cholesterol (mg/dL)", type: "number", min: 0 },
              { name: "maxHeartRate", placeholder: "Max Heart Rate", type: "number", min: 0 },
              { name: "oldpeak", placeholder: "Oldpeak (ST depression)", type: "number", step: "0.1" }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.placeholder}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  step={field.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}

            {/* Sex (Radio Buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="0"
                    checked={formData.sex === "0"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="1"
                    checked={formData.sex === "1"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
              </div>
            </div>

            {/* Chest Pain Type (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chest Pain Type</label>
              <select
                name="chestPain"
                value={formData.chestPain}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>

            {/* Fasting Blood Sugar (Radio Buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fasting Blood Sugar &gt; 120 mg/dL</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fastingBS"
                    value="0"
                    checked={formData.fastingBS === "0"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fastingBS"
                    value="1"
                    checked={formData.fastingBS === "1"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
              </div>
            </div>

            {/* Resting ECG (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resting ECG</label>
              <select
                name="restingECG"
                value={formData.restingECG}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>

            {/* Exercise Angina (Radio Buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Induced Angina</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="exerciseAngina"
                    value="0"
                    checked={formData.exerciseAngina === "0"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="exerciseAngina"
                    value="1"
                    checked={formData.exerciseAngina === "1"}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
              </div>
            </div>

            {/* ST Slope (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ST Slope</label>
              <select
                name="stSlope"
                value={formData.stSlope}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>

            {/* Number of Major Vessels (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Major Vessels (0-3)</label>
              <select
                name="ca"
                value={formData.ca}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Thalassemia (Select) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thalassemia</label>
              <select
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => predictDisease("heart")}
            disabled={isLoading.heart}
            className={`w-full md:w-auto px-4 py-2 rounded-md text-white font-medium ${isLoading.heart ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading.heart ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </span>
            ) : "Predict Heart Disease"}
          </button>
          {heartResult !== null && (
            <div className={`mt-4 p-3 rounded-md ${heartResult === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <p className="font-medium">Heart Disease Prediction: {heartResult === 1 ? "Positive" : "Negative"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLPredictor;