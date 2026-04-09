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

export const achievements: Achievement[] = [
  { id: 'mvp', title: 'MVP Сезона', description: 'Лучший игрок турнира', icon: '🏆', rarity: 'legendary', earnedAt: '2024-03' },
  { id: 'headhunter', title: 'Охотник', description: '100+ убийств в сезоне', icon: '💀', rarity: 'epic', earnedAt: '2024-02' },
  { id: 'champion', title: 'Чемпион', description: 'Победитель WTL Season 1', icon: '🥇', rarity: 'legendary', earnedAt: '2024-01' },
  { id: 'clutch', title: 'Клатч-кинг', description: '10 клатчей за сезон', icon: '⚡', rarity: 'rare', earnedAt: '2024-02' },
  { id: 'ace', title: 'Туз', description: 'Ace в официальном матче', icon: '🃏', rarity: 'epic', earnedAt: '2024-03' },
  { id: 'ironwall', title: 'Железная стена', description: 'Менее 0.5 смерти в матче', icon: '🛡️', rarity: 'rare', earnedAt: '2024-01' },
  { id: 'sniper', title: 'Снайпер', description: '80% точность попаданий', icon: '🎯', rarity: 'epic', earnedAt: '2024-03' },
  { id: 'veteran', title: 'Ветеран', description: 'Участник 50+ матчей', icon: '⭐', rarity: 'common', earnedAt: '2024-01' },
];

export const teams: Team[] = [
  {
    id: 1,
    name: 'Thunder Force',
    tag: 'TF',
    logo: '⚡',
    color: '#f5c518',
    founded: '2022',
    wins: 18,
    losses: 4,
    draws: 2,
    points: 56,
    winRate: 75,
    playerIds: [1, 2, 3, 4, 5],
    description: 'Доминирующая сила WTL. Специализируются на агрессивном стиле игры и стремительных атаках.',
  },
  {
    id: 2,
    name: 'Steel Wolves',
    tag: 'SW',
    logo: '🐺',
    color: '#00d4ff',
    founded: '2021',
    wins: 15,
    losses: 6,
    draws: 3,
    points: 48,
    winRate: 63,
    playerIds: [6, 7, 8, 9, 10],
    description: 'Стратегическая команда с безупречной командной игрой и железной защитой.',
  },
  {
    id: 3,
    name: 'Phoenix Rise',
    tag: 'PR',
    logo: '🔥',
    color: '#ff6b35',
    founded: '2023',
    wins: 13,
    losses: 8,
    draws: 3,
    points: 42,
    winRate: 54,
    playerIds: [11, 12, 13, 14, 15],
    description: 'Молодая перспективная команда, известная неожиданными тактиками и высоким боевым духом.',
  },
  {
    id: 4,
    name: 'Dark Matter',
    tag: 'DM',
    logo: '🌑',
    color: '#8b5cf6',
    founded: '2022',
    wins: 11,
    losses: 10,
    draws: 3,
    points: 36,
    winRate: 46,
    playerIds: [16, 17, 18, 19, 20],
    description: 'Загадочная команда с непредсказуемым геймплеем. Опасны в поздней игре.',
  },
  {
    id: 5,
    name: 'Iron Eagles',
    tag: 'IE',
    logo: '🦅',
    color: '#10b981',
    founded: '2021',
    wins: 9,
    losses: 12,
    draws: 3,
    points: 30,
    winRate: 38,
    playerIds: [21, 22, 23, 24, 25],
    description: 'Опытная команда с богатой историей. Консистентная игра и надёжная ротация.',
  },
  {
    id: 6,
    name: 'Neon Storm',
    tag: 'NS',
    logo: '⚡',
    color: '#ec4899',
    founded: '2023',
    wins: 6,
    losses: 15,
    draws: 3,
    points: 21,
    winRate: 25,
    playerIds: [26, 27, 28, 29, 30],
    description: 'Начинающая команда в процессе становления. Показывают прогресс с каждым матчем.',
  },
];

