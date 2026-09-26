import React, { useCallback, useEffect, useRef, useState } from 'react';
import AlertsList from './components/AlertsList/AlertsList';
import Filters from './components/Filters/Filters';
import FleetOverview from './components/FleetOverview/FleetOverview';
import VehiclePanel from './components/VehiclePanel/VehiclePanel';
import { fleetApi } from './api/fleetApi';
import { useLiveUpdates } from './hooks/useLiveUpdates';

export default function App() {
  const [health, setHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [depots, setDepots] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const alertsRef = useRef(null);

  const loadHealth = useCallback(async () => {
    try {
      const data = await fleetApi.getHealth();
      setHealth(data);
    } catch (err) {
      console.error('Failed to load fleet health:', err);
    } finally {
      setHealthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHealth();
    fleetApi.getDepots().then(setDepots).catch(console.error);
    const interval = setInterval(loadHealth, 30000);
    return () => clearInterval(interval);
  }, [loadHealth]);

  const handleLiveAlert = useCallback((msg) => {
    setLiveAlerts((prev) => [...prev, msg]);
    // Auto-refresh fleet health
    loadHealth();
  }, [loadHealth]);

  const { connected, reconnecting } = useLiveUpdates(
    handleLiveAlert,
    filters.depot_id || null,
  );

  const wsStatus = connected ? 'LIVE' : reconnecting ? 'Reconnecting…' : 'Disconnected';

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <span className="icon">🛠️</span>
          Fleet Maintenance Dashboard
        </div>
        <div className="header-actions">
          {selectedVehicle && (
            <button className="btn btn-ghost" onClick={() => setSelectedVehicle(null)}>
              ✕ Close panel
            </button>
          )}
          <div className="live-indicator">
            <div className={`live-dot ${!connected ? 'disconnected' : ''}`} />
            {wsStatus}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Fleet Overview */}
        <div className="card">
          <FleetOverview health={health} loading={healthLoading} />
        </div>

        {/* Filters */}
        <div className="card" style={{ padding: '14px 20px' }}>
          <Filters depots={depots} filters={filters} onChange={setFilters} />
        </div>

        {/* Alerts */}
        <div className="card" ref={alertsRef}>
          <AlertsList
            filters={filters}
            newAlerts={liveAlerts}
            onRefresh={loadHealth}
          />
        </div>
      </main>

      {/* Vehicle Panel */}
      <VehiclePanel
        vehicleId={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
}
