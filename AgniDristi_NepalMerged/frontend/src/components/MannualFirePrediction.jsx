import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function ManualFirePrediction() {
  const [step, setStep] = useState(1);
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
  });

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    temperature: "",
    humidity: "",
    wind_speed: "",
    precipitation: "",
    elevation: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFetchWeather = async () => {
    if (!locationData.latitude || !locationData.longitude) {
      setError("Please enter both latitude and longitude");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-weather-data`, {
        params: {
          lat: parseFloat(locationData.latitude),
          lon: parseFloat(locationData.longitude),
        },
      });

      setFormData({
        latitude: parseFloat(locationData.latitude),
        longitude: parseFloat(locationData.longitude),
        temperature: response.data.temperature,
        humidity: response.data.humidity,
        wind_speed: response.data.wind_speed,
        precipitation: response.data.precipitation,
        elevation: response.data.elevation,
      });

      setStep(2);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Failed to fetch weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : "",
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/predict-manual`, formData);
      setResult(response.data);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow bg-white">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Step 1: Enter Location
          </h2>
          <p className="text-gray-600 mb-4">
            Enter the latitude and longitude to fetch weather data for that location.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={locationData.latitude}
                onChange={handleLocationChange}
                placeholder="e.g., 27.4167"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={locationData.longitude}
                onChange={handleLocationChange}
                placeholder="e.g., 85.0333"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleFetchWeather}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
          >
            {loading ? "Fetching Weather Data..." : "Fetch Weather Data"}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Step 2: Review & Adjust Weather Data
          </h2>
          <p className="text-gray-600 mb-4">
            Weather and elevation data have been fetched. You can review and adjust values if needed.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded">
            {[
              { key: "latitude", label: "Latitude" },
              { key: "longitude", label: "Longitude" },
              { key: "temperature", label: "Temperature (°C)" },
              { key: "humidity", label: "Humidity (%)" },
              { key: "wind_speed", label: "Wind Speed (km/h)" },
              { key: "precipitation", label: "Precipitation (mm)" },
              { key: "elevation", label: "Elevation (m)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  type="number"
                  step="any"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep(1);
                setLocationData({ latitude: "", longitude: "" });
              }}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Predicting..." : "Predict Fire Risk"}
            </button>
          </div>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      )}

      {step === 3 && result && (
        <>
          <h2 className="text-2xl font-bold mb-6">Step 3: Prediction Result</h2>
          <div className="bg-gray-50 p-6 rounded mb-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Fire Prediction</p>
              <p className="text-3xl font-bold text-blue-600">
                {result.fire_occurred === 1 ? "⚠️ Fire Likely" : "✓ No Fire Expected"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <p className={`text-2xl font-bold ${
                  result.risk_level === "High"
                    ? "text-red-600"
                    : result.risk_level === "Moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}>
                  {result.risk_level}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {result.confidence}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Probability</p>
                <p className="text-2xl font-bold">
                  {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Detailed Analysis
            </p>
            <p className="text-gray-700">{result.risk_message}</p>
          </div>
          <button
            onClick={() => {
              setFormData({
                latitude: "",
                longitude: "",
                temperature: "",
                humidity: "",
                wind_speed: "",
                precipitation: "",
                elevation: "",
              });
              setLocationData({ latitude: "", longitude: "" });
              setResult(null);
              setStep(1);
            }}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Make Another Prediction
          </button>
        </>
      )}
    </div>
  );
}
