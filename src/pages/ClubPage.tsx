import { CheckCircle2, Users, BookOpen, Lightbulb, Zap, Trophy, Calendar, ArrowRight, Target, Rocket, Sparkles } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '250+',  label: 'Ressources Partagées', icon: <BookOpen  className="w-6 h-6 mx-auto mb-3 text-rose-400" /> },
  { value: '1.2K+', label: 'Étudiants Aidés',      icon: <Users     className="w-6 h-6 mx-auto mb-3 text-amber-400" /> },
  { value: '45+',   label: 'Membres Actifs',       icon: <Zap       className="w-6 h-6 mx-auto mb-3 text-emerald-400" /> },
];

const manifesto = [
  { icon: <Users     className="w-4 h-4" />, text: 'Connecter les étudiants entre eux et avec leurs ressources.' },
  { icon: <BookOpen  className="w-4 h-4" />, text: 'Centraliser le savoir académique en un seul endroit.' },
  { icon: <Lightbulb className="w-4 h-4" />, text: 'Développer les leaders de demain, dès aujourd\'hui.' },
];

const events = [
  {
    id: 'ev1',
    dotColor: 'bg-amber-400 border-amber-200',
    date: '12 Septembre',
    title: "Atelier d'Intégration S1",
    tag: 'Campus',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    desc: 'Accueil des nouveaux étudiants, visite du campus et présentation des services APEX.',
  },
  {
    id: 'ev2',
    dotColor: 'bg-apex-blue border-apex-border',
    date: '25 Septembre',
    title: 'Hackathon / Code Session',
    tag: 'Tech',
    tagColor: 'bg-apex-cream text-apex-blue border-apex-border',
    desc: '48h pour concevoir des outils numériques au service des étudiants ENS.',
  },
  {
    id: 'ev3',
    dotColor: 'bg-emerald-500 border-emerald-200',
    date: '10 Octobre',
    title: "Tournoi d'Échecs Universitaire",
    tag: 'Loisir',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Compétition ouverte à toutes les filières. Inscriptions sur place.',
  },
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
  objectPosition?: string;
  isPlaceholder?: boolean;
}

// Première ligne : Bureau exécutif avec leurs photos officielles
const executiveMembers: TeamMember[] = [
  {
    name: 'Yahia Qessaoui',
    role: 'President',
    image: '/team/yahia-qessaoui.jpg',
    objectPosition: 'center 15%',
  },
  {
    name: 'Khalid Ouisnaf',
    role: 'Vice President',
    image: '/team/khalid-ouisnaf.jpg',
    objectPosition: 'center 12%',
  },
  {
    name: 'Ihsane Ouahlim',
    role: 'Secretary',
    image: '/team/ihsane-ouahlim.jpg',
    objectPosition: 'center 20%',
  },
  {
    name: 'Khadija Bahaj',
    role: 'Treasurer',
    image: '/team/khadija-bahaj.jpg',
    objectPosition: 'center 20%',
  },
];

