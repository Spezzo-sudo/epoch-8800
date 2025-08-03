import { render } from '@testing-library/react';
import React from 'react';
import * as telemetry from '../engine/telemetrySystem';
import { showBalancingDashboard } from './balancingDashboard';

test('dashboard renders charts', async () => {
  jest.spyOn(telemetry, 'fetchMetrics').mockResolvedValueOnce([{ timestamp: 0, payload: { unitId: 'u', result: 'win' } }])
    .mockResolvedValueOnce([{ timestamp: 0, payload: { depth: 1 } }])
    .mockResolvedValueOnce([{ timestamp: 0, payload: { result: 'success' } }]);
  document.body.innerHTML = '<div id="dash"></div>';
  showBalancingDashboard('dash');
  const { findByText } = render(<div id="dash" />);
  await findByText('Unit Win Rates');
});
