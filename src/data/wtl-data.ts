export interface Player {
  id: number;
  name: string;
  nickname: string;
  role: string;
  teamId: number;
  avatar: string;
  country: string;
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    winRate: number;
    matches: number;
    mvp: number;
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
}

export interface Team {
  id: number;
  name: string;
  tag: string;
  logo: string;
  color: string;
  founded: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  winRate: number;
  playerIds: number[];
  description: string;
}

export interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  stage: string;
  map?: string;
}

export const teams: Team[] = [];

export const players: Player[] = [];

export const matches: Match[] = [];

export const getTeamById = (id: number) => teams.find(t => t.id === id);
export const getPlayerById = (id: number) => players.find(p => p.id === id);
export const getPlayersByTeam = (teamId: number) => players.filter(p => p.teamId === teamId);
export const getTeamPlayers = (team: Team) => team.playerIds.map(id => getPlayerById(id)).filter(Boolean) as Player[];
