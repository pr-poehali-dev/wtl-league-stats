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

export const teams: Team[] = [
  {
    id: 1,
    name: 'Willow Team',
    tag: 'WT',
    logo: '🌿',
    color: '#4ade80',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 60,
    playerIds: [1, 2, 3, 4, 5],
    description: 'Willow Team — молодая и амбициозная команда, готовая заявить о себе в WTL League.',
  },
  {
    id: 2,
    name: 'Aura Squad',
    tag: 'AS',
    logo: '✨',
    color: '#a78bfa',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 79,
    playerIds: [6, 7, 8, 9, 10],
    description: 'Aura Squad — команда с высоким потенциалом и самым высоким процентом побед в лиге.',
  },
  {
    id: 3,
    name: 'Aster Team',
    tag: 'AT',
    logo: '⭐',
    color: '#fbbf24',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 61,
    playerIds: [11, 12, 13, 14, 15],
    description: 'Aster Team — стабильная и надёжная команда с продуманной стратегией.',
  },
  {
    id: 4,
    name: 'Tuimada Future',
    tag: 'TT',
    logo: '🚀',
    color: '#38bdf8',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 61,
    playerIds: [16, 17, 18, 19, 20],
    description: 'Tuimada Future — команда, нацеленная на будущее и долгосрочный успех в лиге.',
  },
  {
    id: 5,
    name: 'Tuimda Team',
    tag: 'TA',
    logo: '🔥',
    color: '#fb923c',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 67,
    playerIds: [21, 22, 23, 24, 25],
    description: 'Tuimda Team — агрессивный стиль игры и высокий командный дух.',
  },
  {
    id: 6,
    name: 'Astrafal Team',
    tag: 'AFT',
    logo: '🌌',
    color: '#e03030',
    founded: '2026',
    wins: 0, losses: 0, draws: 0, points: 0, winRate: 0,
    playerIds: [26, 27, 28, 29, 30],
    description: 'Astrafal Team — новый участник лиги, формирующий свою историю.',
  },
];

const zeroStats = { kills: 0, deaths: 0, assists: 0, kda: 0, winRate: 0, matches: 0, mvp: 0 };

export const players: Player[] = [
  // Willow Team
  { id: 1, nickname: 'whysonk1', name: 'whysonk1', role: 'Игрок', teamId: 1, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 2, nickname: 'kismain', name: 'kismain', role: 'Игрок', teamId: 1, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 3, nickname: 'Makl0n', name: 'Makl0n', role: 'Игрок', teamId: 1, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 4, nickname: 'dimkapeek', name: 'dimkapeek', role: 'Игрок', teamId: 1, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 5, nickname: 'dan11l', name: 'dan11l', role: 'Капитан', teamId: 1, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },

  // Aura Squad
  { id: 6, nickname: 'w1st', name: 'w1st', role: 'Игрок', teamId: 2, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 7, nickname: 'underguccix', name: 'underguccix', role: 'Игрок', teamId: 2, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 8, nickname: 'ewxrece', name: 'ewxrece', role: 'Игрок', teamId: 2, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 9, nickname: 'tacover', name: 'tacover', role: 'Игрок', teamId: 2, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 10, nickname: 'mazafaka18', name: 'mazafaka18', role: 'Капитан', teamId: 2, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },

  // Aster Team
  { id: 11, nickname: 'xied1x', name: 'xied1x', role: 'Игрок', teamId: 3, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 12, nickname: 'Dzhango', name: 'Dzhango', role: 'Игрок', teamId: 3, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 13, nickname: 'oxoyiqel', name: 'oxoyiqel', role: 'Игрок', teamId: 3, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 14, nickname: 'Ica', name: 'Ica', role: 'Игрок', teamId: 3, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 15, nickname: 'ch0mbas1', name: 'ch0mbas1', role: 'Капитан', teamId: 3, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },

  // Tuimada Future
  { id: 16, nickname: 'dysmorphia', name: 'dysmorphia', role: 'Игрок', teamId: 4, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 17, nickname: 'tw1nkyy', name: 'tw1nkyy', role: 'Игрок', teamId: 4, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 18, nickname: 'nokou', name: 'nokou', role: 'Игрок', teamId: 4, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 19, nickname: 'dekonaizer', name: 'dekonaizer', role: 'Игрок', teamId: 4, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 20, nickname: 'smallsan', name: 'smallsan', role: 'Капитан', teamId: 4, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },

  // Tuimda Team
  { id: 21, nickname: 'closely266', name: 'closely266', role: 'Игрок', teamId: 5, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 22, nickname: 'Typ6ocBuH9pa', name: 'Typ6ocBuH9pa', role: 'Игрок', teamId: 5, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 23, nickname: 'San10ne', name: 'San10ne', role: 'Игрок', teamId: 5, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 24, nickname: 'winjet', name: 'winjet', role: 'Игрок', teamId: 5, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 25, nickname: 'asura666', name: 'asura666', role: 'Капитан', teamId: 5, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },

  // Astrafal Team
  { id: 26, nickname: 'kusogawa', name: 'kusogawa', role: 'Игрок', teamId: 6, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 27, nickname: 'sk33t', name: 'sk33t', role: 'Игрок', teamId: 6, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 28, nickname: 'santak1n', name: 'santak1n', role: 'Игрок', teamId: 6, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 29, nickname: 'l4wor_kos', name: 'l4wor_kos', role: 'Игрок', teamId: 6, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
  { id: 30, nickname: 'y4unger', name: 'y4unger', role: 'Капитан', teamId: 6, avatar: '🎮', country: '🇷🇺', stats: zeroStats, achievements: [] },
];

export const matches: Match[] = [];

export const getTeamById = (id: number) => teams.find(t => t.id === id);
export const getPlayerById = (id: number) => players.find(p => p.id === id);
export const getPlayersByTeam = (teamId: number) => players.filter(p => p.teamId === teamId);
export const getTeamPlayers = (team: Team) => team.playerIds.map(id => getPlayerById(id)).filter(Boolean) as Player[];