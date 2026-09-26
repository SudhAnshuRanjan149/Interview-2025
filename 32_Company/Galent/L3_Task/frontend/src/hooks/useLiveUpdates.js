import { useEffect, useRef, useState } from 'react';

const WS_BASE = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8002';
const TOKEN = 'dev-dashboard-token';
const RECONNECT_DELAY = 3000;

export function useLiveUpdates(onAlert, depotFilter = null) {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const reconnectTimer = useRef(null);

  const connect = () => {
    const url = `${WS_BASE}/ws/live-updates?token=${TOKEN}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setReconnecting(false);
      // Subscribe with optional depot filter
      ws.send(JSON.stringify({
        type: 'SUBSCRIBE',
        filter: depotFilter ? { depot_id: depotFilter } : {},
      }));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'PING') {
          ws.send(JSON.stringify({ type: 'PONG' }));
          return;
        }
        if (msg.type === 'ALERT_CREATED' || msg.type === 'ALERT_UPDATED') {
          onAlert?.(msg);
        }
      } catch {
        // ignore parse errors
      }
    };

    ws.onclose = () => {
      setConnected(false);
      if (wsRef.current === ws) {
        setReconnecting(true);
        reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY);
      }
    };

    ws.onerror = () => ws.close();
  };

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        const ws = wsRef.current;
        wsRef.current = null;
        ws.close();
      }
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, [depotFilter]);

  return { connected, reconnecting };
}
