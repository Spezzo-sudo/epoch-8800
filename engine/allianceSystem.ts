/** Backend Cluster - Alliance system */
import { Alliance, ForumPost, EspionageReport } from './types/allianceTypes';
import { EventBus } from './eventBus';

const alliances: Record<string, Alliance> = {};

export function createAlliance(name: string, tag: string, color: string, founderId: string): Alliance {
  const allianceId = `A${Date.now()}`;
  const alliance: Alliance = {
    allianceId,
    name,
    tag,
    color,
    members: [{ playerId: founderId, role: 'leader' }],
    memberLimit: 7,
    forum: [],
    espionageReports: []
  };
  alliances[allianceId] = alliance;
  EventBus.emit('alliance_updated', { allianceId });
  return alliance;
}

export function joinAlliance(allianceId: string, playerId: string): boolean {
  const a = alliances[allianceId];
  if (!a) return false;
  if (a.members.length >= a.memberLimit) return false;
  a.members.push({ playerId, role: 'member' });
  EventBus.emit('alliance_updated', { allianceId });
  return true;
}

export function increaseMemberLimit(allianceId: string, buildingLevel: number): void {
  const a = alliances[allianceId];
  if (!a) return;
  const newLimit = Math.min(7 + buildingLevel * 1, 30);
  a.memberLimit = newLimit;
  EventBus.emit('alliance_updated', { allianceId });
}

export function postForumMessage(allianceId: string, authorId: string, content: string): ForumPost | null {
  const a = alliances[allianceId];
  if (!a) return null;
  const post: ForumPost = { postId: `P${Date.now()}`, authorId, timestamp: Date.now(), content };
  a.forum.push(post);
  EventBus.emit('forum_posted', { allianceId, postId: post.postId });
  return post;
}

export function postEspionageReport(allianceId: string, fromPlayer: string, details: Record<string, any>): EspionageReport | null {
  const a = alliances[allianceId];
  if (!a) return null;
  const report: EspionageReport = { reportId: `R${Date.now()}`, fromPlayer, timestamp: Date.now(), details };
  a.espionageReports.push(report);
  EventBus.emit('espionage_reported', { allianceId, reportId: report.reportId });
  return report;
}

export function getAllianceMapOverlay(allianceId: string): { tag: string; memberTerritories: string[] } | null {
  const a = alliances[allianceId];
  if (!a) return null;
  return { tag: a.tag, memberTerritories: [] };
}

export function _resetAlliances() { Object.keys(alliances).forEach(k => delete alliances[k]); }
