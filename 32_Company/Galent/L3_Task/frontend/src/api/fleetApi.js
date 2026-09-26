const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8002';
const TOKEN = 'dev-dashboard-token';

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`,
});

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: headers(), ...options });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const fleetApi = {
  getHealth: () => request('/fleet/health'),
  getFleetSummary: (depotId) => request(`/fleet/summary?depot_id=${depotId}`),
  getAlerts: (params = {}) => {
    const q = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return request(`/alerts${q ? '?' + q : ''}`);
  },
  getAlert: (id) => request(`/alerts/${id}`),
  updateAlertStatus: (id, status) =>
    request(`/alerts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getVehicleHistory: (vehicleId) => request(`/vehicles/${vehicleId}/history`),
  getDepots: () => request('/depots'),
};