export const players: Player[] = [
  {
    id: 1, name: 'Алексей Громов', nickname: 'T-Rex', role: 'Капитан / IGL', teamId: 1,
    avatar: '🎮', country: '🇷🇺',
    stats: { kills: 312, deaths: 89, assists: 145, kda: 5.1, winRate: 75, matches: 24, mvp: 8 },
    achievements: [achievements[0], achievements[2], achievements[1], achievements[4]],
  },
  {
    id: 2, name: 'Дмитрий Краснов', nickname: 'Phantom', role: 'Снайпер', teamId: 1,
    avatar: '🎯', country: '🇷🇺',
    stats: { kills: 289, deaths: 92, assists: 67, kda: 3.9, winRate: 75, matches: 24, mvp: 5 },
    achievements: [achievements[6], achievements[7], achievements[3]],
  },
  {
    id: 3, name: 'Кирилл Зверев', nickname: 'Blade', role: 'Штурмовик', teamId: 1,
    avatar: '⚔️', country: '🇷🇺',
    stats: { kills: 267, deaths: 110, assists: 178, kda: 4.0, winRate: 71, matches: 24, mvp: 3 },
    achievements: [achievements[3], achievements[7]],
  },
  {
    id: 4, name: 'Иван Сорокин', nickname: 'Ghost', role: 'Разведчик', teamId: 1,
    avatar: '👻', country: '🇷🇺',
    stats: { kills: 198, deaths: 95, assists: 210, kda: 4.3, winRate: 75, matches: 24, mvp: 2 },
    achievements: [achievements[7]],
  },
  {
    id: 5, name: 'Михаил Орлов', nickname: 'Tank', role: 'Защитник', teamId: 1,
    avatar: '🛡️', country: '🇷🇺',
    stats: { kills: 145, deaths: 78, assists: 290, kda: 5.6, winRate: 75, matches: 24, mvp: 1 },
    achievements: [achievements[5], achievements[7]],
  },
  {
    id: 6, name: 'Сергей Волков', nickname: 'Alpha', role: 'Капитан / IGL', teamId: 2,
    avatar: '🐺', country: '🇷🇺',
    stats: { kills: 278, deaths: 98, assists: 167, kda: 4.5, winRate: 63, matches: 24, mvp: 6 },
    achievements: [achievements[2], achievements[1], achievements[7]],
  },
  {
    id: 7, name: 'Павел Медведев', nickname: 'IceBreaker', role: 'Снайпер', teamId: 2,
    avatar: '🧊', country: '🇷🇺',
    stats: { kills: 256, deaths: 105, assists: 78, kda: 3.2, winRate: 63, matches: 24, mvp: 4 },
    achievements: [achievements[6], achievements[7]],
  },
  {
    id: 8, name: 'Роман Соколов', nickname: 'Swift', role: 'Штурмовик', teamId: 2,
    avatar: '💨', country: '🇷🇺',
    stats: { kills: 234, deaths: 115, assists: 145, kda: 3.3, winRate: 58, matches: 24, mvp: 2 },
    achievements: [achievements[7]],
  },
  {
    id: 9, name: 'Артём Лисицын', nickname: 'Fox', role: 'Поддержка', teamId: 2,
    avatar: '🦊', country: '🇷🇺',
    stats: { kills: 145, deaths: 88, assists: 312, kda: 5.2, winRate: 63, matches: 24, mvp: 1 },
    achievements: [achievements[7]],
  },
  {
    id: 10, name: 'Никита Беляев', nickname: 'Bear', role: 'Защитник', teamId: 2,
    avatar: '🐻', country: '🇷🇺',
    stats: { kills: 167, deaths: 80, assists: 234, kda: 5.0, winRate: 67, matches: 24, mvp: 2 },
    achievements: [achievements[5], achievements[7]],
  },
  {
    id: 11, name: 'Евгений Огнев', nickname: 'Blaze', role: 'Капитан / IGL', teamId: 3,
    avatar: '🔥', country: '🇷🇺',
    stats: { kills: 245, deaths: 118, assists: 134, kda: 3.2, winRate: 54, matches: 24, mvp: 4 },
    achievements: [achievements[7]],
  },
  {
    id: 12, name: 'Владимир Буров', nickname: 'Storm', role: 'Снайпер', teamId: 3,
    avatar: '⛈️', country: '🇷🇺',
    stats: { kills: 223, deaths: 125, assists: 56, kda: 2.2, winRate: 50, matches: 24, mvp: 2 },
    achievements: [achievements[7]],
  },
  {
    id: 13, name: 'Андрей Пламенев', nickname: 'Ember', role: 'Штурмовик', teamId: 3,
    avatar: '🌋', country: '🇷🇺',
    stats: { kills: 198, deaths: 130, assists: 112, kda: 2.4, winRate: 54, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 14, name: 'Тимур Жаров', nickname: 'Inferno', role: 'Разведчик', teamId: 3,
    avatar: '🌡️', country: '🇷🇺',
    stats: { kills: 178, deaths: 112, assists: 167, kda: 3.1, winRate: 58, matches: 24, mvp: 2 },
    achievements: [achievements[7]],
  },
  {
    id: 15, name: 'Глеб Пепельников', nickname: 'Ash', role: 'Поддержка', teamId: 3,
    avatar: '💨', country: '🇷🇺',
    stats: { kills: 123, deaths: 98, assists: 278, kda: 4.1, winRate: 54, matches: 24, mvp: 1 },
    achievements: [achievements[7]],
  },
  {
    id: 16, name: 'Олег Тёмный', nickname: 'Void', role: 'Капитан / IGL', teamId: 4,
    avatar: '🌑', country: '🇷🇺',
    stats: { kills: 212, deaths: 134, assists: 123, kda: 2.5, winRate: 46, matches: 24, mvp: 3 },
    achievements: [achievements[7]],
  },
  {
    id: 17, name: 'Степан Мрачнев', nickname: 'Shadow', role: 'Снайпер', teamId: 4,
    avatar: '🌒', country: '🇷🇺',
    stats: { kills: 198, deaths: 140, assists: 67, kda: 1.9, winRate: 42, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 18, name: 'Даниил Чёрный', nickname: 'Raven', role: 'Штурмовик', teamId: 4,
    avatar: '🦅', country: '🇷🇺',
    stats: { kills: 187, deaths: 145, assists: 134, kda: 2.2, winRate: 46, matches: 24, mvp: 1 },
    achievements: [achievements[7]],
  },
  {
    id: 19, name: 'Максим Тьмин', nickname: 'Eclipse', role: 'Разведчик', teamId: 4,
    avatar: '🌙', country: '🇷🇺',
    stats: { kills: 156, deaths: 118, assists: 189, kda: 2.9, winRate: 50, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 20, name: 'Руслан Ночников', nickname: 'Midnight', role: 'Поддержка', teamId: 4,
    avatar: '⭐', country: '🇷🇺',
    stats: { kills: 112, deaths: 100, assists: 245, kda: 3.6, winRate: 46, matches: 24, mvp: 0 },
    achievements: [achievements[7]],
  },
  {
    id: 21, name: 'Фёдор Орлинский', nickname: 'Eagle', role: 'Капитан / IGL', teamId: 5,
    avatar: '🦅', country: '🇷🇺',
    stats: { kills: 189, deaths: 145, assists: 134, kda: 2.2, winRate: 38, matches: 24, mvp: 2 },
    achievements: [achievements[7]],
  },
  {
    id: 22, name: 'Борис Крылатов', nickname: 'Falcon', role: 'Снайпер', teamId: 5,
    avatar: '🔭', country: '🇷🇺',
    stats: { kills: 178, deaths: 156, assists: 45, kda: 1.4, winRate: 33, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 23, name: 'Юрий Перелётов', nickname: 'Condor', role: 'Штурмовик', teamId: 5,
    avatar: '🪶', country: '🇷🇺',
    stats: { kills: 167, deaths: 160, assists: 112, kda: 1.7, winRate: 38, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 24, name: 'Виктор Пернатов', nickname: 'Hawk', role: 'Разведчик', teamId: 5,
    avatar: '🌬️', country: '🇷🇺',
    stats: { kills: 145, deaths: 134, assists: 167, kda: 2.3, winRate: 42, matches: 24, mvp: 1 },
    achievements: [achievements[7]],
  },
  {
    id: 25, name: 'Геннадий Щитов', nickname: 'Shield', role: 'Защитник', teamId: 5,
    avatar: '🛡️', country: '🇷🇺',
    stats: { kills: 98, deaths: 112, assists: 234, kda: 2.9, winRate: 38, matches: 24, mvp: 0 },
    achievements: [],
  },
  {
    id: 26, name: 'Артур Неонов', nickname: 'Neon', role: 'Капитан / IGL', teamId: 6,
    avatar: '💡', country: '🇷🇺',
    stats: { kills: 156, deaths: 178, assists: 112, kda: 1.5, winRate: 25, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 27, name: 'Леонид Светлов', nickname: 'Laser', role: 'Снайпер', teamId: 6,
    avatar: '🔆', country: '🇷🇺',
    stats: { kills: 145, deaths: 189, assists: 45, kda: 1.0, winRate: 21, matches: 24, mvp: 0 },
    achievements: [],
  },
  {
    id: 28, name: 'Пётр Зарев', nickname: 'Spark', role: 'Штурмовик', teamId: 6,
    avatar: '✨', country: '🇷🇺',
    stats: { kills: 134, deaths: 195, assists: 89, kda: 1.1, winRate: 25, matches: 24, mvp: 0 },
    achievements: [],
  },
  {
    id: 29, name: 'Игорь Лучистый', nickname: 'Flash', role: 'Разведчик', teamId: 6,
    avatar: '⚡', country: '🇷🇺',
    stats: { kills: 123, deaths: 167, assists: 145, kda: 1.6, winRate: 25, matches: 24, mvp: 1 },
    achievements: [],
  },
  {
    id: 30, name: 'Вадим Туманов', nickname: 'Haze', role: 'Поддержка', teamId: 6,
    avatar: '🌫️', country: '🇷🇺',
    stats: { kills: 89, deaths: 145, assists: 198, kda: 2.0, winRate: 25, matches: 24, mvp: 0 },
    achievements: [],
  },
];

export const matches: Match[] = [
  { id: 1, homeTeamId: 1, awayTeamId: 2, date: '2026-04-12', time: '18:00', status: 'upcoming', stage: 'Плей-офф — Полуфинал', map: 'Dust II' },
  { id: 2, homeTeamId: 3, awayTeamId: 4, date: '2026-04-12', time: '20:00', status: 'upcoming', stage: 'Плей-офф — Полуфинал', map: 'Mirage' },
  { id: 3, homeTeamId: 5, awayTeamId: 6, date: '2026-04-15', time: '17:00', status: 'upcoming', stage: 'Групповой этап', map: 'Inferno' },
  { id: 4, homeTeamId: 1, awayTeamId: 3, date: '2026-04-09', time: '19:00', status: 'live', homeScore: 10, awayScore: 7, stage: 'Четвертьфинал', map: 'Nuke' },
  { id: 5, homeTeamId: 2, awayTeamId: 5, date: '2026-04-05', time: '17:00', status: 'finished', homeScore: 16, awayScore: 8, stage: 'Групповой этап', map: 'Ancient' },
  { id: 6, homeTeamId: 1, awayTeamId: 6, date: '2026-04-03', time: '19:00', status: 'finished', homeScore: 16, awayScore: 4, stage: 'Групповой этап', map: 'Dust II' },
  { id: 7, homeTeamId: 3, awayTeamId: 2, date: '2026-04-01', time: '18:00', status: 'finished', homeScore: 12, awayScore: 16, stage: 'Групповой этап', map: 'Mirage' },
  { id: 8, homeTeamId: 4, awayTeamId: 5, date: '2026-03-28', time: '20:00', status: 'finished', homeScore: 14, awayScore: 16, stage: 'Групповой этап', map: 'Overpass' },
];

export const getTeamById = (id: number) => teams.find(t => t.id === id);
export const getPlayerById = (id: number) => players.find(p => p.id === id);
export const getPlayersByTeam = (teamId: number) => players.filter(p => p.teamId === teamId);
export const getTeamPlayers = (team: Team) => team.playerIds.map(id => getPlayerById(id)).filter(Boolean) as Player[];
