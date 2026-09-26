import React, { useState } from 'react';
import { fleetApi } from '../../api/fleetApi';

function formatTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
}

function AlertCard({ alert, onStatusUpdate, isNew }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleUpdateStatus = async (status) => {
    setUpdating(true);
    try {
      await onStatusUpdate(alert.id, status);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      className={`alert-card severity-${alert.severity} ${isNew ? 'alert-new' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="alert-card-header">
        <div className="alert-card-meta">
          <span className="alert-vehicle">🚐 {alert.vehicle_id}</span>
          <span className="alert-rule">{alert.rule_name.replace(/_/g, ' ')}</span>
          {alert.depot_id && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {alert.depot_id}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <span className={`badge badge-${alert.severity}`}>{alert.severity}</span>
          <span className={`badge badge-${alert.status}`}>{alert.status}</span>
          <span className={`badge badge-${alert.parts_status}`}>{alert.parts_status}</span>
        </div>
      </div>

      {alert.recommendation && (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          💡 {alert.recommendation}
        </div>
      )}

      <div className="alert-time" style={{ marginTop: 6 }}>
        {formatTime(alert.created_at)}
      </div>

      {expanded && (
        <>
          <div className="alert-evidence">
            {JSON.stringify(alert.evidence, null, 2)}
          </div>
          <div className="alert-actions" onClick={(e) => e.stopPropagation()}>
            {alert.status === 'OPEN' && (
              <button
                className="btn btn-ghost"
                onClick={() => handleUpdateStatus('ACKNOWLEDGED')}
                disabled={updating}
              >
                ✓ Acknowledge
              </button>
            )}
            {alert.status !== 'RESOLVED' && (
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateStatus('RESOLVED')}
                disabled={updating}
              >
                ✔ Resolve
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function AlertsList({ filters, newAlerts = [], onRefresh }) {
  const [alerts, setAlerts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [newAlertIds, setNewAlertIds] = React.useState(new Set());

  const PAGE_SIZE = 20;

  const loadAlerts = React.useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await fleetApi.getAlerts({ ...filters, page: p, page_size: PAGE_SIZE });
      setAlerts(data.items || []);
      setTotal(data.total || 0);
      setPage(p);
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  React.useEffect(() => { loadAlerts(1); }, [loadAlerts]);

  // Inject new real-time alerts at the top
  React.useEffect(() => {
    if (newAlerts.length === 0) return;
    const latest = newAlerts[newAlerts.length - 1];
    if (!latest?.payload?.alert_id) return;

    const id = latest.payload.alert_id;
    setNewAlertIds((s) => new Set([...s, id]));

    // Re-fetch page 1 to get the full alert
    loadAlerts(1);
  }, [newAlerts, loadAlerts]);

  const handleStatusUpdate = async (alertId, status) => {
    await fleetApi.updateAlertStatus(alertId, status);
    await loadAlerts(page);
    onRefresh?.();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading && alerts.length === 0) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        Loading alerts…
      </div>
    );
  }

  if (!loading && alerts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✅</div>
        <div>No alerts found</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="card-title" style={{ marginBottom: 0 }}>
          Maintenance Alerts ({total})
        </div>
        <button className="btn btn-ghost" onClick={() => loadAlerts(page)}>
          🔄 Refresh
        </button>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onStatusUpdate={handleStatusUpdate}
            isNew={newAlertIds.has(alert.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: 20 }}>
          <button
            className="btn btn-ghost"
            onClick={() => loadAlerts(page - 1)}
            disabled={page <= 1}
          >
            ← Prev
          </button>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-ghost"
            onClick={() => loadAlerts(page + 1)}
            disabled={page >= totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
