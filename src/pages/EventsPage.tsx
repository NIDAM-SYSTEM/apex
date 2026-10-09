import { useState } from 'react';
import { Clock, MapPin, Users, CalendarDays, ArrowRight, Ticket, Flame, X, Maximize2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────
// (Data kept the same to maintain your content structure)
const upcomingEvents = [
  {
    id: 'ue1',
    day: '22',
    month: 'SEPT',
    title: 'Atelier de Méthodologie : Valider son S3',
    location: 'Amphi 4',
    audience: 'Ouvert à tous',
    tag: 'Méthodologie',
    tagColor: 'bg-apex-cream text-apex-blue border-apex-border-light',
    spots: 'Inscriptions ouvertes',
  },
  {
    id: 'ue2',
    day: '28',
    month: 'SEPT',
    title: 'Workshop LaTeX & Rédaction Scientifique',
    location: 'Salle Informatique 2',
    audience: 'Niveau débutant accepté',
    tag: 'Tech & Code',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    spots: 'Inscriptions ouvertes',
  },
  {
    id: 'ue3',
    day: '05',
    month: 'OCT',
    title: 'Table ronde : Orientation après la Licence',
    location: 'Amphithéâtre Central',
    audience: 'Toutes filières',
    tag: 'Campus',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
    spots: 'Dernières places',
    urgent: true,
  },
  {
    id: 'ue4',
    day: '10',
    month: 'OCT',
    title: 'Séance de révision collective — Analyse 3',
    location: 'Bibliothèque ENS',
    audience: 'Mathématiques · S3',
    tag: 'Académique',
    tagColor: 'bg-violet-50 text-violet-700 border-violet-100',
    spots: 'Inscriptions ouvertes',
  },
];

const pastEvents = [
  {
    id: 'pe1',
    title: "Women's Day",
    date: '8 Mars 2025',
    category: 'Célébration',
    attendees: 'Communauté ENS',
    image: '/events/womens-day.jpg',
    objectPosition: 'center 46%',
  },
  {
    id: 'pe2',
    title: 'Voyage à Chefchaouen',
    date: 'Sortie APEX 2025',
    category: 'Excursion',
    attendees: 'Membres & Étudiants',
    image: '/events/chefchaouen-trip.jpg',
    objectPosition: 'center 30%',
  },
  {
    id: 'pe3',
    title: 'Action Sociale & Caritative',
    date: 'Édition Solidaire',
    category: 'Solidarité',
    attendees: 'Membres & Invités',
    image: '/events/social-charity.jpg',
    objectPosition: 'center 55%',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof pastEvents[0] | null>(null);

  return (
    <>
      <Header activePage="events" />

      <main className="bg-[#f8fafc] min-h-screen font-body" id="main-content">

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 — The Hype Hero (Deep Vibe)
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="bg-[#1A0510] pt-24 pb-40 px-4 sm:px-6 text-center relative overflow-hidden"
          aria-labelledby="events-hero-heading"
        >
          {/* Subtle Stage Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-apex-blue/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" aria-hidden="true" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" aria-hidden="true" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-body text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              Agenda Officiel APEX
            </div>

            {/* Heading */}
            <h1
              id="events-hero-heading"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6"
            >
              Le cœur battant <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-200">du campus.</span>
            </h1>

            {/* Subtext */}
            <p className="font-body text-slate-300 text-[16px] sm:text-[18px] leading-relaxed max-w-xl mx-auto">
              Rejoignez nos ateliers, hackathons et tables rondes. Ne soyez pas juste un étudiant, soyez un acteur de l'ENS Tétouan.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — The Headliner Ticket (The VIP Pass)
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative z-20 -mt-24 px-4 sm:px-6"
          aria-labelledby="featured-event-heading"
        >
          <div className="max-w-5xl mx-auto">
            {/* The Ticket Wrapper */}
            <article className="group bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] flex flex-col md:flex-row relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgb(0,0,0,0.15)]">
              
              {/* Ticket Punches (Visual trick for realism) */}
              <div className="hidden md:block absolute top-1/2 left-[33.33%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#f8fafc] rounded-full z-10 shadow-inner" />
              <div className="hidden md:block absolute -top-4 left-[33.33%] -translate-x-1/2 w-8 h-8 bg-[#f8fafc] rounded-full z-10 shadow-inner" />
              <div className="hidden md:block absolute -bottom-4 left-[33.33%] -translate-x-1/2 w-8 h-8 bg-[#f8fafc] rounded-full z-10 shadow-inner" />

              {/* ── Left: The Anchor (Visual date block) ───────────────── */}
              <div
                className="md:w-1/3 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex flex-col items-center justify-center py-12 md:py-0 px-8 relative overflow-hidden"
                aria-label="Date de l'événement : 15 octobre"
              >
                <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 12px)' }}
                />
                <div className="relative z-10 text-center">
                  <p className="font-heading font-black text-white text-7xl sm:text-8xl leading-none tracking-tighter drop-shadow-md">
                    15
                  </p>
                  <p className="font-body font-black text-white text-lg tracking-[0.25em] uppercase mt-2 drop-shadow-sm">
                    Octobre
                  </p>
                  <div className="mt-5 w-16 h-1 bg-white/30 mx-auto rounded-full" />
                  <p className="font-body text-[13px] text-white/90 mt-5 font-bold uppercase tracking-widest bg-black/10 px-4 py-1.5 rounded-full">
                    14h00 – 18h00
                  </p>
                </div>
              </div>

              {/* ── Right: The Pitch (Event details) ──────────────────── */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative border-l-2 border-dashed border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 font-body text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
                    L'Événement Phare
                  </div>

                  <h2
                    id="featured-event-heading"
                    className="font-heading font-black text-slate-900 text-2xl sm:text-[28px] leading-tight mb-5"
                  >
                    Tournoi d'Échecs Universitaire & Code Session
                  </h2>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <div className="w-8 h-8 bg-apex-cream border border-apex-border-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-apex-blue" />
                      </div>
                      <span className="font-body text-[14px] font-bold">Hall Principal, Bât. B</span>
                    </div>
                    <div className="hidden sm:block w-px bg-slate-200" />
                    <div className="flex items-center gap-2.5 text-slate-600">
                      <div className="w-8 h-8 bg-apex-cream border border-apex-border-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-apex-blue" />
                      </div>
                      <span className="font-body text-[14px] font-bold">Toutes filières</span>
                    </div>
                  </div>

                  <p className="font-body text-[15px] text-slate-500 leading-relaxed max-w-lg">
                    Une après-midi intense combinant stratégie échiquéenne et algorithmique. 
                    Des prix exclusifs à gagner et une opportunité en or de réseauter.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 pt-8 border-t border-slate-100">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white font-body font-bold text-[14px] px-8 py-4 rounded-xl hover:bg-apex-blue hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-rose-700/30 focus:outline-none focus:ring-4 focus:ring-apex-blue/30"
                  >
                    <Ticket className="w-4 h-4" />
                    Réserver ma place
                  </button>
                  <p className="font-body text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    42 places restantes
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 — The Roster (Upcoming Events Flight-Board)
        ══════════════════════════════════════════════════════════════ */}
        <section className="mt-20 px-4 sm:px-6 pb-12" aria-labelledby="upcoming-heading">
          <div className="max-w-4xl mx-auto">

            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 id="upcoming-heading" className="font-heading font-black text-slate-900 text-2xl flex items-center gap-3">
                  <Clock className="w-6 h-6 text-apex-blue" strokeWidth={2.5} />
                  À venir ce mois-ci
                </h2>
              </div>
            </div>

            {/* List */}
            <div className="grid gap-4" role="list">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  role="listitem"
                  className="group bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-rose-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Hover effect accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-apex-blue opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Date Block */}
                  <div className="w-16 h-16 flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 group-hover:bg-apex-cream border border-slate-100 group-hover:border-apex-border rounded-xl transition-colors duration-300">
                    <p className="font-heading font-black text-slate-900 group-hover:text-apex-blue text-xl leading-none">
                      {ev.day}
                    </p>
                    <p className="font-body text-[10px] font-bold text-slate-400 group-hover:text-rose-700 uppercase tracking-widest mt-1">
                      {ev.month}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <h3 className="font-heading font-bold text-slate-900 text-[16px] group-hover:text-apex-blue transition-colors duration-200">
                        {ev.title}
                      </h3>
                      {ev.urgent && (
                        <span className="font-body text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-1 rounded-md flex-shrink-0 animate-pulse">
                          Dernières places
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5 font-body text-[13px] font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-body text-[13px] font-medium text-slate-500">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {ev.audience}
                      </span>
                      <span className={`font-body text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${ev.tagColor}`}>
                        {ev.tag}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-apex-blue text-slate-400 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 4 — The Hall of Fame (Past Events / Proof)
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="bg-white border-t border-slate-200 py-20 px-4 sm:px-6"
          aria-labelledby="past-heading"
        >
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-12">
              <h2 id="past-heading" className="font-heading font-black text-slate-900 text-3xl mb-3">
                Revivez nos moments forts
              </h2>
              <p className="font-body text-[15px] text-slate-500 max-w-xl mx-auto">
                Parce qu'une image vaut mille mots. Découvrez l'impact de nos événements précédents sur la communauté ENS Tétouan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pastEvents.map((ev) => (
                <article
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-apex-border transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Photo container - 100% clean and unobstructed */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={ev.objectPosition ? { objectPosition: ev.objectPosition } : undefined}
                      loading="lazy"
                    />

                    {/* Category pill */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/60 font-body text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {ev.category}
                      </span>
                    </div>

                    {/* Zoom indicator on hover */}
                    <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Information below photo */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-heading font-black text-slate-900 text-[17px] leading-snug group-hover:text-apex-blue transition-colors">
                        {ev.title}
                      </h3>
                      <p className="font-body text-[13px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        {ev.date}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-body text-slate-500 font-medium truncate max-w-[65%]">
                        {ev.attendees}
                      </span>
                      <span className="inline-flex items-center gap-1 text-apex-blue font-bold text-[12px] group-hover:translate-x-1 transition-transform flex-shrink-0">
                        Voir photo <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button className="font-body text-[14px] font-bold text-slate-500 hover:text-apex-blue transition-colors">
                Charger plus d'archives ↓
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-apex-cream text-[#8B1A4A] border border-apex-border/60 font-body text-[11px] font-bold tracking-wide">
                  {selectedEvent.category}
                </span>
                <h3 className="font-heading font-black text-slate-900 text-lg">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Fermer la vue"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Uncropped Full Image */}
            <div className="flex-1 overflow-auto bg-slate-950 flex items-center justify-center p-3 sm:p-6 min-h-[350px]">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Footer metadata */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                {selectedEvent.date}
              </span>
              <span className="font-medium text-slate-500">
                {selectedEvent.attendees}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}


