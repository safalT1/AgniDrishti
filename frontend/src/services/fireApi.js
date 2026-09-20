

// Use environment variable or fallback to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchYearlyFires() {
  try {
    const res = await fetch(`${API_BASE}/fires/yearly`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching yearly fires:', error);
    throw error;
  }
}

export async function fetchMonthlyFires() {
  try {
    const res = await fetch(`${API_BASE}/fires/monthly`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching monthly fires:', error);
    throw error;
  }
}

export async function fetchConfidenceFires() {
  try {
    const res = await fetch(`${API_BASE}/fires/confidence`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching confidence fires:', error);
    throw error;
  }
}

export async function fetchTopDistricts() {
  try {
    const res = await fetch(`${API_BASE}/fires/top-districts`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching top districts:', error);
    throw error;
  }
}

export async function fetchHeatmap() {
  try {
    const res = await fetch(`${API_BASE}/fires/heatmap`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching heatmap:', error);
    throw error;
  }
}

export async function fetchGeoSample() {
  try {
    const res = await fetch(`${API_BASE}/fires/geo-sample`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching geo sample:', error);
    throw error;
  }
}

export async function fetchLiveFires(sensor = 'MODIS_NRT', days = 1) {
  try {
    const res = await fetch(`${API_BASE}/fires?sensor=${sensor}&days=${days}`);
    return await handleResponse(res);
  } catch (error) {
    console.error('Error fetching live fires:', error);
    throw error;
  }
}

