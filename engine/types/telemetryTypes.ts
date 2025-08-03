/** Game Engine Logic Cluster - Telemetry types */
export type TelemetryEventType = 'unitWin' | 'resourceGather' | 'missionComplete' | 'queueUsage';

export interface TelemetryEvent {
  timestamp: number;
  eventType: TelemetryEventType;
  payload: Record<string, any>;
}
