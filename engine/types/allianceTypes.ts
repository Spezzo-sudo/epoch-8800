export type AllianceRole = 'leader'|'officer'|'member';
export interface AllianceMember { playerId: string; role: AllianceRole; }
export interface ForumPost { postId: string; authorId: string; timestamp: number; content: string; }
export interface EspionageReport { reportId: string; fromPlayer: string; timestamp: number; details: Record<string, any>; }
export interface Alliance {
  allianceId: string;
  name: string;
  tag: string;
  color: string;
  members: AllianceMember[];
  memberLimit: number;
  forum: ForumPost[];
  espionageReports: EspionageReport[];
}
