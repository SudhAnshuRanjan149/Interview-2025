import React, { useState } from 'react';

export default function Filters({ depots, filters, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value || undefined });
  };

  return (
    <div className="filter-bar">
      <select
        id="filter-depot"
        className="filter-select"
        value={filters.depot_id || ''}
        onChange={(e) => handleChange('depot_id', e.target.value)}
      >
        <option value="">All Depots</option>
        {depots.map((d) => (
          <option key={d.depot_id} value={d.depot_id}>
            {d.name || d.depot_id}
          </option>
        ))}
      </select>

      <select
        id="filter-severity"
        className="filter-select"
        value={filters.severity || ''}
        onChange={(e) => handleChange('severity', e.target.value)}
      >
        <option value="">All Severities</option>
        <option value="CRITICAL">🔴 Critical</option>
        <option value="HIGH">🟠 High</option>
        <option value="MEDIUM">🟡 Medium</option>
        <option value="LOW">🟢 Low</option>
      </select>

      <select
        id="filter-status"
        className="filter-select"
        value={filters.status || ''}
        onChange={(e) => handleChange('status', e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="OPEN">Open</option>
        <option value="ACKNOWLEDGED">Acknowledged</option>
        <option value="RESOLVED">Resolved</option>
      </select>

      <select
        id="filter-rule"
        className="filter-select"
        value={filters.rule_name || ''}
        onChange={(e) => handleChange('rule_name', e.target.value)}
      >
        <option value="">All Rules</option>
        <option value="overheating">Overheating</option>
        <option value="repeated_fault_code">Repeated Fault Code</option>
        <option value="overdue_service">Overdue Service</option>
      </select>

      <button
        className="btn btn-ghost"
        onClick={() => onChange({})}
        title="Clear all filters"
      >
        ✕ Clear
      </button>
    </div>
  );
}
