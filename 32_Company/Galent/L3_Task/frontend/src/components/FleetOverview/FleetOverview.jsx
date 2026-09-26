import React from 'react';

const SEVERITY_COLORS = {
  CRITICAL: 'var(--severity-critical)',
  HIGH: 'var(--severity-high)',
  MEDIUM: 'var(--severity-medium)',
  LOW: 'var(--severity-low)',
};

export default function FleetOverview({ health, loading }) {
  if (loading) {
    return (
      <div className="summary-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="summary-card" style={{ minHeight: 100 }}>
            <div className="loading-spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  if (!health) return null;

  const cards = [
    { label: 'Total Vehicles', value: health.total_vehicles ?? '—', icon: '🚐', color: 'var(--accent-blue)' },
    { label: 'At Risk', value: health.at_risk ?? '—', icon: '⚠️', color: 'var(--severity-medium)' },
    { label: 'Critical Alerts', value: health.critical ?? '—', icon: '🚨', color: 'var(--severity-critical)' },
    { label: 'Healthy', value: health.healthy ?? '—', icon: '✅', color: 'var(--severity-ok)' },
  ];

  return (
    <div>
      <div className="card-title">Fleet Health Overview</div>
      <div className="summary-grid">
        {cards.map((card) => (
          <div
            key={card.label}
            className="summary-card"
            style={{ '--accent-color': card.color }}
          >
            <span className="summary-icon">{card.icon}</span>
            <div className="summary-label">{card.label}</div>
            <div className="summary-value" style={{ color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {health.high_risk_vehicles?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="card-title" style={{ marginBottom: 10 }}>High Risk Vehicles</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {health.high_risk_vehicles.map((v) => (
              <div
                key={v.vehicle_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 16px',
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid ${SEVERITY_COLORS[v.severity] || 'var(--border)'}`,
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{v.vehicle_id}</span>
                  <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                    {v.depot_id}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge badge-${v.severity}`}>{v.severity}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {v.active_alerts} alert{v.active_alerts !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
