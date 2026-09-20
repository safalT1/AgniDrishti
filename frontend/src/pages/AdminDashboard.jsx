import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";
import {
  fetchAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../config/adminApi";

export default function AdminDashboard() {
  const { logout, userName } = useAuth();
  const [view, setView] = useState("alerts");

  // Alerts
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({ title: "", message: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editedAlert, setEditedAlert] = useState({});
  const [editingAlertId, setEditingAlertId] = useState(null);

  // Messages
  const [messages, setMessages] = useState([]);
  const [replyingId, setReplyingId] = useState(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");

  // Reports
  const [reports, setReports] = useState([]);

  // Fire Risk Scan State
  const [scanLoading, setScanLoading] = useState(false);
  const [highRiskDistricts, setHighRiskDistricts] = useState([]);
  const [scanError, setScanError] = useState("");
  const [alertsError, setAlertsError] = useState("");
  const [alertsLoading, setAlertsLoading] = useState(false);

  useEffect(() => {
    loadAlerts();
    loadMessages();
    loadReports();
  }, []);

  const loadAlerts = () => {
    setAlertsLoading(true);
    setAlertsError("");
    const token = localStorage.getItem("adminToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return axios.get(`${API_BASE_URL}/admin/alerts`, { headers })
      .then((res) => {
        setAlerts(res.data || []);
        setAlertsError("");
      })
      .catch((error) => {
        console.error("Failed to load alerts:", error);
        setAlertsError(error.response?.data?.detail || "Failed to load alerts");
        // Fallback to public alerts if admin endpoint fails
        axios.get(`${API_BASE_URL}/admin/public/alerts`)
          .then((res) => setAlerts(res.data || []))
          .catch(() => setAlerts([]));
      })
      .finally(() => setAlertsLoading(false));
  };

  const loadMessages = () =>
    axios
      .get(`${API_BASE_URL}/messages`)
      .then((res) => setMessages(res.data))
      .catch(console.error);

  const loadReports = () =>
    axios
      .get(`${API_BASE_URL}/reports`)
      .then((res) => setReports(res.data))
      .catch(console.error);

  // Alert CRUD
  const handleCreate = async () => {
    if (!newAlert.forest || !newAlert.district || !newAlert.message)
      return alert("Forest name, district, and message are required");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You must be logged in as admin to create alerts");
      return;
    }

    const alertData = {
      title: `Forest Fire Alert: ${newAlert.forest}`,
      message: newAlert.message,
      forest: newAlert.forest,
      district: newAlert.district,
      province: newAlert.province || "Unknown",
      location_details: newAlert.location_details || "Nepal",
      latitude: newAlert.latitude ?? null,
      longitude: newAlert.longitude ?? null,
      risk_level: newAlert.risk_level || "Moderate",
      severity: (newAlert.risk_level || "Moderate").toLowerCase(),
      duration_days: newAlert.duration_days || 3,
      weather_data: {
        temperature: newAlert.temperature || 25,
        humidity: newAlert.humidity || 60,
        wind_speed: 10,
        precipitation: 0
      },
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/admin/alerts`, alertData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts([...alerts, res.data]);
      setNewAlert({ title: "", message: "" });
      setEditingAlertId(null);
      alert("Forest fire alert created successfully!");
    } catch (error) {
      console.error("Create alert error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Failed to create alert";
      alert(`Failed to create alert: ${errorMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this alert?")) return;
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You must be logged in to delete alerts");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/admin/alerts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(alerts.filter((a) => a.id !== id));
      alert("Alert deleted successfully");
    } catch (error) {
      console.error("Delete alert error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Failed to delete alert";
      alert(`Failed to delete alert: ${errorMsg}`);
    }
  };

  const startEdit = (i) => {
    setEditIndex(i);
    setEditedAlert({ ...alerts[i] });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedAlert({});
  };

  const saveEdit = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You must be logged in to edit alerts");
      return;
    }
    try {
      const res = await axios.put(`${API_BASE_URL}/admin/alerts/${id}`, {
        title: editedAlert.title,
        message: editedAlert.message,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updated = [...alerts];
      updated[editIndex] = res.data;
      setAlerts(updated);
      cancelEdit();
      alert("Alert updated successfully");
    } catch (error) {
      console.error("Update alert error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Failed to update alert";
      alert(`Failed to update alert: ${errorMsg}`);
    }
  };

  // Edit in form: prefill manual form for an existing alert
  const editInForm = (alert) => {
    setView("alerts");
    setEditingAlertId(alert.id);
    setNewAlert({
      forest: alert.forest || "",
      district: alert.district || "",
      province: alert.province || "",
      location_details: alert.location_details || "",
      latitude: alert.latitude ?? "",
      longitude: alert.longitude ?? "",
      temperature: alert.weather_data?.temperature || "",
      humidity: alert.weather_data?.humidity || "",
      risk_level: alert.risk_level || "Moderate",
      duration_days: 3,
      message: alert.message || "",
    });
  };

  const saveFormEdit = async () => {
    if (!editingAlertId) return;
    
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You must be logged in to update alerts");
      return;
    }

    try {
      const payload = {
        title: `Forest Fire Alert: ${newAlert.forest}`,
        message: newAlert.message,
        forest: newAlert.forest,
        district: newAlert.district,
        province: newAlert.province,
        location_details: newAlert.location_details,
        latitude: newAlert.latitude,
        longitude: newAlert.longitude,
        risk_level: newAlert.risk_level,
        severity: (newAlert.risk_level || "Moderate").toLowerCase(),
        duration_days: newAlert.duration_days,
        weather_data: {
          temperature: newAlert.temperature,
          humidity: newAlert.humidity,
          wind_speed: 10,
          precipitation: 0,
        },
      };
      const res = await axios.put(`${API_BASE_URL}/admin/alerts/${editingAlertId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts((prev) => prev.map((a) => (a.id === editingAlertId ? res.data : a)));
      setEditingAlertId(null);
      setNewAlert({ title: "", message: "" });
      alert("Alert updated successfully");
    } catch (error) {
      console.error("Update alert error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Failed to update alert";
      alert(`Failed to update alert: ${errorMsg}`);
    }
  };

  // Prefill the manual create form from a scanned item
  const prefillFromScan = (item) => {
    setView("alerts");
    setNewAlert({
      forest: item.forest || item.district || "",
      district: item.district || "",
      province: item.province || "",
      location_details: item.location_details || "",
      latitude: item.latitude ?? "",
      longitude: item.longitude ?? "",
      temperature: item.weather_data?.temperature || item.details?.temperature || "",
      humidity: item.weather_data?.humidity || item.details?.humidity || "",
      risk_level: item.fire_risk || "Moderate",
      duration_days: 3,
      message: `High forest fire risk detected in ${item.district || item.forest}. Avoid open flames and report smoke immediately.`,
    });
  };

  // Status helpers


  // Reply to user messages
  const sendReply = async (email) => {
    if (!replySubject || !replyBody) return alert("Fill subject & body");
    try {
      await axios.post(
        `${API_BASE_URL}/admin/reply`,
        {
          to_email: email,
          subject: replySubject,
          message: replyBody,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      alert("Reply sent");
      setReplyingId(null);
      setReplySubject("");
      setReplyBody("");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  // Reply to fire reports
  const sendReportReply = async (reportId) => {
    if (!replySubject || !replyBody) return alert("Fill subject & body");
    const token = localStorage.getItem("adminToken");
    if (!token) return alert("You must be logged in as admin");
    try {
      await axios.post(
        `${API_BASE_URL}/admin/reply-report`,
        {
          report_id: reportId,
          subject: replySubject,
          message: replyBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reply sent successfully to reporter");
      setReplyingId(null);
      setReplySubject("");
      setReplyBody("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to send reply to reporter");
    }
  };

  // Update report resolution status
  const handleResolve = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/reports/${id}/resolve`, {
        resolved: newStatus,
      });
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, resolved: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update report status.");
    }
  };

  // Run full Nepal scan
  const handleScan = async () => {
    setScanLoading(true);
    setScanError("");
    setHighRiskDistricts([]);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/admin/test-scan-nepal`,
        {}
      );
      setHighRiskDistricts(data.high_risk_districts || []);
    } catch (err) {
      setScanError("Scan failed. See console for details.");
      console.error(err);
    }
    setScanLoading(false);
  };

  // Logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-700 text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Welcome{userName ? `, ${userName}` : ''} • Manage forest fire alerts and user reports
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-danger"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Tabs */}
        <div className="flex gap-3 mb-8 border-b border-slate-200 pb-4">
          {[
            { id: 'alerts', label: 'Fire Alerts', icon: '🔥' },
            { id: 'messages', label: 'Messages', icon: '💬' },
            { id: 'reports', label: 'Fire Reports', icon: '📍' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`px-4 py-2.5 rounded-button font-medium transition-all duration-200 ${
                view === tab.id
                  ? 'bg-forest-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Fire Risk Management */}
        {view === 'alerts' && (
          <>
            <div className="card p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-700 text-slate-900">Forest Fire Risk Scan</h2>
                  <p className="text-slate-600 text-sm mt-1">Scan Nepal's forests for high-risk areas and create alerts</p>
                </div>
              </div>
              
              <button
                onClick={handleScan}
                disabled={scanLoading}
                className={`btn-primary mb-4 ${scanLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {scanLoading ? 'Scanning Forests...' : 'Scan Nepal Forests'}
              </button>

              {scanError && (
                <div className="alert-fire mb-4">
                  <strong>Error:</strong> {scanError}
                </div>
              )}

              {highRiskDistricts.length > 0 && (
                <div className="bg-warning-50 border border-warning-200 rounded-card p-4 mb-4">
                  <p className="text-warning-900 text-sm">
                    <strong>✓ Assessment Complete:</strong> {highRiskDistricts.length} high-risk forest area(s) detected. Click "Use in Form" to prefill the alert form below.
                  </p>
                </div>
              )}

              {highRiskDistricts.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-3 font-600 text-slate-900">Forest Name</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900">District</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900">Province</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900">Temp</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900">Humidity</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900">Risk Level</th>
                        <th className="text-left py-3 px-3 font-600 text-slate-900"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {highRiskDistricts.map((d, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 font-500 text-slate-900">{d.forest || d.district}</td>
                          <td className="py-3 px-3 text-slate-700">{d.district}</td>
                          <td className="py-3 px-3 text-slate-700">{d.province}</td>
                          <td className="py-3 px-3 text-slate-700">{d.weather_data?.temperature || d.details?.temperature}°C</td>
                          <td className="py-3 px-3 text-slate-700">{d.weather_data?.humidity || d.details?.humidity}%</td>
                          <td className="py-3 px-3">
                            <span className={`badge-small font-600 ${
                              d.fire_risk === 'High' ? 'badge-fire' :
                              d.fire_risk === 'Moderate' ? 'badge-warning' :
                              'badge-forest'
                            }`}>
                              {d.fire_risk} Risk
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => prefillFromScan(d)}
                              className="text-sm px-3 py-1.5 bg-forest-100 text-forest-700 hover:bg-forest-200 rounded-button font-medium transition-colors"
                            >
                              Use in Form
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Create/Edit Alert Form */}
        {view === 'alerts' && (
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-700 text-slate-900 mb-6">
              {editingAlertId ? '✏️ Edit Forest Fire Alert' : '➕ Create Manual Alert'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                placeholder="Forest Name (e.g., Chitwan National Park)"
                value={newAlert.forest || ""}
                onChange={(e) => setNewAlert({ ...newAlert, forest: e.target.value })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                placeholder="District (e.g., Chitwan)"
                value={newAlert.district || ""}
                onChange={(e) => setNewAlert({ ...newAlert, district: e.target.value })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                placeholder="Province (e.g., Bagmati)"
                value={newAlert.province || ""}
                onChange={(e) => setNewAlert({ ...newAlert, province: e.target.value })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                placeholder="Location Details"
                value={newAlert.location_details || ""}
                onChange={(e) => setNewAlert({ ...newAlert, location_details: e.target.value })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={newAlert.latitude || ""}
                onChange={(e) => setNewAlert({ ...newAlert, latitude: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={newAlert.longitude || ""}
                onChange={(e) => setNewAlert({ ...newAlert, longitude: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Temperature (°C)"
                value={newAlert.temperature || ""}
                onChange={(e) => setNewAlert({ ...newAlert, temperature: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Humidity (%)"
                value={newAlert.humidity || ""}
                onChange={(e) => setNewAlert({ ...newAlert, humidity: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
              <select
                value={newAlert.risk_level || "Moderate"}
                onChange={(e) => setNewAlert({ ...newAlert, risk_level: e.target.value })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
              </select>
              <input
                type="number"
                min="1"
                max="30"
                placeholder="Duration (days)"
                value={newAlert.duration_days || 3}
                onChange={(e) => setNewAlert({ ...newAlert, duration_days: parseInt(e.target.value) || 3 })}
                className="px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none"
              />
            </div>

            <textarea
              placeholder="Alert Message / Precautions (e.g., High fire risk due to dry conditions. Avoid open flames, report any smoke immediately.)"
              value={newAlert.message || ""}
              onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-button focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none resize-none"
              rows="4"
            />

            <div className="flex gap-3 mt-6">
              {!editingAlertId ? (
                <button onClick={handleCreate} className="btn-danger">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Forest Fire Alert
                </button>
              ) : (
                <>
                  <button onClick={saveFormEdit} className="btn-primary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditingAlertId(null);
                      setNewAlert({ title: "", message: "" });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Existing Alerts List */}
        {view === 'alerts' && (
          <div>
            <h2 className="text-2xl font-700 text-slate-900 mb-6">Active Forest Fire Alerts</h2>
            {alerts.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-slate-600">No active alerts. Create one above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <div key={alert.id} className={`card p-6 border-l-4 ${
                    alert.risk_level === 'High' ? 'border-l-fire-600' :
                    alert.risk_level === 'Moderate' ? 'border-l-warning-600' :
                    'border-l-forest-600'
                  }`}>
                    {editIndex === i ? (
                      <div className="space-y-4">
                        <input
                          value={editedAlert.title || ''}
                          onChange={(e) => setEditedAlert({ ...editedAlert, title: e.target.value })}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-button"
                        />
                        <textarea
                          value={editedAlert.message || ''}
                          onChange={(e) => setEditedAlert({ ...editedAlert, message: e.target.value })}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-button"
                          rows="3"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(alert.id)} className="btn-primary btn-sm">Save</button>
                          <button onClick={cancelEdit} className="btn-secondary btn-sm">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className={`text-lg font-600 ${
                              alert.risk_level === 'High' ? 'text-fire-700' :
                              alert.risk_level === 'Moderate' ? 'text-warning-700' :
                              'text-forest-700'
                            }`}>
                              {alert.title}
                            </h3>
                            <div className="text-sm text-slate-600 mt-2 space-y-1">
                              {alert.forest && <span>📍 Forest: <strong>{alert.forest}</strong></span>}
                              {alert.district && <span> | District: <strong>{alert.district}</strong></span>}
                              {alert.province && <span> | Province: <strong>{alert.province}</strong></span>}
                              <div className="mt-2">
                                <span className={`badge-small ${
                                  alert.risk_level === 'High' ? 'badge-fire' :
                                  alert.risk_level === 'Moderate' ? 'badge-warning' :
                                  'badge-forest'
                                }`}>
                                  {alert.risk_level} Risk
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(i)}
                              className="px-3 py-1.5 text-sm bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-button font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => editInForm(alert)}
                              className="px-3 py-1.5 text-sm bg-warning-100 text-warning-700 hover:bg-warning-200 rounded-button font-medium transition-colors"
                            >
                              Edit Full
                            </button>
                            <button
                              onClick={() => handleDelete(alert.id)}
                              className="px-3 py-1.5 text-sm bg-fire-100 text-fire-700 hover:bg-fire-200 rounded-button font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{alert.message}</p>
                        {alert.weather_data && (
                          <div className="mt-3 text-xs text-slate-600 bg-slate-50 rounded p-2">
                            🌡️ {alert.weather_data.temperature}°C • 💧 {alert.weather_data.humidity}% humidity
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Messages Panel */}
        {view === 'messages' && (
          <div>
            <h2 className="text-2xl font-700 text-slate-900 mb-6">User Messages ({messages.length})</h2>
            {messages.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-slate-600">No user messages yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="card p-6 border-l-4 border-l-sky-500">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-600 text-slate-900">{msg.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          <a href={`mailto:${msg.email}`} className="text-forest-600 hover:text-forest-700 font-500">
                            {msg.email}
                          </a>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {replyingId !== msg.id && (
                          <button
                            onClick={() => setReplyingId(msg.id)}
                            className="px-3 py-1.5 text-sm bg-forest-100 text-forest-700 hover:bg-forest-200 rounded-button font-medium transition-colors"
                          >
                            Reply
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            if (!confirm('Delete this message?')) return;
                            await axios.delete(`${API_BASE_URL}/messages/${msg.id}`);
                            setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                          }}
                          className="px-3 py-1.5 text-sm bg-fire-100 text-fire-700 hover:bg-fire-200 rounded-button font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-slate-600"><strong>Subject:</strong> {msg.subject}</p>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-4">{msg.message}</p>

                    {replyingId === msg.id && (
                      <div className="bg-slate-50 rounded p-4 space-y-3 mt-4">
                        <input
                          placeholder="Reply Subject"
                          value={replySubject}
                          onChange={(e) => setReplySubject(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-button"
                        />
                        <textarea
                          placeholder="Reply Message"
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-button resize-none"
                          rows="4"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => sendReply(msg.email)} className="btn-primary">Send Reply</button>
                          <button onClick={() => setReplyingId(null)} className="btn-secondary">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fire Reports Panel */}
        {view === 'reports' && (
          <div>
            <h2 className="text-2xl font-700 text-slate-900 mb-6">Wildfire Reports ({reports.length})</h2>
            {reports.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-slate-600">No fire reports submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((r) => (
                  <div key={r.id} className={`card p-6 border-l-4 ${r.resolved ? 'border-l-slate-400 opacity-75' : 'border-l-fire-600'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-600 text-slate-900">{r.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          <a href={`mailto:${r.email}`} className="text-forest-600 hover:text-forest-700 font-500">
                            {r.email}
                          </a>
                        </p>
                        <p className="text-sm text-slate-600 mt-1">Reported: <strong>{r.fire_date}</strong></p>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <button
                          onClick={() => handleResolve(r.id, !r.resolved)}
                          className={`px-3 py-1.5 text-sm rounded-button font-medium transition-colors ${
                            r.resolved
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-warning-100 text-warning-700 hover:bg-warning-200'
                          }`}
                        >
                          {r.resolved ? '✓ Resolved' : 'Mark Resolved'}
                        </button>
                        {r.resolved && (
                          <button
                            onClick={async () => {
                              if (!confirm('Delete this resolved report?')) return;
                              await axios.delete(`${API_BASE_URL}/reports/${r.id}`);
                              setReports((prev) => prev.filter((x) => x.id !== r.id));
                            }}
                            className="px-3 py-1.5 text-sm bg-fire-100 text-fire-700 hover:bg-fire-200 rounded-button font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-slate-600">Province</p>
                        <p className="font-500 text-slate-900">{r.province}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">District</p>
                        <p className="font-500 text-slate-900">{r.district}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-slate-600">Location</p>
                        <p className="font-500 text-slate-900">{r.location_details}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-slate-600 text-sm">Description</p>
                      <p className="text-slate-700 leading-relaxed">{r.description}</p>
                    </div>

                    {replyingId === r.id ? (
                      <div className="bg-slate-50 rounded p-4 space-y-3 mt-4">
                        <input
                          placeholder="Reply Subject"
                          value={replySubject}
                          onChange={(e) => setReplySubject(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-button"
                        />
                        <textarea
                          placeholder="Reply Message"
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-button resize-none"
                          rows="4"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => sendReportReply(r.id)} className="btn-primary">Send Reply</button>
                          <button onClick={() => setReplyingId(null)} className="btn-secondary">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingId(r.id)}
                        className="mt-4 px-3 py-1.5 text-sm bg-forest-100 text-forest-700 hover:bg-forest-200 rounded-button font-medium transition-colors"
                      >
                        Reply to Reporter
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
