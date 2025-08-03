import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { fetchMetrics } from '../engine/telemetrySystem';
import { spacing, colors } from './designTokens';
import Phaser from 'phaser';

interface ChartDatum { [key: string]: any; }

function transformUnitWins(events: any[]): ChartDatum[] {
  const count: Record<string, number> = {};
  for (const e of events) {
    const id = e.payload.unitId;
    count[id] = (count[id] || 0) + 1;
  }
  return Object.entries(count).map(([unitId, wins]) => ({ unitId, wins }));
}

function transformQueue(events: any[]): ChartDatum[] {
  return events.map(e => ({ timestamp: e.timestamp, depth: e.payload.depth }));
}

function transformMissions(events: any[]): ChartDatum[] {
  const res = { success: 0, failure: 0 };
  for (const e of events) {
    if (e.payload.result === 'success') res.success++; else res.failure++;
  }
  return [
    { name: 'Success', value: res.success },
    { name: 'Failure', value: res.failure }
  ];
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes()}`;
}

function Dashboard() {
  const [unitData, setUnitData] = useState([] as ChartDatum[]);
  const [queueData, setQueueData] = useState([] as ChartDatum[]);
  const [missionData, setMissionData] = useState([] as ChartDatum[]);

  useEffect(() => {
    const since = Date.now() - 24 * 3600 * 1000;
    fetchMetrics('unitWin', since).then(d => setUnitData(transformUnitWins(d)));
    fetchMetrics('queueUsage', since).then(d => setQueueData(transformQueue(d)));
    fetchMetrics('missionComplete', since).then(d => setMissionData(transformMissions(d)));
  }, []);

  return (
    <div style={{ padding: spacing.md }}>
      <h2>Unit Win Rates</h2>
      <BarChart width={600} height={300} data={unitData}>
        <XAxis dataKey="unitId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="wins" name="Wins" />
      </BarChart>

      <h2>Queue Depth Over Time</h2>
      <BarChart width={600} height={300} data={queueData}>
        <XAxis dataKey="timestamp" tickFormatter={formatTime} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="depth" name="Queue Depth" />
      </BarChart>

      <h2>Mission Outcomes</h2>
      <PieChart width={400} height={300}>
        <Pie data={missionData} dataKey="value" nameKey="name" outerRadius={100}>
          {missionData.map((entry: any, index: number) => (
            <Cell key={index} fill={Object.values(colors)[index % Object.values(colors).length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export function showBalancingDashboard(containerId: string) {
  const container = document.getElementById(containerId);
  if (container) ReactDOM.render(<Dashboard />, container);
}

export class BalancingDashboard extends Phaser.Scene {
  constructor() {
    super('BalancingDashboard');
  }
  create() {
    const div = document.createElement('div');
    div.id = 'analytics-container';
    this.add.dom(400, 300, div);
    showBalancingDashboard('analytics-container');
  }
}
