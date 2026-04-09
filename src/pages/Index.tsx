import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { teams, players, matches, getTeamById, getTeamPlayers } from '@/data/wtl-data';
import type { Player, Team } from '@/data/wtl-data';

type Section = 'home' | 'standings' | 'teams' | 'players' | 'schedule';

const rarityColors: Record<string, string> = {
  common: 'text-gray-400 bg-gray-800',
  rare: 'text-blue-400 bg-blue-900/40',
  epic: 'text-purple-400 bg-purple-900/40',
  legendary: 'text-yellow-400 bg-yellow-900/40',
};

const rarityLabel: Record<string, string> = {
  common: 'Обычное',
  rare: 'Редкое',
  epic: 'Эпическое',
  legendary: 'Легендарное',
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'standings', label: 'Рейтинг', icon: 'Trophy' },
    { id: 'teams', label: 'Команды', icon: 'Users' },
    { id: 'players', label: 'Игроки', icon: 'User' },
    { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
  ];

  const navigate = (section: Section) => {
    setActiveSection(section);
    setSelectedTeam(null);
    setSelectedPlayer(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTeam = (team: Team) => {
    setSelectedTeam(team);
    setSelectedPlayer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlayer = (player: Player) => {
    setSelectedPlayer(player);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen grid-bg" style={{ background: 'var(--surface-1)' }}>
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(224,48,48,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center rounded font-display font-bold text-sm" style={{ background: 'var(--neon-gold)', color: 'var(--surface-1)' }}>
              WTL
            </div>
            <span className="font-display text-xl font-semibold text-white tracking-wider hidden sm:block">
              WTL <span style={{ color: 'var(--neon-gold)' }}>LEAGUE</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="flex items-center gap-2 px-4 py-2 rounded font-body text-sm font-medium transition-all duration-200"
                style={{
                  color: activeSection === item.id ? 'var(--neon-gold)' : '#9ca3af',
                  background: activeSection === item.id ? 'rgba(245,197,24,0.1)' : 'transparent',
                  borderBottom: activeSection === item.id ? '2px solid var(--neon-gold)' : '2px solid transparent',
                }}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded"
            style={{ color: 'var(--neon-gold)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-4 py-2" style={{ borderColor: 'rgba(224,48,48,0.15)', background: 'var(--surface-2)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="flex items-center gap-3 w-full px-3 py-3 rounded font-body text-sm"
                style={{ color: activeSection === item.id ? 'var(--neon-gold)' : '#d1d5db' }}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main>
        {activeSection === 'home' && <HomePage navigate={navigate} />}
        {activeSection === 'standings' && <StandingsPage sortedTeams={sortedTeams} openTeam={openTeam} />}
        {activeSection === 'teams' && !selectedTeam && <TeamsPage teams={teams} openTeam={openTeam} />}
        {activeSection === 'teams' && selectedTeam && <TeamDetailPage team={selectedTeam} openPlayer={openPlayer} goBack={() => setSelectedTeam(null)} />}
        {activeSection === 'players' && !selectedPlayer && <PlayersPage openPlayer={openPlayer} />}
        {activeSection === 'players' && selectedPlayer && <PlayerDetailPage player={selectedPlayer} goBack={() => setSelectedPlayer(null)} />}
        {activeSection === 'schedule' && <SchedulePage />}
      </main>
    </div>
  );
}

/* ======================== HOME PAGE ======================== */
function HomePage({ navigate }: { navigate: (s: Section) => void }) {
  const liveMatch = matches.find(m => m.status === 'live');

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh', background: 'linear-gradient(135deg, #111111 0%, #111111 60%, rgba(224,48,48,0.05) 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: 'var(--neon-gold)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.04]" style={{ background: '#ffffff', filter: 'blur(60px)' }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute opacity-[0.025] font-display font-bold select-none"
              style={{
                fontSize: `${100 + i * 40}px`,
                color: 'var(--neon-gold)',
                top: `${5 + i * 15}%`,
                right: `${-8 + i * 2}%`,
                transform: `rotate(${-8 + i * 2}deg)`,
                lineHeight: 1,
              }}>
              {i % 2 === 0 ? 'WTL' : '⚡'}
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16 flex flex-col justify-center min-h-[85vh]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="h-px w-12" style={{ background: 'var(--neon-gold)' }} />
              <span className="font-body text-sm font-medium tracking-widest uppercase" style={{ color: 'var(--neon-gold)' }}>
                Season 2026 — Active
              </span>
            </div>

            <h1 className="font-display font-bold text-white mb-6 leading-none animate-fade-in"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em', animationDelay: '0.1s', opacity: 0 }}>
              WTL
              <br />
              <span style={{ color: 'var(--neon-gold)' }}>
                LEAGUE
              </span>
            </h1>

            <p className="font-body text-lg mb-10 max-w-xl animate-fade-in" style={{ color: '#9ca3af', lineHeight: 1.7, animationDelay: '0.2s', opacity: 0 }}>
              Профессиональная киберспортивная лига. Сезон только начинается — следи за командами, игроками и результатами матчей.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <button onClick={() => navigate('standings')}
                className="flex items-center gap-2 px-7 py-3.5 rounded font-display font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--neon-gold)', color: '#ffffff' }}>
                <Icon name="Trophy" size={16} />
                Рейтинг команд
              </button>
              <button onClick={() => navigate('schedule')}
                className="flex items-center gap-2 px-7 py-3.5 rounded font-display font-semibold text-sm tracking-wide border transition-all duration-200 hover:scale-105"
                style={{ borderColor: 'rgba(224,48,48,0.4)', color: '#e5e7eb', background: 'rgba(224,48,48,0.06)' }}>
                <Icon name="Calendar" size={16} />
                Расписание
              </button>
            </div>
          </div>

          {liveMatch && (
            <div className="mt-14 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff3b3b' }} />
                <span className="font-body text-sm font-medium" style={{ color: '#ff3b3b' }}>LIVE</span>
                <span className="font-body text-sm" style={{ color: '#6b7280' }}>— {liveMatch.stage}</span>
              </div>
              <div className="glass-card rounded-xl p-5 inline-flex items-center gap-8 border" style={{ borderColor: 'rgba(255,59,59,0.3)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTeamById(liveMatch.homeTeamId)?.logo}</span>
                  <span className="font-display font-semibold text-white">{getTeamById(liveMatch.homeTeamId)?.tag}</span>
                </div>
                <div className="font-display font-bold text-3xl" style={{ color: 'var(--neon-gold)' }}>
                  {liveMatch.homeScore} : {liveMatch.awayScore}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-white">{getTeamById(liveMatch.awayTeamId)?.tag}</span>
                  <span className="text-2xl">{getTeamById(liveMatch.awayTeamId)?.logo}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-10 border-y" style={{ borderColor: 'rgba(224,48,48,0.12)', background: 'var(--surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Команд', value: '6', icon: 'Users' },
            { label: 'Игроков', value: '30', icon: 'User' },
            { label: 'Матчей сыграно', value: '0', icon: 'Sword' },
            { label: 'Сезон', value: '2026', icon: 'Star' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(224,48,48,0.1)' }}>
                <Icon name={s.icon} size={18} style={{ color: 'var(--neon-gold)' }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-white">{s.value}</div>
                <div className="font-body text-xs" style={{ color: '#6b7280' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMING SOON */}
      <section className="py-20 max-w-7xl mx-auto px-4 pb-24">
        <div className="glass-card rounded-2xl p-12 text-center border" style={{ borderColor: 'rgba(224,48,48,0.15)' }}>
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Сезон скоро начнётся</h2>
          <p className="font-body" style={{ color: '#6b7280', maxWidth: 400, margin: '0 auto' }}>
            Команды регистрируются, состав формируется. Следи за обновлениями!
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button onClick={() => navigate('teams')}
              className="flex items-center gap-2 px-6 py-3 rounded font-display font-semibold text-sm border transition-all hover:scale-105"
              style={{ borderColor: 'rgba(224,48,48,0.3)', color: '#e5e7eb', background: 'rgba(224,48,48,0.06)' }}>
              <Icon name="Users" size={15} />
              Команды
            </button>
            <button onClick={() => navigate('schedule')}
              className="flex items-center gap-2 px-6 py-3 rounded font-display font-semibold text-sm border transition-all hover:scale-105"
              style={{ borderColor: 'rgba(224,48,48,0.3)', color: '#e5e7eb', background: 'rgba(224,48,48,0.06)' }}>
              <Icon name="Calendar" size={15} />
              Расписание
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======================== STANDINGS ======================== */
function StandingsPage({ sortedTeams, openTeam }: { sortedTeams: Team[]; openTeam: (t: Team) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-gold)' }} />
          <h1 className="font-display font-bold text-3xl text-white tracking-wide">ТАБЛИЦА РЕЙТИНГА</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#6b7280' }}>Season 2026 — Актуальные результаты</p>
      </div>

      <div className="glass-card rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="grid grid-cols-12 px-6 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          {[
            { label: '#', cls: 'col-span-1' },
            { label: 'Команда', cls: 'col-span-4' },
            { label: 'И', cls: 'col-span-1' },
            { label: 'В', cls: 'col-span-1' },
            { label: 'Н', cls: 'col-span-1' },
            { label: 'П', cls: 'col-span-1' },
            { label: 'Очки', cls: 'col-span-1' },
            { label: 'Процент побед', cls: 'col-span-2' },
          ].map((h) => (
            <div key={h.label} className={`font-body text-xs font-medium ${h.cls}`} style={{ color: '#6b7280' }}>
              {h.label}
            </div>
          ))}
        </div>

        {sortedTeams.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <div className="font-body text-sm" style={{ color: '#6b7280' }}>Команды пока не зарегистрированы</div>
          </div>
        )}
        {sortedTeams.map((team, idx) => (
          <button key={team.id} onClick={() => openTeam(team)}
            className="grid grid-cols-12 px-6 py-4 w-full text-left border-b transition-colors hover:bg-white/[0.02] group"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="col-span-1 flex items-center">
              <span className="font-display font-bold text-lg" style={{ color: idx === 0 ? 'var(--neon-gold)' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : '#6b7280' }}>
                {idx + 1}
              </span>
            </div>
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: `${team.color}20` }}>
                {team.logo}
              </div>
              <div>
                <div className="font-body font-semibold text-sm text-white group-hover:text-red-400 transition-colors">{team.name}</div>
                <div className="font-body text-xs" style={{ color: team.color }}>[{team.tag}]</div>
              </div>
            </div>
            <div className="col-span-1 flex items-center font-body text-sm text-white">{team.wins + team.losses + team.draws}</div>
            <div className="col-span-1 flex items-center font-body text-sm" style={{ color: '#10b981' }}>{team.wins}</div>
            <div className="col-span-1 flex items-center font-body text-sm" style={{ color: '#9ca3af' }}>{team.draws}</div>
            <div className="col-span-1 flex items-center font-body text-sm" style={{ color: '#ef4444' }}>{team.losses}</div>
            <div className="col-span-1 flex items-center font-display font-bold text-base" style={{ color: 'var(--neon-gold)' }}>{team.points}</div>
            <div className="col-span-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full" style={{ width: `${team.winRate}%`, background: team.color }} />
              </div>
              <span className="font-body text-xs w-8" style={{ color: '#9ca3af' }}>{team.winRate}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================== TEAMS ======================== */
function TeamsPage({ teams: teamList, openTeam }: { teams: Team[]; openTeam: (t: Team) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-cyan)' }} />
          <h1 className="font-display font-bold text-3xl text-white tracking-wide">КОМАНДЫ</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#6b7280' }}>Все участники WTL League 2026</p>
      </div>

      {teamList.length === 0 && (
        <div className="glass-card rounded-2xl p-16 text-center border" style={{ borderColor: 'rgba(224,48,48,0.15)' }}>
          <div className="text-5xl mb-4">👥</div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Команды не зарегистрированы</h2>
          <p className="font-body text-sm" style={{ color: '#6b7280' }}>Регистрация команд откроется перед стартом сезона</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamList.map((team) => (
          <button key={team.id} onClick={() => openTeam(team)}
            className="glass-card rounded-xl p-6 text-left hover-lift border group transition-all duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${team.color}15`, border: `1px solid ${team.color}30` }}>
                {team.logo}
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">{team.name}</div>
                <div className="font-body text-sm font-medium" style={{ color: team.color }}>[{team.tag}]</div>
                <div className="font-body text-xs" style={{ color: '#6b7280' }}>Основана: {team.founded}</div>
              </div>
            </div>
            <p className="font-body text-sm mb-4" style={{ color: '#9ca3af', lineHeight: 1.6 }}>{team.description}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Победы', value: team.wins, color: '#10b981' },
                { label: 'Ничьи', value: team.draws, color: '#9ca3af' },
                { label: 'Поражения', value: team.losses, color: '#ef4444' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="font-display font-bold text-xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="font-body text-xs" style={{ color: '#6b7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-sm" style={{ color: '#6b7280' }}>
                Очки: <span className="font-display font-bold" style={{ color: 'var(--neon-gold)' }}>{team.points}</span>
              </span>
              <span className="flex items-center gap-1 font-body text-sm" style={{ color: team.color }}>
                Состав <Icon name="ChevronRight" size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================== TEAM DETAIL ======================== */
function TeamDetailPage({ team, openPlayer, goBack }: { team: Team; openPlayer: (p: Player) => void; goBack: () => void }) {
  const teamPlayers = getTeamPlayers(team);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={goBack} className="flex items-center gap-2 mb-8 font-body text-sm hover:text-white transition-colors" style={{ color: '#6b7280' }}>
        <Icon name="ArrowLeft" size={16} /> Назад к командам
      </button>

      <div className="glass-card rounded-2xl p-8 border mb-8 relative overflow-hidden" style={{ borderColor: `${team.color}30` }}>
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ background: `radial-gradient(circle at 80% 50%, ${team.color}, transparent 60%)` }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0" style={{ background: `${team.color}15`, border: `2px solid ${team.color}40` }}>
            {team.logo}
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-4xl text-white mb-2">{team.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-body text-sm px-3 py-1 rounded-full" style={{ background: `${team.color}20`, color: team.color }}>[{team.tag}]</span>
              <span className="font-body text-sm" style={{ color: '#6b7280' }}>Основана: {team.founded}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-5xl" style={{ color: 'var(--neon-gold)' }}>{team.points}</div>
            <div className="font-body text-sm" style={{ color: '#6b7280' }}>очков</div>
          </div>
        </div>
        <p className="font-body mb-6" style={{ color: '#9ca3af', lineHeight: 1.7 }}>{team.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Победы', value: team.wins, color: '#10b981' },
            { label: 'Ничьи', value: team.draws, color: '#9ca3af' },
            { label: 'Поражения', value: team.losses, color: '#ef4444' },
            { label: 'Процент побед', value: `${team.winRate}%`, color: team.color },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="font-display font-bold text-3xl" style={{ color: s.color }}>{s.value}</div>
              <div className="font-body text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-display font-bold text-xl text-white mb-4 tracking-wide">СОСТАВ КОМАНДЫ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamPlayers.map((player) => (
          <button key={player.id} onClick={() => openPlayer(player)}
            className="glass-card rounded-xl p-5 text-left hover-lift border group transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {player.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body font-semibold text-white group-hover:text-yellow-400 transition-colors">{player.nickname}</div>
                <div className="font-body text-sm" style={{ color: '#6b7280' }}>{player.name}</div>
                <div className="font-body text-xs mt-0.5" style={{ color: team.color }}>{player.role}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-xl" style={{ color: 'var(--neon-gold)' }}>{player.stats.kda.toFixed(1)}</div>
                <div className="font-body text-xs" style={{ color: '#6b7280' }}>KDA</div>
              </div>
              {player.achievements.length > 0 && (
                <div className="flex flex-col gap-0.5 ml-2">
                  {player.achievements.slice(0, 3).map(a => (
                    <span key={a.id} title={a.title} className="text-sm leading-none">{a.icon}</span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================== PLAYERS ======================== */
function PlayersPage({ openPlayer }: { openPlayer: (p: Player) => void }) {
  const [filter, setFilter] = useState<string>('kda');

  const sorted = [...players].sort((a, b) => {
    if (filter === 'kda') return b.stats.kda - a.stats.kda;
    if (filter === 'kills') return b.stats.kills - a.stats.kills;
    if (filter === 'mvp') return b.stats.mvp - a.stats.mvp;
    return b.stats.winRate - a.stats.winRate;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-cyan)' }} />
          <h1 className="font-display font-bold text-3xl text-white tracking-wide">ИГРОКИ</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#6b7280' }}>Все игроки WTL League 2026</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'kda', label: 'По KDA' },
          { key: 'kills', label: 'По убийствам' },
          { key: 'mvp', label: 'По MVP' },
          { key: 'winRate', label: 'По победам' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="px-4 py-2 rounded-lg font-body text-sm transition-all"
            style={{
              background: filter === f.key ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.04)',
              color: filter === f.key ? 'var(--neon-gold)' : '#9ca3af',
              border: `1px solid ${filter === f.key ? 'rgba(245,197,24,0.3)' : 'transparent'}`,
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="glass-card rounded-2xl p-16 text-center border" style={{ borderColor: 'rgba(224,48,48,0.15)' }}>
          <div className="text-5xl mb-4">🎮</div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Игроки пока не добавлены</h2>
          <p className="font-body text-sm" style={{ color: '#6b7280' }}>Составы команд будут опубликованы после регистрации</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((player, idx) => {
          const team = getTeamById(player.teamId);
          return (
            <button key={player.id} onClick={() => openPlayer(player)}
              className="glass-card rounded-xl p-5 text-left hover-lift border group transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {player.avatar}
                  </div>
                  {idx < 3 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-display font-bold text-xs"
                      style={{ background: idx === 0 ? '#f5c518' : idx === 1 ? '#c0c0c0' : '#cd7f32', color: '#0d1117' }}>
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">{player.nickname}</div>
                  <div className="font-body text-sm" style={{ color: '#6b7280' }}>{player.name}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: `${team?.color}20`, color: team?.color }}>{team?.tag}</span>
                    <span className="font-body text-xs" style={{ color: '#6b7280' }}>{player.role}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: 'KDA', value: player.stats.kda.toFixed(1), color: 'var(--neon-gold)' },
                  { label: 'Убийства', value: player.stats.kills, color: '#fff' },
                  { label: 'Победы', value: `${player.stats.winRate}%`, color: '#10b981' },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="font-display font-bold text-base" style={{ color: s.color }}>{s.value}</div>
                    <div className="font-body text-xs" style={{ color: '#6b7280' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {player.achievements.length > 0 && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {player.achievements.slice(0, 4).map(a => (
                    <span key={a.id} title={a.title} className={`text-sm px-1.5 py-0.5 rounded ${rarityColors[a.rarity]}`}>
                      {a.icon}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ======================== PLAYER DETAIL ======================== */
function PlayerDetailPage({ player, goBack }: { player: Player; goBack: () => void }) {
  const team = getTeamById(player.teamId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={goBack} className="flex items-center gap-2 mb-8 font-body text-sm hover:text-white transition-colors" style={{ color: '#6b7280' }}>
        <Icon name="ArrowLeft" size={16} /> Назад к игрокам
      </button>

      <div className="glass-card rounded-2xl p-8 border mb-8 relative overflow-hidden" style={{ borderColor: `${team?.color}30` }}>
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ background: `radial-gradient(circle at 80% 50%, ${team?.color}, transparent 60%)` }} />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0" style={{ background: `${team?.color}15`, border: `2px solid ${team?.color}40` }}>
            {player.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="font-display font-bold text-4xl text-white">{player.nickname}</h1>
              <span className="text-xl">{player.country}</span>
            </div>
            <div className="font-body text-lg mb-3" style={{ color: '#9ca3af' }}>{player.name}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body text-sm px-3 py-1 rounded-full" style={{ background: `${team?.color}20`, color: team?.color }}>{team?.name}</span>
              <span className="font-body text-sm px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af' }}>{player.role}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display font-bold text-5xl" style={{ color: 'var(--neon-gold)' }}>{player.stats.kda.toFixed(1)}</div>
            <div className="font-body text-sm" style={{ color: '#6b7280' }}>KDA рейтинг</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Убийства', value: player.stats.kills, icon: '💀', color: '#ef4444' },
          { label: 'Смерти', value: player.stats.deaths, icon: '💔', color: '#6b7280' },
          { label: 'Ассисты', value: player.stats.assists, icon: '🤝', color: 'var(--neon-cyan)' },
          { label: 'Матчей', value: player.stats.matches, icon: '⚔️', color: '#9ca3af' },
          { label: 'Победы', value: `${player.stats.winRate}%`, icon: '🏆', color: '#10b981' },
          { label: 'MVP', value: player.stats.mvp, icon: '⭐', color: '#f5c518' },
          { label: 'KDA', value: player.stats.kda.toFixed(1), icon: '📊', color: 'var(--neon-gold)' },
          { label: 'Асс./матч', value: (player.stats.assists / player.stats.matches).toFixed(1), icon: '📈', color: '#8b5cf6' },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4 text-center border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-display font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="font-body text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display font-bold text-xl text-white mb-4 tracking-wide">ДОСТИЖЕНИЯ И НАГРАДЫ</h2>
      {player.achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {player.achievements.map((achievement) => (
            <div key={achievement.id} className="glass-card rounded-xl p-4 border flex items-center gap-4"
              style={{ borderColor: achievement.rarity === 'legendary' ? 'rgba(245,197,24,0.3)' : achievement.rarity === 'epic' ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: achievement.rarity === 'legendary' ? 'rgba(245,197,24,0.1)' : achievement.rarity === 'epic' ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.06)' }}>
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body font-semibold text-white">{achievement.title}</div>
                <div className="font-body text-sm" style={{ color: '#9ca3af' }}>{achievement.description}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`font-body text-xs px-2 py-0.5 rounded ${rarityColors[achievement.rarity]}`}>
                    {rarityLabel[achievement.rarity]}
                  </span>
                  <span className="font-body text-xs" style={{ color: '#4b5563' }}>{achievement.earnedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="text-4xl mb-3">🎯</div>
          <div className="font-body text-sm" style={{ color: '#6b7280' }}>Достижения пока не получены. Игрок продолжает бороться!</div>
        </div>
      )}
    </div>
  );
}

/* ======================== SCHEDULE ======================== */
function SchedulePage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? matches : matches.filter(m => m.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded" style={{ background: '#8b5cf6' }} />
          <h1 className="font-display font-bold text-3xl text-white tracking-wide">РАСПИСАНИЕ МАТЧЕЙ</h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#6b7280' }}>Season 2026</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'Все' },
          { key: 'live', label: '🔴 Live' },
          { key: 'upcoming', label: 'Предстоящие' },
          { key: 'finished', label: 'Завершённые' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="px-4 py-2 rounded-lg font-body text-sm transition-all"
            style={{
              background: filter === f.key ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.04)',
              color: filter === f.key ? 'var(--neon-gold)' : '#9ca3af',
              border: `1px solid ${filter === f.key ? 'rgba(245,197,24,0.3)' : 'transparent'}`,
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card rounded-2xl p-16 text-center border" style={{ borderColor: 'rgba(224,48,48,0.15)' }}>
          <div className="text-5xl mb-4">📅</div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Матчи пока не запланированы</h2>
          <p className="font-body text-sm" style={{ color: '#6b7280' }}>Расписание появится после формирования составов команд</p>
        </div>
      )}
      <div className="space-y-3">
        {filtered.map((match) => {
          const home = getTeamById(match.homeTeamId);
          const away = getTeamById(match.awayTeamId);
          const isLive = match.status === 'live';
          const isFinished = match.status === 'finished';

          return (
            <div key={match.id} className="glass-card rounded-xl p-5 border transition-all"
              style={{ borderColor: isLive ? 'rgba(255,59,59,0.3)' : 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-body flex-wrap" style={{ color: '#6b7280' }}>
                  <span>{match.date}</span>
                  <span>·</span>
                  <span>{match.time}</span>
                  <span>·</span>
                  <span>{match.stage}</span>
                  {match.map && <><span>·</span><span>{match.map}</span></>}
                </div>
                {isLive && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff3b3b' }} />
                    <span className="font-body text-xs font-medium" style={{ color: '#ff3b3b' }}>LIVE</span>
                  </div>
                )}
                {isFinished && (
                  <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: '#6b7280' }}>Завершён</span>
                )}
                {match.status === 'upcoming' && (
                  <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--neon-cyan)' }}>Предстоит</span>
                )}
              </div>

              <div className="flex items-center">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{home?.logo}</span>
                  <div>
                    <div className="font-display font-semibold text-white">{home?.name}</div>
                    <div className="font-body text-xs" style={{ color: home?.color }}>[{home?.tag}]</div>
                  </div>
                </div>

                <div className="px-4 text-center flex-shrink-0">
                  {(isLive || isFinished) ? (
                    <div className="font-display font-bold text-2xl" style={{ color: isLive ? '#ff3b3b' : 'var(--neon-gold)' }}>
                      {match.homeScore} : {match.awayScore}
                    </div>
                  ) : (
                    <div className="font-display text-xl font-medium" style={{ color: '#4b5563' }}>VS</div>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end text-right">
                  <div>
                    <div className="font-display font-semibold text-white">{away?.name}</div>
                    <div className="font-body text-xs" style={{ color: away?.color }}>[{away?.tag}]</div>
                  </div>
                  <span className="text-2xl">{away?.logo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}