// Deuxième ligne : Coordinateurs des pôles avec leurs photos officielles
const coordinatorMembers: TeamMember[] = [
  {
    name: 'Khalid Acharki',
    role: 'Media Coordinator',
    image: '/team/khalid-acharki.jpg',
    objectPosition: 'center 18%',
  },
  {
    name: 'Anas Elhamioui',
    role: 'Communication Coordinator',
    image: '/team/anas-elhamioui.jpg',
    objectPosition: 'center 18%',
  },
  {
    name: 'Abderrahman Marssou',
    role: 'Content Development Coordinator',
    image: '/team/abderrahman-marssou.jpg',
    objectPosition: '55% 22%',
  },
  {
    name: 'Mohamed Reda Belbida',
    role: 'Organizing Coordinator',
    image: '/team/mohamed-reda-belbida.jpg',
    objectPosition: '68% 26%',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ClubPage() {
  return (
    <>
      <Header activePage="club" />

      <main className="min-h-screen bg-[#f8fafc] font-body" id="main-content">

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 — Impact Dashboard Hero (Deep Vibe)
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="bg-[#1A0510] pt-24 pb-44 px-4 sm:px-6 relative overflow-hidden"
          aria-labelledby="club-hero-heading"
        >
          {/* Background effects */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-apex-blue/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

          <div className="max-w-5xl mx-auto text-center relative z-10">

            {/* Gold mission badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 font-body text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Target className="w-3.5 h-3.5" />
              Mission 2026
            </div>

            {/* Main headline */}
            <h1
              id="club-hero-heading"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
            >
              Construire l'avenir<br className="hidden sm:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-200">de l'ENS Tétouan.</span>
            </h1>

            {/* Subtext */}
            <p className="font-body text-slate-300 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl mx-auto">
              APEX n'est pas juste un club. C'est le moteur numérique et social de notre université — une infrastructure bâtie par des étudiants, pour des étudiants.
            </p>

            {/* Live Stats Grid (Glassmorphism) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
              aria-label="Chiffres clés de l'impact APEX"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-colors duration-300 shadow-2xl"
                >
                  {s.icon}
                  <p className="font-heading font-black text-white text-4xl sm:text-5xl tracking-tight leading-none mb-2 drop-shadow-md">
                    {s.value}
                  </p>
                  <p className="font-body text-[13px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — The Manifesto (Overlapping the hero)
        ══════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 pb-20 relative z-20 -mt-24" aria-labelledby="manifesto-heading">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-200 p-8 md:p-12 overflow-hidden relative">
              
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                {/* Left — Notre Vision */}
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 font-body text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Notre Vision
                  </div>
                  <h2
                    id="manifesto-heading"
                    className="font-heading font-black text-slate-900 text-3xl leading-tight mb-5"
                  >
                    Simplifier drastiquement la vie étudiante.
                  </h2>
                  <p className="font-body text-slate-500 text-[15px] leading-relaxed mb-4">
                    Chaque étudiant mérite un accès rapide à ses cours, à ses droits et à ses camarades. APEX existe pour pulvériser les barrières bureaucratiques et numériques qui freinent la réussite.
                  </p>
                  <p className="font-body text-slate-500 text-[15px] leading-relaxed font-medium">
                    Nous croyons en une université où l'information est libre, le savoir est partagé, et l'entraide est la norme absolue.
                  </p>
                </div>

                {/* Right — Actionable Pillars */}
                <div className="flex flex-col justify-center gap-4">
                  {manifesto.map((item, i) => (
                    <div key={i} className="group flex items-center gap-5 bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-apex-border hover:bg-apex-cream/50 transition-colors duration-200">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-apex-blue flex-shrink-0 group-hover:scale-110 group-hover:border-apex-border transition-all duration-300 shadow-sm">
                        {item.icon}
                      </div>
                      <p className="font-body text-[14px] font-bold text-slate-800 leading-snug group-hover:text-apex-blue transition-colors">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 — The Momentum (Agenda Timeline)
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 px-4 sm:px-6" aria-labelledby="events-heading">
          <div className="max-w-4xl mx-auto">

            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 id="events-heading" className="font-heading font-black text-slate-900 text-3xl flex items-center gap-3">
                  <Rocket className="w-7 h-7 text-apex-blue" strokeWidth={2.5} />
                  En pleine action
                </h2>
                <p className="font-body text-slate-500 text-sm mt-2">Le club ne dort jamais. Voici nos prochains mouvements.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Glowing Vertical line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gradient-to-b from-rose-700 via-amber-400 to-transparent rounded-full opacity-30" aria-hidden="true" />

              <ol className="space-y-8" aria-label="Événements du club">
                {events.map((ev) => (
                  <li key={ev.id} className="flex items-start gap-6 lg:gap-8">
                    
                    {/* Glowing Dot */}
                    <div className={`relative z-10 mt-1 w-12 h-12 rounded-full border-4 border-[#f8fafc] shadow-md flex items-center justify-center flex-shrink-0 ${ev.dotColor}`}>
                      <Calendar className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Event Card */}
                    <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl p-6 hover:border-rose-300 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-heading font-black text-slate-900 text-[17px] group-hover:text-apex-blue transition-colors">
                            {ev.title}
                          </h3>
                          <span className={`font-body text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md border ${ev.tagColor}`}>
                            {ev.tag}
                          </span>
                        </div>
                        <span className="font-body text-[13px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex-shrink-0">
                          {ev.date}
                        </span>
                      </div>
                      <p className="font-body text-[14.5px] text-slate-500 leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 4 — The Brains (Contributors)
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-24 px-4 sm:px-6 border-t border-slate-200" aria-labelledby="team-heading">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-16">
              <h2 id="team-heading" className="font-heading font-black text-slate-900 text-3xl mb-4">
                Les cerveaux derrière APEX
              </h2>
              <p className="font-body text-slate-500 text-[15px] max-w-lg mx-auto leading-relaxed">
                Des étudiants passionnés qui donnent de leur temps et de leur énergie pour améliorer l'expérience universitaire de tous.
              </p>
            </div>

            {/* Première ligne : Bureau exécutif */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5 justify-center sm:justify-start">
                <span className="h-2 w-2 rounded-full bg-[#8B1A4A]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bureau Exécutif
                </h3>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                role="list"
                aria-label="Bureau exécutif APEX"
              >
                {executiveMembers.map((person) => (
                  <div
                    key={person.name}
                    role="listitem"
                    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-apex-border hover:shadow-[0_10px_40px_rgba(139,26,74,0.08)] transition-all duration-300 cursor-default hover:-translate-y-1"
                  >
                    <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-2xl border-2 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-[#8B1A4A]/25 group-hover:scale-105 transition-all duration-300 bg-slate-100 flex items-center justify-center">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover transition-transform duration-300"
                        style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                        loading="lazy"
                      />
                    </div>

                    <p className="font-heading font-black text-slate-900 text-[15px] leading-tight mb-1.5 group-hover:text-apex-blue transition-colors">
                      {person.name}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-apex-cream text-[#8B1A4A] border border-apex-border/60 font-body text-[11px] font-bold tracking-wide">
                      {person.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deuxième ligne : Coordinateurs des pôles */}
            <div>
              <div className="flex items-center gap-2 mb-5 justify-center sm:justify-start">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Coordination des Pôles
                </h3>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                role="list"
                aria-label="Coordinateurs des pôles APEX"
              >
                {coordinatorMembers.map((person) => (
                  <div
                    key={person.name}
                    role="listitem"
                    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-apex-border hover:shadow-[0_10px_40px_rgba(139,26,74,0.08)] transition-all duration-300 cursor-default hover:-translate-y-1"
                  >
                    <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-2xl border-2 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-[#8B1A4A]/25 group-hover:scale-105 transition-all duration-300 bg-slate-100 flex items-center justify-center">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover transition-transform duration-300"
                        style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                        loading="lazy"
                      />
                    </div>

                    <p className="font-heading font-black text-slate-900 text-[15px] leading-tight mb-1.5 group-hover:text-apex-blue transition-colors">
                      {person.name}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 font-body text-[11px] font-bold tracking-wide group-hover:bg-apex-cream group-hover:text-[#8B1A4A] group-hover:border-apex-border/60 transition-colors">
                      {person.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 5 — The Call to Arms (Recruitment CTA)
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white pb-24 px-4 sm:px-6" aria-labelledby="join-heading">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1A0510] rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
              
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-apex-blue/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Trophy className="w-8 h-8 text-amber-400" strokeWidth={2} aria-hidden="true" />
              </div>

              <h2
                id="join-heading"
                className="font-heading font-black text-white text-3xl sm:text-4xl leading-tight mb-4"
              >
                Prêt à impacter ton université ?
              </h2>
              <p className="font-body text-rose-100 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
                Rejoins une équipe d'élite qui construit de vrais outils pour de vraies personnes. Quel que soit ton domaine, ta place est ici.
              </p>

              <button
                type="button"
                className="group inline-flex items-center justify-center gap-3 bg-amber-400 text-[#1A0510]
                           font-body font-black text-[16px] px-10 py-5 rounded-2xl
                           hover:bg-amber-300 active:scale-[0.98] hover:-translate-y-1
                           transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]
                           focus:outline-none focus:ring-4 focus:ring-amber-400/40 relative z-10"
              >
                Postuler pour rejoindre l'équipe
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" strokeWidth={2.5} aria-hidden="true" />
              </button>

              <p className="font-body text-[12.5px] font-medium text-slate-400 mt-6 relative z-10">
                Recrutement ouvert pour le S1 · Toutes les filières acceptées
              </p>

              {/* Checkpoints */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10 relative z-10">
                {[
                  'Aucun prérequis technique',
                  'Bénévole & flexible',
                  'Certificat d\'impact',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-[13.5px] font-body font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}


