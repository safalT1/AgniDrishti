const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

export async function fetchAlerts() {
  try {
    const res = await fetch(`${API}/admin/alerts`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("fetchAlerts error:", error);
    throw error;
  }
}

export async function createAlert(alert) {
  try {
    const res = await fetch(`${API}/admin/alerts`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(alert),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("createAlert error:", error);
    throw error;
  }
}

export async function updateAlert(id, data) {
  try {
    const res = await fetch(`${API}/admin/alerts/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("updateAlert error:", error);
    throw error;
  }
}

export async function deleteAlert(id) {
  try {
    const res = await fetch(`${API}/admin/alerts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("deleteAlert error:", error);
    throw error;
  }
}
