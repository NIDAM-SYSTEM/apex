import { useState } from 'react';
import {
  Search, Building2, FileText, MapPin,
  ArrowRight, Plus, Minus, Phone,
  Sparkles, Command, ShieldCheck
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ─── Data ────────────────────────────────────────────────────────────────────
// (Data remains exactly the same as you provided)
const categories = [
  {
    id: 'admin',
    icon: <Building2 className="w-7 h-7" strokeWidth={1.5} />,
    label: 'Administration',
    sub: 'Inscriptions, attestations, cartes.',
    color: 'text-apex-blue bg-apex-cream border-apex-border-light',
  },
  {
    id: 'exams',
    icon: <FileText className="w-7 h-7" strokeWidth={1.5} />,
    label: 'Examens & Notes',
    sub: 'Règles, corrections, plannings.',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    id: 'newcomers',
    icon: <MapPin className="w-7 h-7" strokeWidth={1.5} />,
    label: 'Nouveaux Étudiants',
    sub: 'Campus, localisation, intégration.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
];

const popularGuides = [
  {
    id: 'g1',
    title: 'Procédure pour corriger une note d\'examen',
    category: 'Examens & Notes',
  },
  {
    id: 'g2',
    title: 'Où récupérer sa carte d\'étudiant ?',
    category: 'Administration',
  },
  {
    id: 'g3',
    title: 'Comment demander une attestation de scolarité ?',
    category: 'Administration',
  },
  {
    id: 'g4',
    title: 'Règles d\'absence aux TDs',
    category: 'Examens & Notes',
  },
];

const faqItems = [
  {
    id: 'faq1',
    question: 'Où se trouve le bureau des affaires estudiantines ?',
    answer: 'Bâtiment principal, 1er étage, Bureau 104. Ouvert du lundi au vendredi de 9h à 14h.',
  },
  {
    id: 'faq2',
    question: 'Comment récupérer ma carte d\'étudiant ?',
    answer: 'Rendez-vous au bureau de la scolarité (rez-de-chaussée, Bureau 02) avec une photo d\'identité et votre reçu d\'inscription. Délai de traitement : 3 à 5 jours ouvrés.',
  },
  {
    id: 'faq3',
    question: 'Que faire si j\'ai raté un TD ?',
    answer: 'Justifiez votre absence auprès du responsable du module dans les 48h. Au-delà de 3 absences injustifiées, vous pouvez être exclu(e) du module.',
  },
  {
    id: 'faq4',
    question: 'Comment contacter l\'administration pour une urgence ?',
    answer: 'Pendant les heures d\'ouverture (9h–15h), rendez-vous directement au bureau du secrétariat. En dehors de ces heures, un email à la direction de l\'école est possible.',
  },
];

// ─── Refined Accordion item ───────────────────────────────────────────────────
function AccordionItem({ item, isOpen, onToggle }: {
  item: typeof faqItems[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-apex-border bg-white shadow-md shadow-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-apex-blue focus-visible:ring-inset group"
        aria-expanded={isOpen}
      >
        <span className={`font-body text-[15px] font-bold leading-snug transition-colors duration-200 ${isOpen ? 'text-apex-blue' : 'text-slate-800 group-hover:text-apex-blue'}`}>
          {item.question}
        </span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-apex-blue text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-apex-cream group-hover:text-apex-blue'}`}>
          {isOpen
            ? <Minus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            : <Plus  className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          }
        </span>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">
            <div className="w-8 h-1 bg-rose-100 rounded-full mb-4"></div>
            <p className="font-body text-[14.5px] text-slate-600 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HelpPage() {
  const [query,    setQuery]  = useState('');
  const [openFaq,  setOpenFaq]  = useState<string | null>('faq1');

  const toggleFaq = (id: string) => setOpenFaq(prev => prev === id ? null : id);

  return (
    <>
      <Header activePage="help" />

      <main className="bg-slate-50 min-h-screen font-body" id="main-content">

        {/* ──────────────────────────────────────────────────────────────
            SECTION 1 — The Omnibox Hero (Deep Tech Vibe)
        ────────────────────────────────────────────────────────────── */}
        <section
          className="bg-[#1A0510] pt-24 pb-40 relative overflow-hidden"
          aria-labelledby="help-hero-heading"
        >
          {/* Background Glows */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-apex-blue/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" aria-hidden="true" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            
            {/* System Status Tag */}
            <div className="inline-flex items-center gap-2 bg-rose-700/10 border border-rose-400/20 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-rose-300 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-700"></span>
              </span>
              Moteur de Résolution APEX
            </div>

            {/* Massive Heading */}
            <h1
              id="help-hero-heading"
              className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6 tracking-tight"
            >
              Le Hub Central. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-200">Trouvez toutes les réponses.</span>
            </h1>
            
            <p className="font-body text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Ne perdez plus de temps dans les couloirs. Tapez votre problème et obtenez instantanément la procédure officielle, le bureau exact et les formulaires.
            </p>

            {/* The "Spotlight" Search Bar */}
            <div className="relative group max-w-2xl mx-auto transform transition-all duration-300 focus-within:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-apex-blue rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent focus-within:border-rose-400 transition-colors">
                <div className="pl-6 pr-3 text-apex-blue">
                  <Search className="w-6 h-6" strokeWidth={2.5} aria-hidden="true" />
                </div>
                
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ex: Corriger une note, Récupérer carte étudiant..."
                  aria-label="Rechercher une procédure"
                  className="w-full h-16 sm:h-20 bg-transparent font-body text-[16px] sm:text-[18px] text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                
                <div className="pr-4 hidden sm:flex items-center gap-2 text-slate-400 font-body text-[11px] font-bold">
                  <kbd className="bg-slate-100 border border-slate-200 rounded px-2 py-1 flex items-center gap-1">
                    <Command className="w-3 h-3" /> K
                  </kbd>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────
            SECTION 2 — The Portals (Overlapping Cards)
        ────────────────────────────────────────────────────────────── */}
        <section
          className="relative z-20 -mt-20 pb-16"
          aria-label="Catégories d'aide"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className="group text-left bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8
                             hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300
                             focus:outline-none focus-visible:ring-4 focus-visible:ring-apex-blue/30"
                  aria-label={`Explorer la catégorie ${cat.label}`}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${cat.color}`}>
                      {cat.icon}
                    </div>
                    {/* Text */}
                    <h2 className="font-heading font-black text-slate-900 text-xl leading-snug mb-2 group-hover:text-apex-blue transition-colors duration-200">
                      {cat.label}
                    </h2>
                    <p className="font-body text-[14.5px] text-slate-500 flex-1">
                      {cat.sub}
                    </p>
                    {/* Action Hint */}
                    <div className="flex items-center gap-1.5 mt-8 font-body text-[13px] font-bold text-slate-400 group-hover:text-apex-blue transition-colors duration-200">
                      Explorer le portail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────
            SECTION 3 & 4 — The Content Grid (Guides + FAQ)
        ────────────────────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-50" aria-label="Contenu d'aide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* LEFT COLUMN: Popular Guides (Structured like Official Files) */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-apex-blue">
                    <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 id="guides-heading" className="font-heading font-black text-slate-900 text-2xl">
                      Guides les plus demandés
                    </h2>
                    <p className="font-body text-sm text-slate-500 mt-1">Procédures officielles validées pour 2026</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {popularGuides.map((guide) => (
                    <a
                      key={guide.id}
                      href={`#guide-${guide.id}`}
                      className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-rose-300 hover:shadow-lg transition-all duration-200"
                      aria-label={guide.title}
                    >
                      {/* Badge / Status */}
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                          <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} /> Validé
                        </span>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-bold text-slate-900 text-[15px] group-hover:text-apex-blue transition-colors duration-150 leading-snug mb-1">
                          {guide.title}
                        </p>
                        <p className="font-body text-[12px] text-slate-400 font-medium">
                          Dossier : {guide.category}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-apex-cream text-slate-400 group-hover:text-apex-blue transition-colors">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                      </div>
                    </a>
                  ))}
                </div>
                
                <button className="mt-6 font-body text-[14px] font-bold text-apex-blue hover:text-rose-900 flex items-center gap-2 transition-colors">
                  Voir l'intégralité des 50+ guides <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* RIGHT COLUMN: Quick FAQ */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                    <MapPin className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 id="faq-heading" className="font-heading font-black text-slate-900 text-2xl">
                      Questions Rapides
                    </h2>
                    <p className="font-body text-sm text-slate-500 mt-1">Réponses immédiates, sans jargon</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {faqItems.map(item => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isOpen={openFaq === item.id}
                      onToggle={() => toggleFaq(item.id)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────
            SECTION 5 — The Failsafe (Escalation Banner)
        ────────────────────────────────────────────────────────────── */}
        <section className="py-16" aria-label="Contact d'urgence">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-amber-500/20">
              
              {/* Decorative background element */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-500" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-slate-900 text-2xl mb-2">
                      Le système n'a pas répondu à votre question ?
                    </h3>
                    <p className="font-body text-[15px] text-amber-950/80 leading-relaxed max-w-md font-medium">
                      Pas de panique. L'administration principale est ouverte du lundi au vendredi de <strong className="text-slate-900">9h à 15h</strong>. Bâtiment principal, rez-de-chaussée.
                    </p>
                  </div>
                </div>
                
                <a
                  href="mailto:admin@ens-tetouan.ma"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-body font-bold text-[15px] px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg focus:ring-4 focus:ring-slate-900/30"
                >
                  Contacter l'Administration
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}


