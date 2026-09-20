
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AlertBanner from './AlertBanner';


/* ---------- helper: click -> lat/lon marker ---------- */
function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onSelect(lat, lng);
    },
  });
  return position ? (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

/* ---------- field definitions ---------- */
const fieldList = [
  { key: 'latitude', label: 'Latitude' },
  { key: 'longitude', label: 'Longitude' },
  { key: 'temperature', label: 'Temperature (°C)' },
  { key: 'humidity', label: 'Humidity (%)' },
  { key: 'wind_speed', label: 'Wind Speed (m/s)' },
  { key: 'precipitation', label: 'Precipitation (mm)' },
  { key: 'elevation', label: 'Elevation (m)' },
  { key: 'vpd', label: 'Vapor Pressure Deficit (VPD, kPa) - Auto-calculated' },
];

/* ====================================== */
/* main component                         */
export default function Predict() {
  const [location, setLocation] = useState(null);
  const [params, setParams] = useState(Object.fromEntries(fieldList.map(f => [f.key, ''])));
  const [loadingData, setLoadingData] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const allFilled = fieldList.every(({ key }) => {
    const val = params[key];
    return val !== '' && !isNaN(parseFloat(val));
  });

  /* -------- live fetch on map click -------- */
  const handleMapClick = async (lat, lon) => {
    setLocation({ lat, lon });
    setParams(prev => ({ ...prev, latitude: lat.toFixed(4), longitude: lon.toFixed(4) }));
    setResult(null);
    setError('');
    setLoadingData(true);
    try {
      /* Fetch weather and elevation from backend */
      const { data: weatherData } = await axios.get(`${API_BASE_URL}/fetch-weather-data`, {
        params: { lat, lon }
      });

      /* VPD calculation */
      const temp = weatherData.temperature;
      const humidity = weatherData.humidity;
      const svp = 0.6108 * Math.exp((17.27 * temp) / (temp + 237.3));
      const vpd = svp * (1 - humidity / 100);

      setParams({
        latitude: lat.toFixed(4),
        longitude: lon.toFixed(4),
        temperature: weatherData.temperature.toFixed(2),
        humidity: weatherData.humidity.toFixed(2),
        wind_speed: weatherData.wind_speed.toFixed(2),
        precipitation: weatherData.precipitation.toFixed(2),
        elevation: weatherData.elevation.toFixed(2),
        vpd: vpd.toFixed(3),
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.response?.data?.detail || 'Failed to fetch weather data. Please try again or enter values manually.');
    } finally {
      setLoadingData(false);
    }
  };

  /* ---------- manual input change ---------- */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setParams(prev => {
      const next = { ...prev, [name]: value };
      
      // If temperature or humidity changes, automatically recalculate VPD in real-time
      if (name === 'temperature' || name === 'humidity') {
        const temp = parseFloat(next.temperature);
        const humidity = parseFloat(next.humidity);
        if (!isNaN(temp) && !isNaN(humidity)) {
          const svp = 0.6108 * Math.exp((17.27 * temp) / (temp + 237.3));
          const vpd = Math.max(0, svp * (1 - humidity / 100));
          next.vpd = vpd.toFixed(3);
        } else {
          next.vpd = '';
        }
      }
      return next;
    });
  };

  /* ---------- prediction request ---------- */
  const handlePredict = async () => {
    // Validate all required fields
    const missing = fieldList.filter(({ key }) => params[key] === '' || isNaN(parseFloat(params[key])));
    if (missing.length > 0) {
      setError('Please fill all input parameters before predicting.');
      return;
    }
    const lat = parseFloat(params.latitude);
    const lon = parseFloat(params.longitude);

    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid latitude and longitude values.');
      return;
    }

    setPredicting(true);
    setError('');
    setResult(null);
    try {
      //  CREATE PAYLOAD - Convert form data to numbers
      const payload = {
        latitude: +params.latitude,
        longitude: +params.longitude,
        temperature: +params.temperature,
        humidity: +params.humidity,
        wind_speed: +params.wind_speed,
        precipitation: +params.precipitation,
        elevation: +params.elevation,
        vpd: +params.vpd,
      };
      const { data } = await axios.post(`${API_BASE_URL}/predict-manual`, payload);
      setResult(data); //for storing data in state // data = {fire_occurred, risk_level, probability, risk_message, ...}
    } catch (err) {
      console.error(err);
      setError('Prediction failed.');
    } finally {
      setPredicting(false);
    }
  };

  /* ---------- reset all to initial ---------- */
  const resetAll = () => {
    setLocation(null);
    setParams(Object.fromEntries(fieldList.map(f => [f.key, ''])));
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AlertBanner />
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-700 text-slate-900">Fire Risk Assessment</h1>
          <p className="text-slate-600 mt-1">Predict wildfire risk for any location in Nepal using environmental parameters.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interactive Map */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-700 text-slate-900 mb-4">Step 1: Select Location</h2>
          <p className="text-slate-600 text-sm mb-4">Click on the map to auto-fill coordinates and fetch live weather data.</p>
          <div className="h-96 rounded-card overflow-hidden shadow-md">
            <MapContainer
              center={[28.3949, 84.1240]}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationMarker onSelect={handleMapClick} />
            </MapContainer>
          </div>
          <p className="text-xs text-slate-600 mt-3">💡 OpenStreetMap • OpenWeatherMap API</p>
        </div>

        {/* Form and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-2xl font-700 text-slate-900 mb-6">Step 2: Environment Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fieldList.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-600 text-slate-900 mb-1.5">{label}</label>
                  <input
                    name={key}
                    type="number"
                    step="any"
                    value={params[key]}
                    onChange={handleInput}
                    readOnly={key === 'vpd'}
                    className={`w-full px-4 py-2.5 border rounded-button outline-none transition-all duration-200 ${
                      key === 'vpd' 
                        ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed focus:border-slate-200 focus:ring-0' 
                        : 'border-slate-300 focus:border-forest-500 focus:ring-2 focus:ring-forest-200 bg-white'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handlePredict} disabled={predicting || !allFilled} className="flex-1 btn-primary">
                {predicting ? 'Analyzing...' : 'Predict Fire Risk'}
              </button>
              <button onClick={resetAll} className="btn-secondary">Clear</button>
            </div>
          </div>

          <div>
            {location ? (
              <div className="card p-6">
                <h3 className="text-lg font-700 text-slate-900 mb-4">Selected Location</h3>
                <div className="bg-sky-50 border border-sky-200 rounded-card p-4">
                  <p className="text-sm text-sky-900 font-600">Coordinates</p>
                  <p className="font-mono text-sm mt-2 text-sky-900">{location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°</p>
                </div>
              </div>
            ) : (
              <div className="card p-6 bg-slate-50 border-dashed border-2 border-slate-300">
                <p className="text-slate-600 text-center py-8">Click on the map to select a location</p>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className={`card p-8 border-l-4 ${result.risk_level === 'High' ? 'border-l-fire-600' : result.risk_level === 'Moderate' ? 'border-l-warning-600' : 'border-l-forest-600'}`}>
            <h2 className="text-3xl font-700 text-slate-900 mb-6">Assessment Results</h2>
            <div className="mb-8">
              <p className="text-slate-700 text-sm font-600 mb-2">Risk Classification</p>
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-card font-bold text-lg ${result.risk_level === 'High' ? 'bg-fire-100 text-fire-800 border border-fire-300' : result.risk_level === 'Moderate' ? 'bg-warning-100 text-warning-800 border border-warning-300' : 'bg-forest-100 text-forest-800 border border-forest-300'}`}>
                <span className="text-2xl">{result.risk_level === 'High' ? '🔴' : result.risk_level === 'Moderate' ? '🟠' : '🟢'}</span>
                <span>{result.risk_level} Risk</span>
              </div>
            </div>
            <div className="mb-8 p-6 bg-white rounded-card border border-slate-200">
              <p className="text-slate-900 font-600 mb-4">Model Confidence: {(result.probability * 100).toFixed(1)}%</p>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div className={`h-full rounded-full ${result.risk_level === 'High' ? 'bg-fire-600' : result.risk_level === 'Moderate' ? 'bg-warning-600' : 'bg-forest-600'}`} style={{ width: `${(result.probability * 100).toFixed(0)}%` }} />
              </div>
            </div>
            <div className="p-6 rounded-card mb-8 bg-white border border-slate-200">
              <h3 className="font-700 text-slate-900 mb-3">Assessment Details</h3>
              <p className="text-slate-700">{result.risk_message}</p>
            </div>
            <div className="alert-info">
              <h4 className="font-600 text-sky-900 mb-2">ℹ️ How This Works</h4>
              <p className="text-sm text-sky-900">Our ML model analyzed 8 environmental factors to create this assessment. Always follow official fire safety guidelines.</p>
            </div>
            <button onClick={resetAll} className="mt-8 btn-primary">Check Another Location</button>
          </div>
        )}

        {error && <div className="alert-fire mt-8"><strong>Error:</strong> {error}</div>}
      </div>

      {predicting && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-9999">
          <div className="bg-white rounded-card p-8 text-center shadow-xl max-w-sm">
            <p className="text-lg font-semibold text-slate-900">Analyzing Data...</p>
          </div>
        </div>
      )}
    </div>
  );
}
