import React, { useCallback, useEffect, useState } from 'react';
import { fleetApi } from '../../api/fleetApi';

export default function VehiclePanel({ vehicleId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vehicleId) return;
    setLoading(true);
    fleetApi.getVehicleHistory(vehicleId)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [vehicleId]);

  if (!vehicleId) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 64, right: 0, bottom: 0,
      width: 420,
      background: 'var(--bg-secondary)',
      borderLeft: '1px solid var(--border)',
      zIndex: 200,
      overflow: 'auto',
      padding: 24,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>🚐 {vehicleId}</h2>
        <button className="btn btn-ghost" onClick={onClose}>✕ Close</button>
      </div>

      {loading && (
        <div className="loading">
          <div className="loading-spinner" />
          Loading vehicle history…
        </div>
      )}

      {!loading && data && (
        <>
          <div className="card-title">Recent Telemetry ({data.telemetry_readings?.length || 0})</div>
          <div style={{ marginBottom: 24 }}>
            {data.telemetry_readings?.slice(0, 5).map((r, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginBottom: 8,
                fontSize: 13,
                borderLeft: r.engine_temp_c > 105
                  ? '3px solid var(--severity-critical)'
                  : '3px solid var(--border)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {new Date(r.ts).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                  {r.late_arrival && (
                    <span style={{ color: 'var(--severity-medium)', fontSize: 11 }}>⚠ Late</span>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', color: 'var(--text-secondary)' }}>
                  {r.engine_temp_c != null && (
                    <span>🌡 {r.engine_temp_c}°C</span>
                  )}
                  {r.battery_voltage != null && (
                    <span>🔋 {r.battery_voltage}V</span>
                  )}
                  {r.odometer_km != null && (
                    <span>📍 {r.odometer_km?.toLocaleString()} km</span>
                  )}
                  {r.dtc_codes?.length > 0 && (
                    <span>⚠ {r.dtc_codes.join(', ')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card-title">Service History ({data.service_records?.length || 0})</div>
          {data.service_records?.slice(0, 5).map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              marginBottom: 8,
              fontSize: 13,
            }}>
              <div style={{ fontWeight: 600 }}>{s.service_type.replace(/_/g, ' ')}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
                📅 {s.service_date} &nbsp;|&nbsp; 📍 {s.odometer_km?.toLocaleString() || '—'} km
              </div>
              {s.notes && (
                <div style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 12 }}>
                  {s.notes}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
