import { 
  Search, CheckCircle2, MapPin, FileText, Clock, ArrowRight, 
  HelpCircle, ShieldCheck, Download, FolderOpen, BookOpen, GraduationCap, Lightbulb 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentHelpSection() {
  return (
    <section
      id="help-desk"
      className="bg-white py-24 border-t border-slate-100 relative overflow-hidden"
      aria-labelledby="help-showcase-heading"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-apex-cream/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ══════════════════════════════════════════════════════
              LEFT COLUMN — The Pitch (The "Hub" Concept)
              Composition: 5 columns on desktop (approx 45%)
          ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 order-1 flex flex-col">
            
            {/* Eyebrow / Badge */}
            <div className="inline-flex self-start items-center gap-2 bg-apex-cream/80 border border-apex-border-light/80 text-apex-blue font-body text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Lightbulb className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
              Le Hub Central
            </div>

            {/* Main Headline */}
            <h2
              id="help-showcase-heading"
              className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.15] tracking-tight mb-5"
            >
              Toutes les procédures. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-blue to-rose-700">Un seul endroit.</span>
            </h2>

            {/* Subtext (The Purpose) */}
            <p className="font-body text-slate-600 text-[16px] leading-relaxed mb-8">
              L'Aide Étudiante est votre point d'entrée unique. Vous rencontrez un problème ? Ne perdez plus de temps. Nous avons la procédure officielle, les documents exacts et le bureau précis où vous rendre.
            </p>

            {/* The Scope (3 Pillars showing it's a Hub) */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-apex-cream group-hover:text-apex-blue group-hover:border-apex-border transition-colors flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body font-bold text-slate-900 text-[15px]">Procédures pas-à-pas</p>
                  <p className="font-body text-[13px] text-slate-500 mt-1">Des check-lists claires pour résoudre chaque démarche sans faire d'allers-retours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-apex-cream group-hover:text-apex-blue group-hover:border-apex-border transition-colors flex-shrink-0">
                  <FileText className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body font-bold text-slate-900 text-[15px]">Documents & Formulaires</p>
                  <p className="font-body text-[13px] text-slate-500 mt-1">Tous les modèles officiels prêts à être téléchargés et imprimés.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-apex-cream group-hover:text-apex-blue group-hover:border-apex-border transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body font-bold text-slate-900 text-[15px]">Cartographie des Bureaux</p>
                  <p className="font-body text-[13px] text-slate-500 mt-1">Trouvez instantanément l'emplacement et les horaires de chaque service.</p>
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <div>
              <Link
                to="/help"
                className="group inline-flex items-center gap-2.5 bg-apex-blue text-white
                           font-body font-bold text-[15px] px-8 py-4 rounded-xl
                           hover:bg-[#6D1239] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgb(37,99,235,0.25)] 
                           transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-apex-blue"
              >
                Explorer le Hub d'Aide
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT COLUMN — The Proof (Visualizing the Resolution)
              Composition: 7 columns on desktop (approx 55%)
          ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 order-2 relative">
            
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 relative shadow-sm">
              
              {/* Browser/App Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-body text-[12px] font-medium text-slate-400 ml-3">
                    hub.apex.ens / resolution
                  </span>
                </div>
              </div>

              {/* Hub Categories (Shows Breadth) */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold text-slate-600 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-apex-blue" /> Examens
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold text-slate-600 shadow-sm">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-500" /> Scolarité
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold text-slate-600 shadow-sm">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> Stages
                </span>
              </div>

              {/* The Search Bar Mockup */}
              <div className="bg-white rounded-xl p-4 shadow-[0_4px_12px_rgb(0,0,0,0.03)] border border-slate-200 flex items-center gap-3 relative z-10">
                <Search className="w-5 h-5 text-apex-blue" strokeWidth={2.5} />
                <div className="flex-1 min-w-0 flex items-center">
                  <span className="font-body text-[14px] text-slate-900 font-medium truncate">
                    Comment corriger une note d'examen ?
                  </span>
                  <span className="inline-block w-0.5 h-4 bg-apex-blue ml-1 animate-pulse" />
                </div>
              </div>

              {/* The Instant Answer Block (The Procedure Proof) */}
              <div className="bg-white p-6 rounded-2xl border border-apex-border-light mt-4 shadow-lg shadow-blue-50/50 relative">
                
                {/* Result header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-apex-blue bg-apex-cream border border-apex-border-light px-2.5 py-1 rounded-full">
                      Guide Officiel
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-body text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
                    Procédure Validée
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-[18px] leading-snug mb-4">
                  Demande de correction de note
                </h3>

                {/* Checklist (The Procedure) */}
                <div className="space-y-3 my-5">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-apex-border transition-colors">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-apex-blue font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-body text-[13px] font-bold text-slate-800">
                        Télécharger le formulaire de réclamation
                      </p>
                      <p className="font-body text-[12px] text-slate-500 mt-0.5">
                        Format PDF disponible en bas de cette page.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-apex-border transition-colors">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-apex-blue font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-body text-[13px] font-bold text-slate-800">
                        Faire signer par le professeur
                      </p>
                      <p className="font-body text-[12px] text-slate-500 mt-0.5">
                        Délai limite : 72h après publication des résultats.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-apex-border transition-colors">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-apex-blue font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-body text-[13px] font-bold text-slate-800">
                        Déposer au Secrétariat Général
                      </p>
                      <p className="font-body text-[12px] text-slate-500 mt-0.5">
                        Bâtiment Principal · Rez-de-chaussée, Bureau 04.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-card quick info footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-slate-500 font-body text-[12px]">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Temps estimé : <strong className="text-slate-700">2 jours</strong>
                  </span>
                  <button className="text-white bg-apex-blue font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-apex-blue-hover transition-colors shadow-sm">
                    <Download className="w-3.5 h-3.5" />
                    Formulaire.pdf
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Trust Indicator Element */}
            <div
              className="absolute -bottom-4 -left-4 sm:-left-8 z-20
                         bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50
                         p-4 flex items-center gap-4 animate-bounce-subtle"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-[15px] text-slate-900 leading-none">
                  50+ Procédures
                </p>
                <p className="font-body text-[12px] text-slate-500 mt-1">
                  Documentées et validées
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}


