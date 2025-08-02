/** Game Engine Logic Cluster - Resource market */
import economy from '../schemas/economy.json';
import { PlayerData } from './types/tickTypes';

interface MarketState {
  demandIndex: Record<string, number>;
  supplyIndex: Record<string, number>;
}

const state: MarketState = { demandIndex: {}, supplyIndex: {} };

export function getMarketPrice(resourceId: string): number {
  const base = (economy as any).market.basePrice[resourceId] || 0;
  const demand = Math.min((state.demandIndex[resourceId] || 0), (economy as any).market.demandClamp);
  const supply = Math.min((state.supplyIndex[resourceId] || 0), (economy as any).market.supplyClamp);
  return base * (1 + demand - supply);
}

export interface TradeResult {
  price: number;
  fee: number;
  total: number;
}

export function executeTrade(player: PlayerData, resourceId: string, amount: number, action: 'buy' | 'sell'): TradeResult {
  const price = getMarketPrice(resourceId);
  const fee = price * amount * (economy as any).market.transactionFee;
  const total = price * amount + fee * (action === 'buy' ? 1 : -1);
  const res = player.resources as any;
  if (action === 'buy') {
    res[resourceId] -= total;
  } else {
    res[resourceId] += price * amount - fee;
  }
  return { price, fee, total };
}
